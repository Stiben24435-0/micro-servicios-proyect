import { useState, useEffect } from "react";

function FormIngresos({ initialData, onSubmit }) {
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
    
      
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Inventario</legend>

          <label className="label">Nombre</label>
          <input
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            placeholder="Fecha"
            className="border p-2 rounded"
            required
          />

          <label className="label">Cantidad</label>
          <input
            name="descripcion"
            type="text"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Descripcion"
            className="border p-2 rounded"
            required
          />
          <label className="label">Precio</label>
          <input
            name="monto"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Monto"
            className="border p-2 rounded"
            required
          />
        </fieldset>

      <button
        type="submit"
        className="btn btn-soft btn-success px-4 py-2 rounded flex justify-center items-center w-80 mt-4"
      >
        Guardar
      </button>
      
      
      </div>
    </form>
  );
}

export default FormIngresos;
