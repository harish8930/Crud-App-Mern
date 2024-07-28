import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AllData from './AllData';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const AppWrapper = () => {
  const [registerData, setRegisterData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Add state for image preview
  const navigate = useNavigate();

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch("http://localhost:4000/api/v1/registration/list", requestOptions);
      const data = await response.json();
      setRegisterData(data.data);
      console.log(data.data, "Hello data");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    const row = registerData.find((item) => item._id === id);
    if (row) {
      setFormData({
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        password: row.password,
        image: row.image
      });
      setEditId(id);
      if (row.image) {
        setImagePreview(`http://localhost:4000/uploads/${row.image}`); // Adjust the URL to match your backend setup
      }
      navigate('/');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/registration/delete/${id}`, { method: "DELETE" });
      const data = await response.json();
      console.log("Deleted Data", data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <App
            formData={formData}
            setFormData={setFormData}
            registerData={registerData}
            setRegisterData={setRegisterData}
            editId={editId}
            setEditId={setEditId}
            fetchData={fetchData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        }
      />
      <Route
        path="/getalldata"
        element={
          <AllData
            registerData={registerData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        }
      />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppWrapper />
  </Router>
);
