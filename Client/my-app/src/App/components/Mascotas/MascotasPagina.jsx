import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//? Components
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';
import FormularioPosteo from './FormularioPosteo';
import FormularioPosteoPerdido from './FormularioPosteoPerdido';

//? Services
import { getPetsAdop, getLostPets } from '../../redux/actions';

function Mascotas({ title }) {
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
      dispatch(title === 'ADOPCIONES' ? getPetsAdop() : getLostPets());
      setPetPosted(false);
    }
  }, [petPosted, dispatch, title]);

  return (
    <div className='grid grid-cols-7 place-items-center bg-gray-200 relative'>
      {isLogged && (
        <>
          <button
            className='btn btn-lg bg-primary text-white absolute top-18 right-8'
            onClick={() => setIsOpen(true)}>
            {title === 'ADOPCIONES'
              ? 'Ofrecer una mascota en adopción'
              : 'Publicar una mascota extraviada'}
          </button>
          {isOpen &&
            (title === 'ADOPCIONES' ? (
              <FormularioPosteo
                onClose={() => setIsOpen(false)}
                onPostPet={onPostPet}
              />
            ) : (
              <FormularioPosteoPerdido
                onClose={() => setIsOpen(false)}
                onPostPet={onPostPet}
              />
            ))}
        </>
      )}

      <FiltersBar className='place-self-center fixed' />
      <CardsContainer title={title} className='col-span-6' />
    </div>
  );
}

export default Mascotas;
