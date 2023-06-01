import { useDispatch } from "react-redux";
import { addItem } from "../redux/action";
import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <div
        to="/product-detail/:id"
        className="d-flex justify-content-center align-items-center"
        // style={{ height: "150px" }}
      >
        <Link to={`/product-detail/${product._id}`} className="col-5">
          <img
            src={`http://localhost:8080/uploads/${product.image}`}
            className="card-img-top mt-3"
            alt="..."
          />
        </Link>
      </div>
      <div className="card-body d-flex flex-column justify-content-end">
        <h5 className="card-title text-center">
          {product.name.substring(0, 20)}
        </h5>
        <p className="card-text text-center">${product.price}</p>
        {/* <Link to={`/product-detail/${product._id}`} className="btn btn-primary">
          Buy Now
        </Link> */}
        <button
          className="btn btn-outline-dark px-4 py-2"
          onClick={() => addProduct(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
