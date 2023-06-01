import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../redux/action";
import axios from "axios";

const Cart = () => {
  const state = useSelector((state) => state.cardRed);
  console.log(state);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Send a request to the server to check if the user is signed in
        const response = await axios.get("/api/user/get-signed-in-user");

        // If the user is signed in, set the user state with the user information
        setUser(response.data.user);
      } catch (error) {
        // If there is an error or the user is not signed in, set the user state to null
        setUser(null);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleCheckoutClick = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/sign-in");
    }
  };

  const addProduct = (item) => {
    dispatch(addItem(item));
  };
  const removeProduct = (item) => {
    dispatch(removeItem(item));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  const cartItems = (product) => {
    return (
      <>
        <div className="px-4 my-5 bg-light rounded-3 py-5">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <img
                  src={`http://localhost:8080/uploads/${product.image}`}
                  alt={product.title}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="col-md-4">
                <h3>{product.title}</h3>
                <p className="lead fw-bold">
                  {product.qty} X ${product.price} = $
                  {product.qty * product.price}
                </p>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => removeProduct(product)}
                >
                  -
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addProduct(product)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const buttons = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <button
              onClick={handleCheckoutClick}
              className="btn btn-outline-dark mb-5 w-25 mx-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && buttons()}
    </div>
  );
};

export default Cart;
