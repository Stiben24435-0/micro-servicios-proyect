import axios from "axios";

const INVENTARIO_URL = "http://localhost:8000/api/inventario";
const INGRESOS_URL = "http://localhost:8000/api/ingresos";

//////////////////////////// RUTAS INVENTARIO ////////////////////////////

// Obtener inventario con búsqueda y paginación
export const searchInventory = async (page = 1, search = "", pageSize = 10) => {
  try {
    const res = await axios.get(`${INVENTARIO_URL}/`, {
      params: { page, search, page_size: pageSize }, // Django REST soporta estos parámetros
    });
    return res.data; // Devuelve {count, next, previous, results}
  } catch (error) {
    console.error("Error buscando inventario:", error);
    return { count: 0, results: [] };
  }
};





// Obtener todos los elementos del inventario
export const getInventory = async () => {
  try {
    const res = await axios.get(`${INVENTARIO_URL}/`);
    return res.data;
  } catch (error) {
    console.error("Error cargando inventario:", error);
    return [];
  }
};

// Obtener un elemento por ID
export const getItemInventory = async (id) => {
  try {
    const res = await axios.get(`${INVENTARIO_URL}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error cargando inventario con ID ${id}:`, error);
    return null;
  }
};

// Crear nuevo elemento
export const createItemInventory = async (data) => {
  try {
    const res = await axios.post(`${INVENTARIO_URL}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error creando inventario:", error);
    return { error: error.response?.data || "Error al crear inventario" };
  }
};

// Actualizar un elemento por ID
export const updateItemInventory = async (id, data) => {
  try {
    const res = await axios.put(`${INVENTARIO_URL}/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error(`Error actualizando inventario con ID ${id}:`, error);
    return null;
  }
};

// Eliminar un elemento por ID
export const deleteItemInventory = async (id) => {
  try {
    await axios.delete(`${INVENTARIO_URL}/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error eliminando inventario con ID ${id}:`, error);
    return false;
  }
};

//////////////////////////// RUTAS INGRESOS ////////////////////////////

export const getRevenue = async () => {
  try {
    const res = await axios.get(`${INGRESOS_URL}/`);
    return res.data;
  } catch (error) {
    console.error("Error cargando ingresos:", error);
    return [];
  }
};

export const getItemRevenue = async (id) => {
  try {
    const res = await axios.get(`${INGRESOS_URL}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error cargando ingreso con ID ${id}:`, error);
    return null;
  }
};

export const createItemRevenue = async (data) => {
  try {
    const res = await axios.post(`${INGRESOS_URL}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error creando ingreso:", error);
    return null;
  }
};

export const updateItemRevenue = async (id, data) => {
  try {
    const res = await axios.put(`${INGRESOS_URL}/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error(`Error actualizando ingreso con ID ${id}:`, error);
    return null;
  }
};

export const deleteItemRevenue = async (id) => {
  try {
    await axios.delete(`${INGRESOS_URL}/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error eliminando ingreso con ID ${id}:`, error);
    return false;
  }
};
