import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/inventario/";

export default function ProductosCrud() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [editId, setEditId] = useState(null);

  // Obtener productos
  const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Crear o editar
  const handleSubmit = async (e) => {
  e.preventDefault();
  const nuevoProducto = { 
    nombre, 
    cantidad: parseInt(cantidad, 10), 
    precio: parseFloat(precio) 
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

      setNombre("");
      setCantidad("");
      setPrecio("");
      fetchProductos(); // Recargar lista
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
    <div>
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.cantidad} - {p.precio}
            <button onClick={() => editarProducto(p)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
