import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Send a request to the server to check if the user is signed in
        const response = await axios.get("/api/user/get-signed-in-user");

        // If the user is signed in, set the user state with the user information
        setUser(response.data.user);
        setAdmin(response.data.user.role);
      } catch (error) {
        // If there is an error or the user is not signed in, set the user state to null
        setUser(null);
      }
    };
    fetchUser();
  }, [setAdmin]);

  return admin == "admin" ? <Outlet /> : navigate("/error");
};

export default ProtectedAdminRoute;
