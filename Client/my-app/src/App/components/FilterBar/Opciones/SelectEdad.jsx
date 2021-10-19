import React from 'react';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function SelectEdad({ urlFilter, handleSetUrl }) {
  const resetFilterEdad = e => {
    e.preventDefault();
    handleSetUrl({ target: { name: 'resetEdad' } });
  };

  return (
    <>
      <label className='w-full h-7 font-bold mt-2 flex items-center'>
        Edad
        {(urlFilter.agemin || urlFilter.agemax) && <IoIosCloseCircle title='Reset' onClick={resetFilterEdad} className='text-primary text-3xl hover:text-primaryLight cursor-pointer transition-all' />}
      </label>
      <div className='flex justify-start w-full'>
        <div>
          Min:
          <br />
          <input type='number' name='agemin' min={0} max={20} value={urlFilter.agemin} className='mb-2 w-12 px-1 rounded-md mr-8' onChange={handleSetUrl} />
        </div>
        <div>
          Max:
          <br />
          <input type='number' name='agemax' min={0} max={20} value={urlFilter.agemax} className='mb-2 w-12 px-1 rounded-md' onChange={handleSetUrl} />
        </div>
      </div>
    </>
  );
}

export default SelectEdad;
