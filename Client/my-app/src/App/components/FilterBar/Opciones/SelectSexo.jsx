import React from 'react';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function SelectSexo({ urlFilter, handleSetUrl }) {
  const resetFilterSexo = e => {
    e.preventDefault();
    handleSetUrl({ target: { name: 'gender', value: '' } });
  };

  return (
    <>
      <label className='w-full h-7 font-bold flex items-center'>
        Sexo
        {urlFilter.gender && <IoIosCloseCircle title='Reset' onClick={resetFilterSexo} className='text-primary text-3xl hover:text-primaryLight cursor-pointer transition-all' />}
      </label>
      <div className='h-7'>
        <button value='m' name='gender' onClick={handleSetUrl} className={`w-20 btn-nav text-white transition-all ${urlFilter.gender === 'm' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Macho
        </button>
      </div>
      <div className='h-7 mb-2'>
        <button value='h' name='gender' onClick={handleSetUrl} className={`w-20 btn-nav text-white transition-all ${urlFilter.gender === 'h' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'}`}>
          Hembra
        </button>
      </div>
    </>
  );
}

export default SelectSexo;
