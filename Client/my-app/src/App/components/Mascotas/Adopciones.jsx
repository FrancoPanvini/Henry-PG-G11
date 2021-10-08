import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPetsAdop } from '../../redux/actions';
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';
import FormularioPosteo from './FormularioPosteo';

function Adopciones() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);

  //* interruptor del pop-up del posteo de mascotas
  const [isOpen, setIsOpen] = useState(false);

  //* interruptor para re-renderizar tarjetas cuando se postea una mascota
  const [petPosted, setPetPosted] = useState(false);

  //* cuando el botón de postear mascota se presiona, activa el re-renderizado (useEffect)
  const onPostPet = () => {
    setPetPosted(true);
  };

  useEffect(() => {
    if (petPosted === true) {
      dispatch(getPetsAdop());
      setPetPosted(false);
    }
  }, [petPosted, dispatch]);

  return (
    <div>
      <div className='grid grid-cols-7 place-items-center bg-gray-200'>
        <FiltersBar className='place-self-center fixed' />
        <CardsContainer title='ADOPCIONES' className='col-span-6' />
      </div>

      {isLogged && (
        <div className='flex justify-center py-12 bg-gray-200'>
          <button className='btn btn-lg bg-primary text-white' onClick={() => setIsOpen(true)}>
            Ofrecer una mascota en adopción
          </button>
          {isOpen && <FormularioPosteo onClose={() => setIsOpen(false)} onPostPet={onPostPet} />}
        </div>
      )}
    </div>
  );
}

export default Adopciones;
