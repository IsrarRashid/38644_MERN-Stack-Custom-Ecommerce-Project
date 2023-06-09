import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateProductPage = ({ productId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/product/get-single-product/${id}`
        );
        const productData = response.data;

        console.log(productData);
        setName(productData.name);
        setPrice(productData.price);
        setDescription(productData.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      // send a post request to the server to udpate the product
      const response = await axios.post(`/api/product/update/${id}`, formData);
      // reset the form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container d-flex flex-column mt-5 col-6">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="name"
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
            type="price"
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
            type="description"
            className="form-control"
            id="exampleInputDescription1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-describedby="descriptionHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputImage" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            aria-describedby="imageHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add To List
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
