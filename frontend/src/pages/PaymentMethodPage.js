import React, { useState } from "react";

const PaymentMethodPage = ({ setPaymentMethod }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setPaymentMethod(paymentMethod); // Call the setPaymentMethod prop to update the payment method in the parent component
  };

  return (
    <div className="container py-5">
      <h2>Select Payment Method</h2>
      <div className="form-check">
        <input
          type="radio"
          id="paymentMethod1"
          name="paymentMethod"
          value="Credit Card"
          checked={selectedPaymentMethod === "Credit Card"}
          onChange={() => handlePaymentMethodSelect("Credit Card")}
          className="form-check-input"
        />
        <label htmlFor="paymentMethod1" className="form-check-label">
          Credit Card
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="paymentMethod2"
          name="paymentMethod"
          value="PayPal"
          checked={selectedPaymentMethod === "PayPal"}
          onChange={() => handlePaymentMethodSelect("PayPal")}
          className="form-check-input"
        />
        <label htmlFor="paymentMethod2" className="form-check-label">
          PayPal
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="paymentMethod3"
          name="paymentMethod"
          value="Stripe"
          checked={selectedPaymentMethod === "Stripe"}
          onChange={() => handlePaymentMethodSelect("Stripe")}
          className="form-check-input"
        />
        <label htmlFor="paymentMethod3" className="form-check-label">
          Stripe
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
