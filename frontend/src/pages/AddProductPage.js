import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log(name, price, description, image);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    try {
      // send a POST request to the server to add the product
      const response = await axios.post("/api/product/add", formData);

      // handle the response and perform any necessary actions
      console.log(response);
      console.log(response.data);

      // reset the form
      setName("");
      setPrice("");
      setDescription("");
      navigate("/manage-products");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container d-flex flex-column mt-5 col-6">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice1" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPrice1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-describedby="priceHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputDescription1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-describedby="descriptionHelp"
          />
        </div>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" className="btn btn-primary">
          Add To List
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
