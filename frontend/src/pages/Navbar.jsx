import { NavLink } from "react-router-dom";
import { linksNavbar } from "../constants/linksNavbar";

export function Navbar() {
  return (
    <nav className="flex items-center p-4 px-2 space-x-5 md:px-6 justify-between w-full bg-[#031716]  h-20">
      <div className=" px-6 sm:text-pink-500 ">
        <h1 className=" border-2 border-amber-400">Logo</h1>
      </div>

      <div className="flex gap-6 m-4 items-center">
        {linksNavbar.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `text-gray-200 hover:text-[#74a1f5] transition-all duration-200 ease-in-out
            ${isActive ? "text-green-400  " : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className=" ">
        <p className="gap-4 text-amber-400">Icono de usuario</p>
      </div>
    </nav>
  );
}
