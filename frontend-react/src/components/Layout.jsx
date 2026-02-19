import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        // style={{ top: "50px" }}
        transition={Slide}
        pauseOnHover
        draggable
      />{" "}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
