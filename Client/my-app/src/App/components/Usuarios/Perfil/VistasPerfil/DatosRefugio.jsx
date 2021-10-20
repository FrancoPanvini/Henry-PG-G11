import React, { useState } from 'react';
import { useEffect } from 'react';
import { initialUser } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaDonate } from 'react-icons/fa';
import { GrInstagram, GrFacebook } from 'react-icons/gr';
import { BiEdit, /* BiTrash */ BiWorld } from 'react-icons/bi';
import FormularioDatos from '../CardsPefil/FormularioDatos';

const DatosRefugio = () => {
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(initialUser(userId));
  }, [dispatch, userId]);

  const handleClick = () => {
    setEdit(edit ? false : true);
  };

  return (
    <>
      {edit ? (
        <div>
          <FormularioDatos type='r' close={handleClick} user={user} />
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
              <label>Teléfono</label>
              <span className='rounded-md p-1 mb-2 bg-white capitalize'>
                {user.phone}
              </span>
            </div>
            <img
              src={user.photo? user.photo : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
              alt='foto de usuario'
              className='object-cover w-60 h-60 rounded-full absolute right-28 mx-auto top-0 ring ring-offset-4 ring-offset-gray-200'
            />

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>País</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.country}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>Provincia/Departamento</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.province}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label className=''>Ciudad</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.city}
              </span>
            </div>

            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Responsable</label>
              <span className='rounded-md p-1 bg-white mb-2 capitalize'>
                {user.responsable ? user.responsable : <span className="text-red-600">DEBE COMPLETAR ESTE CAMPO</span>}
              </span>
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Descripción</label>
              <span className='rounded-md p-1 mb-2  bg-white '>
                {user.description ? user.description : <span className="text-red-600">DEBE COMPLETAR ESTE CAMPO</span>}
              </span>
            </div>
            <div className='w-1/3 p-2 m-2 flex justify-around text-2xl items-center'>
              <a
                href={user.link_instagram} target='_blank' rel='noreferrer'
                className='p-2 bg-gradient-to-b from-instagram via-red-500  to-yellow-500 rounded-lg text-white'>
                <GrInstagram title='Instagram' />
              </a>
              <a
                href={user.link_facebook} target='_blank' rel='noreferrer'
                className='p-2 bg-facebook rounded-lg text-white'>
                <GrFacebook title='Facebook' />
              </a>
              <a
                href={user.link_web} target='_blank' rel='noreferrer'
                className='p-2 bg-primary rounded-lg text-white'>
                <BiWorld title='Web' />
              </a>
              <a
                href={user.link_donaciones} target='_blank' rel='noreferrer'
                className='p-2 bg-donations rounded-lg text-white'>
                <FaDonate title='Donaciones' />
              </a>
            </div>
          </div>
          <div className='flex p-2 mx-24 mt-16 '>
            <button
              className='btn bg-green-600 text-white w-16 h-16 mr-8 flex justify-center items-center text-3xl rounded-full shadow-inner'
              title='Editar datos'
              onClick={handleClick}>
              <BiEdit />
            </button>
            {/* <button
              className='btn bg-red-600 text-white w-16 h-16 flex justify-center items-center text-3xl  rounded-full shadow-inner'
              title='Eliminar cuenta'
              onClick={handleClick}>
              <BiTrash />
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DatosRefugio;
