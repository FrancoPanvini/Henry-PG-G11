import React from 'react';
import SideBar from './SideBar';
import ContenedorVista from './VistasPerfil/ContenedorVista';

function Perfil() {
  const userId = localStorage.getItem('userId');

  return (
    <div className='flex h-screen82 bg-gradient-to-r from-thirty to-fourty '>
      <SideBar className='w-1/4' />
      <ContenedorVista userId={userId} className='w-3/4 h-full' />
    </div>
  );
}

export default Perfil;
