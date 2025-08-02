import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "./componentsApp/Toast.jsx";
import Loader from "./componentsApp/Loader.jsx";

const API_URL = "http://127.0.0.1:8000/api/ingresos/";

export default function IngresosCrud() {
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [toast, setToast] = useState({
    mensaje: "",
    tipo: "success",
    visible: false,
  });

  const showToast = (mensaje, tipo = "success") => {
    setToast({ mensaje, tipo, visible: true });
  };

  const fetchIngresos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setIngresos(res.data);
    } catch (error) {
      showToast("Error al cargar ingresos", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngresos();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const nuevoIngreso = {
      fecha: e.target.fecha.value,
      descripcion: e.target.descripcion.value,
      monto: parseFloat(e.target.monto.value),
    };

    try {
      if (editingItem) {
        await axios.put(`${API_URL}${editingItem.id}/`, nuevoIngreso);
        showToast("Ingreso actualizado correctamente");
      } else {
        await axios.post(API_URL, nuevoIngreso);
        showToast("Ingreso creado correctamente");
      }
      setShowModal(false);
      setEditingItem(null);
      fetchIngresos();
    } catch (error) {
      showToast("Error al guardar ingreso", "danger");
    }
  };

  const eliminarIngreso = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      showToast("Ingreso eliminado");
      fetchIngresos();
    } catch (error) {
      showToast("Error al eliminar ingreso", "danger");
    }
  };

  const abrirModalParaEditar = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const abrirModalParaCrear = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Gestión de Ingresos</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={abrirModalParaCrear}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar Ingreso
        </button>
      </div>

      {ingresos.length === 0 ? (
        <p className="text-center text-gray-500">No hay ingresos.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">Monto</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((i) => (
              <tr key={i.id}>
                <td className="p-2 border">{i.fecha}</td>
                <td className="p-2 border">{i.descripcion}</td>
                <td className="p-2 border">${i.monto}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => abrirModalParaEditar(i)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarIngreso(i.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white backdrop-blur-md rounded-xl p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">
              {editingItem ? "Editar Ingreso" : "Agregar Ingreso"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="date"
                name="fecha"
                defaultValue={editingItem?.fecha || ""}
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                defaultValue={editingItem?.descripcion || ""}
                required
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="monto"
                placeholder="Monto"
                defaultValue={editingItem?.monto || ""}
                required
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editingItem ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.visible && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
}
