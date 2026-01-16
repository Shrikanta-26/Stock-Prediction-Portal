import React from "react";
import Footer from "./Footer"
import Header from "./header";
import Button from "./Button";
const Main = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="p-5 text-center bg-light-dark">
          <h1 className="text-light">Stock Prediction Portal</h1>
          <p className="text-light lead">
            This is stock prediction application
          </p>
          <Button text="Login" class="btn btn-outline-info" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
