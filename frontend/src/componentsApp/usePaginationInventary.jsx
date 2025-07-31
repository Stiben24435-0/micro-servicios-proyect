import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/inventario/";

export default function UsePaginationInventary() {
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

      // devuelve count (total) y results (los productos de esa página)
      setProductos(res.data.results || [] );
      console.log(res.data);
      // console.log(res);

      setTotalPages(Math.ceil(res.data.count/ limit)); // Calcular páginas totales
      setPage(page);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProductos(1,search);
  }, [search]);
  


  return  { productos, setProductos,page, totalPages, fetchProductos,search,setSearch,loading,setLoading};
 
  
}