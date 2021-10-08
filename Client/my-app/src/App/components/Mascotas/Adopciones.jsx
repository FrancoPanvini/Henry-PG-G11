import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';
// import { Link } from 'react-router-dom';
import FormularioPosteo from './FormularioPosteo';

function Adopciones() {
  const isLogged = useSelector((state) => state.isLogged);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='grid grid-cols-7 place-items-center bg-gray-200'>
        <FiltersBar className='place-self-center fixed' />
        <CardsContainer title='ADOPCIONES' className='col-span-6' />
      </div>

      {isLogged && (
        <div className='flex justify-center py-12 bg-gray-200'>
          <button className='btn btn-lg bg-primary text-white' onClick={() => setIsOpen(true)}>Ofrecer una mascota en adopción</button>
          {isOpen && <FormularioPosteo onClose={() => setIsOpen(false)} />}
        </div>
      )}
    </div>
  );
}

export default Adopciones;
