import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mt-5">
      <h1 className="text-center">Error 404 - Page not found</h1>
      <p className="lead text-center">
        Something went wrong while loading data
      </p>
      <div className="text-center">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
