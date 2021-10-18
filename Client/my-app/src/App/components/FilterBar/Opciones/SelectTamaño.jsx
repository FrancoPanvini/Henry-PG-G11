import React from 'react';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function SelectTamaño({ urlFilter, handleSetUrl }) {
  const resetFilterTamaño = e => {
    e.preventDefault();
    handleSetUrl({ target: { name: 'size', value: '' } });
  };

  return (
    <>
      <label className='w-full h-7 font-bold flex items-center'>
        Tamaño
        {urlFilter.size && <IoIosCloseCircle title='Reset' onClick={resetFilterTamaño} className='text-primary text-3xl hover:text-primaryLight cursor-pointer transition-all' />}
      </label>
      <div className='h-7'>
        <button value='c' name='size' onClick={handleSetUrl} className={`w-20 btn-nav text-white transition-all ${urlFilter.size === 'c' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Pequeño
        </button>
      </div>
      <div className='h-7'>
        <button value='m' name='size' onClick={handleSetUrl} className={`w-20 btn-nav text-white transition-all ${urlFilter.size === 'm' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Mediano
        </button>
      </div>
      <div className='h-7 mb-2'>
        <button value='g' name='size' onClick={handleSetUrl} className={`w-20 btn-nav text-white transition-all ${urlFilter.size === 'g' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Grande
        </button>
      </div>
    </>
  );
}

export default SelectTamaño;
