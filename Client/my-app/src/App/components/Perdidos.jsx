import React from 'react';
import ContenedorCards from './Cards/ContenedorCards';
import FiltersBar from './FiltersBar';

function Perdidos() {
  return (
    <div className="grid grid-cols-7 place-items-center bg-gray-200">
      <FiltersBar className="place-self-center" />
      <ContenedorCards title="PERDIDOS" className="col-span-6" />
    </div>
  );
}

export default Perdidos;
