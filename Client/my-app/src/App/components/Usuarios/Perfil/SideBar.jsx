import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, setActive } from '../../../redux/actions';
import { BiLogOutCircle } from 'react-icons/bi';

function SideBar() {
  let active = 'Mis Datos';
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.userData.type);

  const handleSetActive = (e) => {
    e.preventDefault();
    active = e.target.id;
    dispatch(setActive(active));
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <div className='text-center p-8 h-full border-r-2 text-white text-base'>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex flex-col justify-between'>
          <button id='Mis Datos' className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg' onClick={handleSetActive}>
            Mis Datos
          </button>
          <button id='Mis Publicaciones' className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg' onClick={handleSetActive}>
            Mis Publicaciones
          </button>
          <button id='Mis Postulaciones' className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg' onClick={handleSetActive}>
            Mis Postulaciones
          </button>
          <button id='Mis Adopciones' className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg' onClick={handleSetActive}>
            Mis Adopciones
          </button>
          {userType === 'Refugio' ? (
            <button id='Mis Eventos' className='my-4 p-2 border-2 border-white focus:bg-primary rounded-lg' onClick={handleSetActive}>
              Mis Eventos
            </button>
          ) : (
            false
          )}
        </div>

        <div>
          <button
            title='Cerrar sesión'
            onClick={handleLogOut}
            className='text-3xl self-end transform hover:scale-125 hover:text-red-800 transition-all'>
            <BiLogOutCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
