import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { FaSave } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import UploadImage from '../../../cargue-fotos/UploadImage';

const PopUpPhoto = ({ onClose, setUrl }) => {
  const [newUrl, setNewUrl] = useState([]);

  const handleDisabled = () => {
    if (newUrl.length === 1) {
      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(newUrl);
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40'>
        <div className='fixed inset-0 z-50 overflow-y-scroll '>
          <div className='panel relative top-10 bg-primary mx-auto w-2/4 max-w-3xl'>
            <IoIosCloseCircle title='Cancelar y volver' className='text-thirty absolute top-1 right-1 text-3xl hover:text-thirtyLight cursor-pointer transition-all z-50' onClick={onClose} />
            <label>Foto: (sólo una foto)</label>
            <UploadImage url={newUrl} setUrl={setNewUrl} />
            <button
              disabled={handleDisabled()}
              onClick={handleSubmit}
              className={`${
                handleDisabled() ? 'opacity-50 cursor-default border-b-2 border-transparent' : 'btn'
              } bg-green-600 text-white w-12 h-12 flex shadow-2xl justify-center items-center text-xl rounded-full mx-auto`}
            >
              <FaSave onClick={onClose} title='Guardar' />
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default PopUpPhoto;
