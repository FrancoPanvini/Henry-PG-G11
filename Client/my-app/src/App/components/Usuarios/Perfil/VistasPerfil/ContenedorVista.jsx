import React from 'react';
import { useSelector } from 'react-redux';
import DatosPersonales from './DatosPersonales';
import MisAdopciones from './MisAdopciones';
import Postulaciones from './Postulaciones';
import Publicaciones from './Publicaciones';

function ContenedorVista() {
 
const active = useSelector((state) => state.active);
  return (
    <div className="bg-gray-200 h-5/6 w-5/6 p-4 m-auto rounded-lg shadow-inner">
      {active === 'Mis Datos' ? (
        <DatosPersonales />
      ) : active === 'Mis Postulaciones' ? (
        <Postulaciones />
      ) : active === 'Mis Publicaciones' ? (
        <Publicaciones />
      ) : (
        <MisAdopciones />
      )}
    </div>
  );
}

export default ContenedorVista;
