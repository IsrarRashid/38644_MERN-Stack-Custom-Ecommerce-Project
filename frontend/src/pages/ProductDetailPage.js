import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = ({ productId }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await axios(`/api/product/get-single-product/${id}`);
      const productData = response.data;
      setProduct(productData);
      console.log(productData);
      setLoading(false);
    };
    getProduct();
  }, [productId]);

  const Loading = () => {
    return (
      <>
        <h1>loading in process</h1>
      </>
    );
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/uploads/${product.image}`}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          {/* <h4 className="text-uppercase text-black-50">{product.category}</h4> */}
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            {/* Rating {product.rating && product.rating.rate} */}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">Rs. {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
