import { useState, useEffect } from "react";

function ItemForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="nombre"
        type="text"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 rounded"
        required
      />
        <input
        name="cantidad"
        type="number"
        value={form.cantidad}
        onChange={handleChange}
        placeholder="Cantidad"
        className="border p-2 rounded"
        required
       
      />
      <input
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}

export default ItemForm;