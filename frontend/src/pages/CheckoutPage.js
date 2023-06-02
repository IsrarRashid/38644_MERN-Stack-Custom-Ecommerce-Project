import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../redux/action";
import PaymentMethodPage from "./PaymentMethodPage";
import axios from "axios";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const state = useSelector((state) => state.cardRed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/get-signed-in-user");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []); // Removed navigate from the dependency array

  const removeProduct = (item) => {
    dispatch(removeItem(item));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    state.forEach((product) => {
      totalPrice += product.qty * product.price;
    });
    return totalPrice;
  };

  const handlePreviewOrderClick = () => {
    navigate("/preview-order", {
      state: { paymentMethod: paymentMethod },
    });
  };

  return (
    <div className="container py-5">
      <h2>Checkout</h2>
      <ul className="list-group">
        {user && (
          <div>
            <li className="list-group-item">{user.name}</li>
            <li className="list-group-item">{user.address}</li>
            <li className="list-group-item">{user.phone}</li>
            <li className="list-group-item">{user.email}</li>
          </div>
        )}
      </ul>
      <PaymentMethodPage setPaymentMethod={setPaymentMethod} />
      {state.map((product) => (
        <div key={product.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                alt={product.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  Quantity: {product.qty} | Price: ${product.price}
                </p>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => removeProduct(product)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Total Price: ${calculateTotalPrice()}</h5>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Payment Method: {paymentMethod}</h5>
        </div>
      </div>

      <button
        disabled
        className="btn btn-primary"
        onClick={handlePreviewOrderClick}
      >
        Preview Order
      </button>
    </div>
  );
};

export default CheckoutPage;
