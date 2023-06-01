import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadusers = async () => {
      const { data } = await axios.get("/api/register/user/show-all");
      setData(data);
      console.log(data);
    };
    loadusers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/register/user/delete/${userId}`);
      // remove the deleted user from the data array
      setData((prevData) => prevData.filter((user) => user._id !== userId));
      console.log("user deleted successfully");
    } catch (error) {
      console.error("failed to delete user", error);
    }
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.address}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
