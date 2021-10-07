import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActive } from '../../../redux/actions';
import { BiLogOutCircle } from 'react-icons/bi';

function SideBar() {
  let active = 'Mis Datos';
  const dispatch = useDispatch();

  const handleSetActive = (e) => {
    e.preventDefault();
    active = e.target.id;
    dispatch(setActive(active));
  };

  return (
    <div className='text-center p-8 h-auto border-r-2   text-white font-3xl'>
      <div className='flex flex-col content-end'>
        <div className='flex flex-col justify-between'>
          <button
            id='Mis Datos'
            className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg'
            onClick={handleSetActive}>
            Mis Datos
          </button>
          <button
            id='Mis Postulaciones'
            className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg'
            onClick={handleSetActive}>
            Mis Postulaciones
          </button>
          <button
            id='Mis Publicaciones'
            className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg'
            onClick={handleSetActive}>
            Mis Publicaciones
          </button>
          <button
            id='Mis Adopciones'
            className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg'
            onClick={handleSetActive}>
            Mis Adopciones
          </button>
        </div>
        <div>
          <button className='text-3xl self-end mt-96 transform  hover:scale-125 hover:text-red-800'>
            <BiLogOutCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
