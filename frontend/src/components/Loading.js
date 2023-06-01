import React from "react";

const Loading = () => {
  return (
    <div className="container">
      <div className="row text-center mt-5">
        <div>
          <div
            className="spinner-border text-primary"
            style={{ width: "6rem", height: "6rem" }}
            role="status"
          >
            <div
              className="spinner-border text-danger"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
