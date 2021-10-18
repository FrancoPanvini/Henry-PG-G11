import React from 'react';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function SelectEspecie({ urlFilter, handleSetUrl }) {
  const resetFilterEspecie = e => {
    e.preventDefault();
    handleSetUrl({ target: { name: 'type', value: '' } });
  };

  return (
    <>
      <label className='w-full h-7 font-bold flex items-center '>
        Especie
        {urlFilter.type && <IoIosCloseCircle title='Reset' onClick={resetFilterEspecie} className='text-primary text-3xl hover:text-primaryLight cursor-pointer transition-all' />}
      </label>
      <div className='h-7'>
        <button value='p' name='type' onClick={handleSetUrl} className={`w-16 btn-nav text-white ${urlFilter.type === 'p' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Perro
        </button>
      </div>
      <div className='h-7 mb-2'>
        <button value='g' name='type' onClick={handleSetUrl} className={`w-16 btn-nav text-white ${urlFilter.type === 'g' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Gato
        </button>
      </div>
    </>
  );
}

export default SelectEspecie;
