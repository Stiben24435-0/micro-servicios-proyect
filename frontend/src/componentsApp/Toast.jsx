import { useEffect } from "react";

export default function Toast({ mensaje, tipo = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Oculta el toast automáticamente
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-35 right-15 z-50 px-4 py-2 rounded shadow-lg text-white
      ${tipo === "success" ? "bg-green-500" : "bg-red-500"}`}>
      {mensaje}
    </div>
  );
}