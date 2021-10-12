import React, { useState } from 'react'
import {  useEffect } from 'react';
import { initialUser } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import FormularioDatos from '../CardsPefil/FormularioDatos';
import { BiEdit, BiTrash } from 'react-icons/bi';



function DatosIndividuo() {
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData)
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);



  useEffect(() => {
    dispatch(initialUser(userId))
  }, [dispatch, userId]);

  const handleClick = () => {
    setEdit(edit ? false : true);
  };

  return (
    <>
      {edit ? (
        <div>
          <FormularioDatos type='i' close={handleClick} user={user} />
        </div>
      ) : (
        <div className='relative'>
          <div className='flex flex-wrap'>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Nombre</label>
              <span className='rounded-md p-1 mb-2 bg-white capitalize'>
                {user.name}
              </span>
            </div>
            
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Mail</label>
              <span className='rounded-md p-1 mb-2 bg-white '>
                {user.mail}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Telefono</label>
              <span className='rounded-md p-1 mb-2 bg-white capitalize'>
                {user.phone}
              </span>
            </div>
            <img
              src={user.photo}
              alt='foto de usuario'
              className='object-cover w-60 h-60 rounded-full absolute right-28 mx-auto top-0 ring ring-offset-4 ring-offset-gray-200'
            />

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>Pais: </label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.country}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>Provincia/Departamento:</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.province}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>Ciudad:</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.city}
              </span>
            </div>
          
          </div>
          <div className='flex p-2 mx-2 mt-8 '>
            <button
              className='btn bg-green-600 text-white w-16 h-16 mr-8 flex justify-center items-center text-3xl rounded-full shadow-inner'
              title='Editar publicacion'
              onClick={handleClick}>
              <BiEdit />
            </button>
            <button
              className='btn bg-red-600 text-white w-16 h-16 flex justify-center items-center text-3xl  rounded-full shadow-inner'
              title='Eliminar cuenta'
              onClick={handleClick}>
              <BiTrash />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DatosIndividuo