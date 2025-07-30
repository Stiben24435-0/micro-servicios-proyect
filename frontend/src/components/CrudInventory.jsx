import { useState, useEffect } from "react";
import usePaginationInventary from "../components/usePaginationInventary.jsx"
import {
  // getInventory,
  deleteItemInventory,
  updateItemInventory,
  createItemInventory,
} from "../services/ServicesApi";

import Form from "../components/Form.jsx"; 

function CrudInventory() {

    // hook para manejar la paginación
  const { productos, page, totalPages, fetchProductos,search,setSearch } = usePaginationInventary();
  
  // const [items, setItems] = useState([]);
  // const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
 

  

  const handleDelete = async (id) => {
    await deleteItemInventory(id);
    fetchProductos(page);//recarga la pagina actual despues de eliminar
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null); // modo "crear"
    setShowModal(true);
   
  };

  const handleSave = async (data) => {
    console.log("Datos enviados al backend:", data);
    if (editingItem) {
      await updateItemInventory(editingItem.id, data);
    } else {
      await createItemInventory(data);
    }
    setShowModal(false);
    setEditingItem(null);
     fetchProductos(page,search)//refresca la lista despues de guardar
  };

  // Filtrar los items según la búsqueda
  // items || [] esto lo usamos para evitar errores si items es undefined
  // y asegurarnos de que siempre sea un array
  // const filtered = (productos || []).filter((item) =>
  //   item.nombre.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className=" w-6xl p-4 border-4 border-cyan-700 rounded-lg">
      <h1 className="text-xl font-bold mb-4">Inventario</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

   {/* tabla con productos */}

   <div className="  mb-12 overflow-x-auto border-2 border-slate-700 rounded-lg">
  <table className="table ">
    {/* Encabezado */}
    <thead>
      <tr>
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
          <td className="flex gap-2">
            {/* botones de acciones */}
            <button
              onClick={() => handleEdit(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

<div>

{/* control de paginacion */}

      <div className="flex gap-4 justify-center mx-auto border-2 border-green-500  rounded-xl mb-20">
        <button
          disabled={page === 1}
          onClick={() => fetchProductos(page - 1,search)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => fetchProductos(page + 1,search)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
          Siguiente
        </button>
        <button className="btn btn-primary">Button</button>
      </div>
          </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingItem ? "Editar Item" : "Agregar Item"}
            </h2>
            
            <Form
              initialData={editingItem || { nombre: "", cantidad: "", precio: "" }}
              onSubmit={handleSave}
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudInventory;
