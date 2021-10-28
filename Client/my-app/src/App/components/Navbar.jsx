import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { logOutUser } from '../redux/actions/index';
import swal from 'sweetalert';

function Navbar() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged);

  const handleLogOut = () => {
    swal({
      text: 'Estas Cerrando Sesion',
      icon: 'warning',
      timer: '3000',
    });
    dispatch(logOutUser());
  };

  return (
    <div className=' flex justify-between items-center px-4 h-screen9 bg-gradient-to-r from-thirty to-fourty  text-white '>
      <Link to='/' className='text-xl flex items-center ml-4'>
        AD
        <FaPaw />
        GTAME
      </Link>
      <div className='h-full grid grid-cols-6 text-center'>
        <NavLink to='/' exact className='h-full w-36 flex items-center justify-center hover:text-primary' activeClassName='shadow-activeNavBar text-primary'>
          INICIO
        </NavLink>
        <NavLink to='/adopciones' className='h-full w-36 flex items-center justify-center hover:text-primary' activeClassName='shadow-activeNavBar text-primary'>
          ADOPCIONES
        </NavLink>
        <NavLink to='/perdidos' className='h-full w-36 flex items-center justify-center hover:text-primary' activeClassName='shadow-activeNavBar text-primary'>
          PERDIDOS
        </NavLink>
        <NavLink to='/refugios' className='h-full w-36 flex items-center justify-center mr-4 hover:text-primary' activeClassName='shadow-activeNavBar text-primary'>
          REFUGIOS
        </NavLink>
        <NavLink to='/eventos' className='h-full w-36 flex items-center justify-center mr-4 hover:text-primary' activeClassName='shadow-activeNavBar text-primary'>
          EVENTOS
        </NavLink>

        {isLogged ? (
          // si el usuario está loggeado, renderizo botones de perfil y cerrar sesión
          <div className='flex flex-col justify-center text-center text-md pt-1'>
            <NavLink to='/perfil' className='bg-primary btn btn-nav w-full border-b-fourty mr-2' activeClassName='navButtonActive'>
              Perfil
            </NavLink>
            <button className='bg-fourtyDark btn btn-nav w-full border-b-0' onClick={handleLogOut}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          // si el usuario *NO* está loggeado, renderizo botones de log in y registro
          <div className='flex flex-col justify-center text-center text-md pt-1'>
            <NavLink to='/login' className='bg-primary btn btn-nav w-full border-b-fourty mr-2' activeClassName='navButtonActive'>
              Login
            </NavLink>
            <NavLink to='/registro' className='bg-fourtyDark btn btn-nav w-full' activeClassName='navButtonActive'>
              Registro
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
