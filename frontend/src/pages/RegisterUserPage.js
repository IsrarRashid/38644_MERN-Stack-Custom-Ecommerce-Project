import React, { useState } from "react";
import axios from "axios";
// import { Outlet } from "react-router-dom";

const RegisterUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send a POST request to the server to add the product
      const response = await axios.post("/api/register/user/add", {
        name,
        email,
        address,
        phone,
        password,
      });
      // handle the response and perform any necessary actions
      console.log(response.data);

      //   reset the form
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex flex-column mt-3 col-lg-6 bg-light border border-5 p-3">
      <h2 className="text-center">Registeration </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            required
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress1" className="form-label">
            Address
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            name="address"
            required
            type="text"
            className="form-control"
            id="exampleInputAddress1"
            aria-describedby="addressHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone1" className="form-label">
            Phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            name="phone"
            required
            type="text"
            className="form-control"
            id="exampleInputPhone1"
            aria-describedby="phoneHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            aria-describedby="passwordHelp"
          />
        </div>
        <div id="help" className="form-text">
          We'll never share your information with anyone else.
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success mt-3">
            Register
          </button>
        </div>
      </form>
      {/* <Outlet /> */}
    </div>
  );
};

export default RegisterUserPage;
