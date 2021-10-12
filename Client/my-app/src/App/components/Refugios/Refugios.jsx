import React from 'react';
// import { Link } from 'react-router-dom';

//? Components
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';

function Refugios() {
  return (
    <div className='grid grid-cols-7 place-items-center bg-gray-200 relative'>
      <button className='btn btn-lg bg-attention text-white border-primaryDark absolute top-18 2xl:left-12 lg:left-8'>
        {/* <Link to='/refugios/map'> */} 
          Buscar por mapa
        {/* </Link> */}
      </button>
      <FiltersBar className='place-self-center' />
      <CardsContainer title='REFUGIOS' className='col-span-6' />
    </div>
  );
}

export default Refugios;
