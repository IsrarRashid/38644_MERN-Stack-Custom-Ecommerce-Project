import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedCheckoutRoute = () => {
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
  }, [setUser]);

  return user ? <Outlet /> : navigate("/sign-in");
};

export default ProtectedCheckoutRoute;
