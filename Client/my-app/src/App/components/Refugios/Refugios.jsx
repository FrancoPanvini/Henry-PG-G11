import React from 'react';
import { Link } from 'react-router-dom';

//? Components
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';

function Refugios() {
  return (
    <div className='grid grid-cols-7 auto-cols-min place-items-center bg-gray-200 relative min-h-screen82'>
      <div className='flex flex-col justify-start items-start w-full h-full'>
        <button className='btn btn-lg bg-attention text-white border-primaryDark mx-auto my-16'>
          <Link to='/refugios/map'>Buscar por mapa</Link>
        </button>
        <FiltersBar className='place-self-center' />
      </div>
      <CardsContainer title='REFUGIOS' className='col-span-6' />
    </div>
  );
}

export default Refugios;
