import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllData = ({ registerData = [], handleEdit, handleDelete }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Registration Data</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Password
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Image</th>{" "}
            {/* New Column */}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {registerData.map((row) => (
            <tr key={row._id}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >{`${row.firstName} ${row.lastName}`}</td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {row.email}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {row.password}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {row.image ? (
                  <img
                    src={`http://localhost:4000${row.image}`}
                    alt="User"
                    style={{
                      width: "130px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => handleEdit(row._id)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  <FaEdit color="blue" />
                </button>
                <button
                  onClick={() => handleDelete(row._id)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaTrash color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllData;
