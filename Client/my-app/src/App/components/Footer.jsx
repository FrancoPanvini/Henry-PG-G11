import React from 'react'
import { FaPaw } from "react-icons/fa"
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="flex justify-between px-4 bg-primary items-center text-white">
            <NavLink to="/" className="text-xl flex items-center">AD<FaPaw/>GTAME</NavLink>
            <p className="text-left w-4/5 ml-4">© 2021 Adogtame — Todos los derechos reservados</p>
          <div className="flex  text-center items-center ">
            <NavLink to="/adopciones" className="p-4 text-center focus:text-tercero hover:text-tercero">NOSOTROS</NavLink>
            <NavLink to="/adopciones" className="p-4  text-center focus:text-tercero hover:text-tercero">FAQ</NavLink>  
          
          </div>  
        </div>
    )
}

export default Footer
