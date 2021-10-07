import React from 'react';
import { useSelector } from 'react-redux';
import DatosPersonales from './DatosPersonales';
import MisAdopciones from './MisAdopciones';
import Postulaciones from './Postulaciones';
import Publicaciones from './Publicaciones';

function ContenedorVista({userId}) {
 
const active = useSelector((state) => state.active);
  return (
    <div className="bg-gray-200 h-5/6 w-5/6 p-4 m-auto rounded-lg ring-8 ring-gray-300 shadow-inner">
      {active === 'Mis Datos' ? (
        <DatosPersonales />
      ) : active === 'Mis Postulaciones' ? (
        <Postulaciones />
      ) : active === 'Mis Publicaciones' ? (
        <Publicaciones userId={userId} />
      ) : (
        <MisAdopciones />
      )}
    </div>
  );
}

export default ContenedorVista;
