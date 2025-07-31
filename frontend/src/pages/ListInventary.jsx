import usePaginationInventary from "../components/UsePaginationInventary";
import axios from "axios";




function ListInventary() {

    const API_URL = "http://127.0.0.1:8000/api/inventario/";

    const { productos,page,totalPages,fetchProductos } = usePaginationInventary();

    

     const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };
  
  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setPrecio(producto.precio);
    setEditId(producto.id);
  };

  return (
    
        
     
    
    <div>
        <h1>tabla</h1>
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
      <div className="mt-6"></div>

      <div className="flex gap-4 justify-center mx-auto border-2 border-green-500 p-4 rounded-xl">
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


      </div>

          </div>

    
  )
}

export default ListInventary