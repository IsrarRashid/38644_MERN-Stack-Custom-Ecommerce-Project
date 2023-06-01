import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import Loading from "../components/Loading";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await axios.get("/api/product/show-all");
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>
          {user ? (
            <p className="text-center">Welcome {user.name}</p>
          ) : (
            <p className="text-center">No user signed in</p>
          )}
        </h1>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          data.map((d) => <Product product={d} key={d._id} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
