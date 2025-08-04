import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import CrudInventory from "./componentsApp/CrudInventory.jsx";
import CrudIngresos from "./componentsApp/CrudIngresos.jsx";
import Layout from "./pages/Layout.jsx";
import { Hero } from "./pages/Hero"
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Hero/>,
      },

      {
        path: "ingresos",
        element: <CrudIngresos />,
      },
      // otras rutass
      {
        path: "inventario",
        element: <CrudInventory />,
      },

  
      
    ],
  },
]);
function App() {

  return <RouterProvider router={router} /> ;
}

export default App;
