import "./App.css";
import CrudInventory from "./componentsApp/CrudInventory.jsx";
import Crud from "./Crud.jsx";
import CrudIngresos from "./CrudIngresos.jsx";
import Layout from "./pages/Layout.jsx";
import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Iniciando ando</div>,
      },
      {
        path: "inventario",
        element: <Crud />,
      },
      {
        path: "ingresos",
        element: <CrudIngresos />,
      },
      // otras rutass
      {
        path: "lista",
        element: <CrudInventory />,
      },

      {
        path: "formulario",
        element: <Form />,
      },
      
    ],
  },
]);
function App() {

  return    <RouterProvider router={router} /> ;
}

export default App;
