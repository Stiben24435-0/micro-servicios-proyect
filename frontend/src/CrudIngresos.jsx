import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ingresos/";

export default function IngresosCrud() {
  const [ingresos, setIngresos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [editId, setEditId] = useState(null);

  // Obtener ingresos desde el backend
  const fetchIngresos = async () => {
    try {
      const res = await axios.get(API_URL);
      setIngresos(res.data);
    } catch (error) {
      console.error("Error cargando ingresos:", error);
    }
  };

  // Ejecuta fetchIngresos al cargar el componente
  useEffect(() => {
    fetchIngresos();
  }, []);
  // Crear o editar
  const handleSubmit = async (e) => {
  e.preventDefault();
  const nuevoIngreso = { 
    fecha, 
    descripcion, 
    monto: parseFloat(monto) 
  };
    try {
      if (editId) {
        // Actualizar producto
        await axios.put(`${API_URL}${editId}/`, nuevoIngreso
        );
        setEditId(null);
      } else {
        // Crear producto
        await axios.post(API_URL, nuevoIngreso);
      }

      setFecha("");
      setDescripcion("");
      setMonto("");
      fetchIngresos(); // Recargar lista
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchIngresos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // Editar producto (cargar datos en inputs)
  const editarProducto = (ingresos) => {
    setFecha(ingresos.fecha);
    setDescripcion(ingresos.descripcion);
    setMonto(ingresos.monto);
    setEditId(ingresos.id);
  };

   return (
    <div>
      <h2>Gestión de Ingresos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {ingresos.map((i) => (
          <li key={i.id}>
            {i.fecha} - {i.descripcion} - {i.monto}
            <button onClick={() => editarProducto(i)}>Editar</button>
            <button onClick={() => eliminarProducto(i.id)}>Eliminar</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

