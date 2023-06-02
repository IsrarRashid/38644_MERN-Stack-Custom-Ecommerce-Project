import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState("");

  const result = useSelector((state) => state.cardRed);
  console.log("Result __________ ", result);

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
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      // Perform the sign-out logic here, such as clearing the authentication token

      // make POST request to the sign-out endpoint on your server
      await axios.post("/api/user/signout");

      // clear the user state
      setUser(null);
      setAdmin("");
      // manually remove the authToken cookie from the browser
      /**expires=Thu, 01 Jan 1970 00:00:00 UTC in the document.cookie statement is important.
       * It sets the expiration date of the cookie to a past date, which effectively removes the cookie from the browser.
       */
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Redirect the user to the desired location
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white fw-bold"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/contactus">
                Contact Us
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    onClick={() => handleSignOut()}
                    className="nav-link text-white fw-bold"
                    to="/"
                  >
                    Sign Out
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => handleSignOut()}
                    className="nav-link text-white fw-bold"
                    to="/my-orders"
                  >
                    My Orders
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/sign-in">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white fw-bold"
                    to="/register-user"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {admin === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/add-product">
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manage-products">
                      Manage Products
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manage-users">
                      Manage Users
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      onClick={() => handleSignOut()}
                      className="dropdown-item"
                      to="/"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/cart"
                class="nav-link text-white fw-bold position-relative"
              >
                Cart
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {result.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
