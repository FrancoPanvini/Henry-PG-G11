import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//? Components
import FiltersBarEvents from '../FilterBar/FiltersBarEvents';
import FormularioPosteoEvento from './FormularioPosteoEvento';
import CalendarContainer from './CalendarContainer';

//? Actions
import { getEvents } from '../../redux/actions';

function Eventos() {
  const dispatch = useDispatch();

  //* Defino var para controlar boton de posteo solo si logeado y si es refugio
  const isLogged = useSelector(state => state.isLogged);
  const userType = useSelector(state => state.user.type);

  //* interruptor del pop-up del posteo de eventos
  const [isOpen, setIsOpen] = useState(false);

  //* Cargar events en store
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch, isOpen]);

  return (
    <div className='grid grid-cols-7 auto-cols-min place-items-center bg-gray-200 relative min-h-screen82'>
      <div className='flex flex-col justify-start items-start w-full h-full'>
        <FiltersBarEvents className='place-self-center  fixed' />
      </div>

      <div className=' col-span-6 w-full min-h-screen82'>
        {isLogged && (
          <div>
            {userType === 'r' && (
              <button className='btn btn-lg bg-primary text-white absolute top-18 right-18' onClick={() => setIsOpen(true)}>
                Publicar un evento
              </button>
            )}
            {isOpen && <FormularioPosteoEvento onClose={() => setIsOpen(false)} />}
          </div>
        )}
        <CalendarContainer />
      </div>
    </div>
  );
}

export default Eventos;
