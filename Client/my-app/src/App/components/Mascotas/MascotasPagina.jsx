import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//? Components
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';
import FormularioPosteoAdopcion from './FormularioPosteoAdopcion';
import FormularioPosteoPerdido from './FormularioPosteoPerdido';

//? Services
import { getPetsAdop, getLostPets } from '../../redux/actions';

function Mascotas({ title }) {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged);
  const userData = useSelector(state => state.userData);

  //* interruptor del pop-up del posteo de mascotas
  const [isOpen, setIsOpen] = useState(false);

  //* interruptor para re-renderizar tarjetas cuando se postea una mascota
  const [petPosted, setPetPosted] = useState(false);
  const [petFiltered, setPetFiltered] = useState(false);

  //* cuando el botón de postear mascota se presiona, activa el re-renderizado (useEffect)
  const onPostPet = () => {
    setPetPosted(true);
  };
  const onFilterPet = () => {
    setPetFiltered(true);
  };

  useEffect(() => {
    if (petPosted === true) {
      dispatch(title === 'ADOPCIONES' ? getPetsAdop() : getLostPets());
      setPetPosted(false);
    }
  }, [petPosted, dispatch, title]);
  useEffect(() => {
    if (petFiltered === true) {
      setPetFiltered(false);
    }
  }, [petFiltered]);

  return (
    <div className='grid grid-cols-7 auto-cols-min bg-gray-200 relative min-h-screen82'>
      <div className='flex flex-col justify-start items-start w-full h-full'>
        <button className='btn btn-lg bg-attention text-white border-primaryDark mx-auto my-16'>
          <Link to={title === 'ADOPCIONES' ? '/adopciones/map' : '/perdidos/map'}>Buscar por mapa</Link>
        </button>

        <FiltersBar className='place-self-center fixed' onFilterPet={onFilterPet} />
      </div>
      <div className=' col-span-6 w-full'>
        {isLogged && userData.phone ? (
          <div>
            <button className='btn btn-lg bg-primary text-white absolute top-18 right-18' onClick={() => setIsOpen(true)}>
              {title === 'ADOPCIONES' ? 'Ofrecer una mascota' : 'Publicar una mascota'}
            </button>
            {isOpen &&
              (title === 'ADOPCIONES' ? (
                <FormularioPosteoAdopcion onClose={() => setIsOpen(false)} onPostPet={onPostPet} />
              ) : (
                <FormularioPosteoPerdido onClose={() => setIsOpen(false)} onPostPet={onPostPet} />
              ))}
          </div>
        ) : (
          <> </>
        )}
        <CardsContainer title={title} petPosted={petPosted} petFiltered={petFiltered} />
      </div>
    </div>
  );
}

export default Mascotas;
