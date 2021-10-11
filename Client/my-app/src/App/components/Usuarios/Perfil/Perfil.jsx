import React from 'react';
/* import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../redux/actions'; */
import SideBar from './SideBar';
import ContenedorVista from './VistasPerfil/ContenedorVista';

function Perfil() {
  /* const dispatch = useDispatch(); */
  const userId = localStorage.getItem('userId');

  console.log(userId);



 /*  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location = '/';
  }; */

  return(
    <div className="flex h-screen82 bg-gradient-to-r from-thirty to-fourty ">
      <SideBar className="w-1/4"/>
      <ContenedorVista userId={userId} className="w-3/4 h-full"/>
    </div>
  );
}

export default Perfil;
