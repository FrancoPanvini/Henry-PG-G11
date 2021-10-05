import React from 'react';
import CardsContainer from '../Cards/CardsContainer';
import FiltersBar from '../FilterBar/FiltersBar';

function Refugios() {
  return (
    <div className="grid grid-cols-7 place-items-center bg-gray-200">
      <FiltersBar className="place-self-center" />
      <CardsContainer title="REFUGIOS" className="col-span-6" />
    </div>
  );
}

export default Refugios;
