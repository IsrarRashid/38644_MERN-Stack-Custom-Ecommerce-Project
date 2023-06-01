import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignInUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send a POST request to the server to add the product
      const response = await axios.post("/api/user/signin", {
        email,
        password,
      });
      // handle the response and perform any necessary actions
      console.log(response.data);
      navigate("/");
      //   reset the form
      setEmail("");
      setPassword("");
    } catch (error) {
      // handle signin user
      if (error.response && error.response.data) {
        console.log("sign-in failed. Please try again.");
      }
    }
  };

  return (
    <div className="container d-flex flex-column mt-5 col-lg-6 bg-light border border-5 p-5">
      <h2 className="text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="exampleInputPassword1" className="form-label">
            password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            required
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            aria-describedby="passwordHelp"
          />
        </div>
        <div className="text-center">
          <Link to="/register-user">Create Account</Link>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInUserPage;
