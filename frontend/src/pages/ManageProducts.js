import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await axios.get("/api/product/show-all");
      setData(data);
      console.log(data);
    };
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/product/delete/${productId}`);
      // remove the deleted product from the data array
      setData((prevData) =>
        prevData.filter((product) => product._id !== productId)
      );
      console.log("product deleted successfully");
    } catch (error) {
      console.error("failed to delete product", error);
    }
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.price}</td>
              <td>{d.description}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </button>
                <span className="me-2 ms-2">|</span>
                <Link
                  to={`/update-product/${d._id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
