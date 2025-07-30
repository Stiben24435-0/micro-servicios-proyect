import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div >
      <div >
        <Navbar />
        <div className="m-4 p-4 border-amber-200 border-4 w-full  flex items-center justify-center">
          <Outlet/>
          {/* //Outlet me permite renderizar lo que tengo en mis rutas(path) y me conserva en este caso el layout  */}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full  bg-[#031716] text-center py-4 ">
        <h1 className="text-2xl font-bold text-white">Mi Aplicación</h1>
      </div>
    </div>
  );
}
