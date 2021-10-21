import React from 'react';
import { FaPaw } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='flex justify-between px-4 bg-gradient-to-r h-screen9 from-thirty to-fourty text-white items-center border-t border-white'>
      <NavLink to='/' className='text-xl flex items-center'>
        AD
        <FaPaw />
        GTAME
      </NavLink>
      <p className='text-left w-4/5 ml-4'> © 2021 Adogtame — Todos los derechos reservados</p>
      <div className='flex  text-center items-center '>
         <NavLink to='/nosotros' className='p-2 text-center hover:text-primary focus:text-primary'>
          NOSOTROS
        </NavLink> 
        {/* <NavLink to="/faq" className="p-2  text-center hover:text-primary focus:text-primary">
          FAQ
        </NavLink> */}
      </div>
    </div>
  );
}

export default Footer;
