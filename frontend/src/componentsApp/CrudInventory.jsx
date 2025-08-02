import { useState } from "react";
import usePaginationInventary from "../componentsApp/usePaginationInventary.jsx";
import Loader from "../componentsApp/Loader.jsx";
import Toast from "../componentsApp/Toast.jsx";
import Form from "../componentsApp/Form.jsx";

import {
  deleteItemInventory,
  updateItemInventory,
  createItemInventory,
} from "../services/ServicesApi";

const API_URL = "http://127.0.0.1:8000/api/inventario/";
function CrudInventory() {
  const {
    productos,
    page,
    totalPages,
    fetchProductos,
    search,
    setSearch,
    loading,
  } = usePaginationInventary(API_URL);
  // hook para manejar la paginación

  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({
    mensaje: "",
    tipo: "success",
    visible: false,
  });

  const showToast = (mensaje, tipo = "success") => {
    setToast({ mensaje, tipo, visible: true });
  };

  if (loading) {
    return <Loader />;
  }
  const handleDelete = async (id) => {
    await deleteItemInventory(id);
    fetchProductos(page); //recarga la pagina actual despues de eliminar
    showToast("Elemento eliminado", "danger");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null); // modo "crear"
    setShowModal(true);
    fetchProductos();
  };

  const handleSave = async (data) => {
    if (editingItem) {
      await updateItemInventory(editingItem.id, data);
      showToast("Producto actualizado correctamente", "success");
    } else {
      await createItemInventory(data);
      showToast("Producto creado correctamente", "success");
    }
    setShowModal(false);
    setEditingItem(null);
    fetchProductos(page, search); //refresca la lista despues de guardar
  };

  return (
    <div className=" w-6xl rounded-lg xs:m-4">
      <h1 className="text-2xl font-bold mb-4 text-center ">Inventario</h1>

      <div className="  flex gap-2 mb-4 ">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered  w-full"
        />
        <button
          onClick={handleAdd}
          className="btn btn-soft btn-success  px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {/* tabla con productos */}

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos.</p>
      ) : (
        <div className="  mb-12 overflow-x-auto border-2 border-slate-700 rounded-lg">
          <table className="table ">
            {/* Encabezado */}
            <thead>
              <tr className="text-cyan-100">
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            {/* Cuerpo de la tabla */}
            <tbody>
              {productos.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio}</td>
                  <td className="flex gap-5">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-soft btn-info px-2 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className=" btn btn-soft btn-secondary px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {productos.length > 0 && (
        <div>
          {/* control de paginacion */}

          <div className="  join flex gap-4 justify-center mt-10 mx-auto  rounded-xl mb-20">
            <button
              disabled={page === 1}
              onClick={() => fetchProductos(page - 1, search)}
              className=" join-item btn  px-4 py-2disabled:opacity-50 cursor-pointer"
            >
              Anterior
            </button>
            <span className="join-item btn hover:cursor-auto">
              Página {page} de {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => fetchProductos(page + 1, search)}
              className=" join-item btn px-4 py-2  cursor-pointer disabled:opacity-50  disable:cursor-crosshair"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white/1 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h2 className=" text-center text-lg font-bold mb-4">
              {editingItem ? "Editar Producto" : "Agregar Producto"}
            </h2>

            <Form
              initialData={
                editingItem || { nombre: "", cantidad: "", precio: "" }
              }
              onSubmit={handleSave}
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4  btn btn-soft btn-default text-white px-4 py-2 rounded "
            >
              Cancelar
            </button>
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

export default CrudInventory;
