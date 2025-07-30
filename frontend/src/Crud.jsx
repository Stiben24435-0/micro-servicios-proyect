import { useState, useEffect } from "react";
import axios from "axios";
import usePaginationInventary from "./components/usePaginationInventary";

const API_URL = "http://127.0.0.1:8000/api/inventario/";

export default function ProductosCrud() {

  // hook para manejar la paginación
const { productos, page, totalPages, fetchProductos } = usePaginationInventary();

  // Estados para manejar productos y formulario
  // const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [editId, setEditId] = useState(null);



  // Crear o editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      cantidad: parseInt(cantidad, 10),
      precio: parseFloat(precio),
    };
    try {
      if (editId) {
        // Actualizar producto
        await axios.put(`${API_URL}${editId}/`, nuevoProducto);
        setEditId(null);
      } else {
        // Crear producto
        await axios.post(API_URL, nuevoProducto);
      }
      // Limpiar formulario 
      setNombre("");
      setCantidad(""); 
      setPrecio("");
      fetchProductos(page); // Recargar lista y paginacion
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // Editar producto (cargar datos en inputs)
  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setPrecio(producto.precio);
    setEditId(producto.id);
  };

  return (
    <div className="grid grid-cols-1 p-6 gap-6  shadow border-green-600 rounded-xl">
      <form onSubmit={handleSubmit} className="border-[#6ba3be]   rounded-xl p-4  bg-cyan-500/10 ">
        <div className="p-4 rounded-xl mb-4 ">

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="mb-2  border-2 border-[#6ba3be]  p-2 w-full rounded-xl"
          />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
          className=" mb-2 border-2 border-[#6ba3be]   p-2 w-full rounded-xl "
          />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          className="mb-2  border-2 border-[#6ba3be]  p-2 w-full rounded-xl   "
          />
        <div className="flex justify-end">
          <button 
            type="submit"
            className="border-2 border-amber-300 rounded-xl p-2 text-purple-900  "
            >
            {editId ? "Actualizar" : "Agregar"}
          </button> 
        </div>
            </div>
      </form> 

      <ul className="   border-2 border-amber-600  rounded-xl p-4 ">
        {productos.map((p) => (
          <li key={p.id}>
            <div className="flex  items-center gap-4 border-b border-gray-300">
              {p.nombre} - {p.cantidad} - {p.precio}
              <div className="flex gap-2 ml-auto">
                <button
                  className=" p-2 border-2 rounded-2xl   "
                  onClick={() => editarProducto(p)}
                >
                  Editar
                </button>
                <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">




      {/* Controles de paginación */}
    </div>
    <div>

      <div className="flex gap-4 justify-center mx-auto border-2 border-green-500  rounded-xl mb-20">
        <button
          disabled={page === 1}
          onClick={() => fetchProductos(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => fetchProductos(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
          Siguiente
        </button>
        <button className="btn btn-primary">Button</button>
      </div>
          </div>
    </div>
    
  );
}
