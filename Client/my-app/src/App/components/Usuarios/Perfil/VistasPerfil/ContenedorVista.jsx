import React from 'react';
import { useSelector } from 'react-redux';
import DatosPersonales from './DatosPersonales';
import MisAdopciones from './MisAdopciones';
import Postulaciones from './Postulaciones';
import Publicaciones from './Publicaciones';
import MisEventos from './MisEventos';

function ContenedorVista({ userId }) {
  const active = useSelector(state => state.active);
  return (
    <div className='bg-gray-200 w-4/5 overflow-auto h-5/6 p-4 m-auto rounded-lg ring-8 ring-gray-300 shadow-inner'>
      {active === 'Mis Datos' ? (
        <DatosPersonales />
      ) : active === 'Mis Postulaciones' ? (
        <Postulaciones UserId={userId} />
      ) : active === 'Mis Publicaciones' ? (
        <Publicaciones userId={userId} />
      ) : active === 'Mis Adopciones' ? (
        <MisAdopciones />
      ) : active === 'Mis Eventos' ? (
        <MisEventos />
      ) : (
        false
      )}
    </div>
  );
}

export default ContenedorVista;
