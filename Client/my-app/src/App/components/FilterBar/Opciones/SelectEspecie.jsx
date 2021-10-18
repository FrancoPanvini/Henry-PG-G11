import React from 'react';

function SelectEspecie(urlFilter,handleSetUrl) {
  return (
    <> 
      <label className='w-full h-7 font-bold'>
        Especie
        {urlFilter.type && (
          <button value='' name='type' title='Resetear filtro de Especie' onClick={handleSetUrl} className='w-4 btn btn-nav text-white bg-primary'>
            x
          </button>
        )}
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
