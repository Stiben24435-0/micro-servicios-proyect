import { useState, useEffect } from "react";
import axios from "axios";



export default function UsePaginationInventary(API_URL) {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(""); 
  const [loading,setLoading]= useState(false)
  const limit = 10; 

  const fetchProductos = async (page = 1, query = "") => {
    setLoading(true)
  
    try {
      const res = await axios.get(API_URL,{params:{page,limit,search:query},
      });

      // devuelve count (total) y results (los productos de esa página) el serch query
      //es el dato que le enviamos por ejemplo esto devuelve http://127.0.0.1:8000/api/inventario?page=1&limit=10&search=leche
      // leche seria el valor que le pasamos y me regresa lo que coincida ese valor lo enviamos desde el front

      setProductos(res.data.results || [] );
      setTotalPages(Math.ceil(res.data.count/ limit)); // Calcular páginas totales
      setPage(page);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }finally{
      setLoading(false)
    }
  };

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchProductos(1, search);
  }, 700); // espera 500ms después de escribir

  return () => clearTimeout(delayDebounce);
}, [search]);
  


  return  { productos, setProductos,page, totalPages, fetchProductos,search,setSearch,loading,setLoading};
 
  
}