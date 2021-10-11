import React, { useState } from 'react';
import ReactDom from 'react-dom';

//? Components
import UploadImage from './../cargue-fotos/UploadImage';

//? Icons
import { FaWindowClose } from 'react-icons/fa';

//? Services
import { postLostPet } from '../../services/postLostPet';

function FormularioPosteoPerdido({ onClose, onPostPet }) {
  const [pet, setPet] = useState({
    name: '',
    size: '',
    description: '',
    Userid: '',
    Cityid: '',
    photo: '',
  });

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 pt-32'>
        <form className='panel flex flex-col w-4/5 max-w-3xl mx-auto bg-gradient-to-r from-primaryDark to-primary relative'>
          {/* ↓ botón para cancelar y volver atrás */}
          <FaWindowClose
            title='Cancelar y volver a Perdidos'
            className='absolute text-2xl right-2 top-2 text-fourty transition-all hover:text-fourtyLight'
            onClick={() => onClose()}
          />

          {/* RESTO DEL FORMULARIO */}
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default FormularioPosteoPerdido;
