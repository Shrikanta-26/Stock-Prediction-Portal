import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import "./assets/css/style.css"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
