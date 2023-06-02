import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreviewOrderPage = () => {
  const [user, setUser] = useState(null);
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
  }, []);

  //   const user = useSelector((state) => state.user); // Assuming you have a user state in your Redux store
  const paymentMethod = useSelector((state) => state.paymentMethod); // Assuming you have a paymentMethod state in your Redux store
  const cartItems = useSelector((state) => state.cartItems); // Assuming you have a cartItems state in your Redux store

  const navigate = useNavigate();

  const handlePlaceOrderClick = () => {
    // Place order logic using user, cartItems, and paymentMethod
    // Save the order data and navigate to the order confirmation page
    navigate("/place-order");
  };

  return (
    <div className="container py-5">
      <h2>Preview Order</h2>
      <h3>User Details</h3>
      <ul className="list-group">
        <li className="list-group-item">{user?.name}</li>
        <li className="list-group-item">{user?.address}</li>
        <li className="list-group-item">{user?.phone}</li>
        <li className="list-group-item">{user?.email}</li>
      </ul>

      <h3>Payment Method</h3>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Payment Method: {paymentMethod}</h5>
        </div>
      </div>

      <h3>Order Items</h3>
      {cartItems.map((product) => (
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
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handlePlaceOrderClick}>
        Place Order
      </button>
    </div>
  );
};

export default PreviewOrderPage;
