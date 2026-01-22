import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import "./assets/css/style.css";
import AuthProvider from "./AuthProvider";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
