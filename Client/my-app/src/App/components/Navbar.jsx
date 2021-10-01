import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

function Navbar() {
  const isLogged = useSelector(state => state.isLogged);

  return (
    <div className=" flex justify-between px-4 bg-gradient-to-r from-thirty to-fourty items-center text-white ">
      <Link to="/" className="text-xl flex items-center ml-4">
        AD<FaPaw />GTAME
      </Link>
      <div className="grid grid-cols-5 text-center items-center">
        <NavLink to="/" exact className="py-4 text-center hover:text-primary focus:text-primary " activeClassName="shadow-activeNavBar text-primary" >
          INICIO
        </NavLink>
        <NavLink to="/adopciones" className="p-4 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >
          ADOPCIONES
        </NavLink>
        <NavLink to="/perdidos" className="p-4 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >
          PERDIDOS
        </NavLink>
        <NavLink to="/refugios" className="p-4 mr-12 text-center focus:text-primary hover:text-primary" activeClassName="shadow-activeNavBar text-primary" >
          REFUGIOS
        </NavLink>

        {isLogged 
          ? ( // si el usuario está loggeado, renderizo botones de perfil y cerrar sesión
            <div className="flex flex-col justify-center text-center text-md pt-1">
              <NavLink to="/perfil" className="bg-primary btn btn-nav w-full border-b-fourty mr-2" activeClassName="navButtonActive" >
                Perfil
              </NavLink>
              <button className="bg-fourty btn btn-nav w-full border-b-0" >
                Cerrar sesión
              </button>
            </div>
        ) : ( // si el usuario *NO* está loggeado, renderizo botones de log in y registro
          <div className="flex flex-col justify-center text-center text-md pt-1">
            <NavLink to="/login" className="bg-primary btn btn-nav w-full border-b-fourty mr-2" activeClassName="navButtonActive" >
              Login
            </NavLink>
            <NavLink to="/registro" className="bg-fourty btn btn-nav w-full" activeClassName="navButtonActive" >
              Registro
            </NavLink>
            {/* <NavLink to="/registro" className="hover:text-tercero focus:text-tercero">Registrarse</NavLink> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
