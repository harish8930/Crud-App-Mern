import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = ({
  formData,
  setFormData,
  registerData,
  setRegisterData,
  editId,
  setEditId,
  fetchData,
  handleEdit,
  handleDelete,
}) => {
  const [file, setFile] = useState(null); // Add state for file
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (file) {
      formDataToSend.append("image", file);
    }

    const requestOptions = {
      method: editId ? "PUT" : "POST",
      body: formDataToSend,
    };

    const url = editId
      ? `http://localhost:4000/api/v1/registration/edit/${editId}`
      : "http://localhost:4000/api/v1/registration/create";

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const data = await response.json();
      navigate("/getalldata");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setFile(null); // Reset file input
      setEditId(null); // Reset edit ID
      fetchData();
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>{editId ? "Update Registration" : "Registration Form"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
          {file && (
            <div>
              <p>Selected file: {file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}
        </div>
        <button type="submit" style={{ padding: "10px 15px" }}>
          {editId ? "Update" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default App;
