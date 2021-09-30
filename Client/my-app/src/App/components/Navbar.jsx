import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaPaw } from "react-icons/fa"

function Navbar() {
    return (
        <div className=" flex justify-between px-4 bg-gradient-to-r from-thirty to-fourty items-center text-white ">
            <Link to="/" className="text-xl flex items-center ml-4">AD<FaPaw/>GTAME</Link>
          <div className="grid grid-cols-5 text-center items-center">
            <NavLink to="/" exact className="py-4  text-center hover:text-primary focus:text-primary " activeClassName="shadow-activeNavBar text-primary" >INICIO</NavLink>
            <NavLink to="/adopciones" className="p-4 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >ADOPCIONES</NavLink>
            <NavLink to="/perdidos" className="p-4 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >PERDIDOS</NavLink>
            <NavLink to="/refugios" className="p-4 mr-12 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >REFUGIOS</NavLink>  
            <div className="grid grid-cols-2 text-center text-md p-2">
                <NavLink to="/login" className="bg-primary btn btn-nav border-fourty mr-2 py-1">Login</NavLink>
                <NavLink to="/registro" className="bg-primary btn btn-nav border-fourty py-1">Registro</NavLink>
                {/* <NavLink to="/registro" className="hover:text-tercero focus:text-tercero">Registrarse</NavLink> */}
            </div>
          </div>  
        </div>
    )
}

export default Navbar