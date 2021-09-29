import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaPaw } from "react-icons/fa"

function Navbar() {
    return (
        <div className="flex justify-between px-4 bg-primary items-center text-white">
            <NavLink to="/" className="text-xl flex items-center">AD<FaPaw/>GTAME</NavLink>
          <div className="grid grid-cols-5 text-center items-center">
            <NavLink to="/" className="py-4  text-center hover:text-tercero focus:text-tercero ">INICIO</NavLink>
            <NavLink to="/adopciones" className="p-4 text-center focus:text-tercero hover:text-tercero">ADOPCIONES</NavLink>
            <NavLink to="/adopciones" className="p-4 text-center focus:text-tercero hover:text-tercero">PERDIDOS</NavLink>
            <NavLink to="/adopciones" className="p-4 mr-12 text-center focus:text-tercero hover:text-tercero">REFUGIOS</NavLink>  
            <div className="flex flex-col text-center text-sm p-2">
                <NavLink to="/login" className="bg-secondary text-tercero rounded-sm py-px  shadow-md hover:bg-tercero hover:text-white">Login</NavLink>
                <NavLink to="/registro" className="hover:text-tercero focus:text-tercero">Registrarse</NavLink>
            </div>
          </div>  
        </div>
    )
}

export default Navbar
