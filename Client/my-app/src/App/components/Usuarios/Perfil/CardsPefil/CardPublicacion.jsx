import React from 'react';
import { BiTrash, BiEdit } from 'react-icons/bi';

function CardPublicacion({ photo, name }) {
  return (
    <div className='flex flex-row justify-evenly items-center my-8 rounded-lg py-8 shadow-inner ring ring-primary ring-offset-2  w-full h-1/4 border-4 bg-primary text-white '>
      <img
        src={photo}
        alt=''
        className='w-20 h-20 rounded-full ring-4 ring-gray-600 ring-opacity-50 transform  hover:scale-150 hover:pointer '
      />
      <div>
        <span className='text-white text-4xl capitalize'>{name}</span>
      </div>
      <div>
        <span className='text-gray-200 text-2xl mr-8'>
          En adopcion hace: 20 dias
        </span>
      </div>
      <div>
        <span className='text-gray-200 text-2xl mr-8'>Solicitudes: 15</span>
        <button className='btn bg-gray-200 text-primary py-4 px-4 mr-2 text-xl rounded-lg shadow-inner font-bold'>
          Ver
        </button>
      </div>
      <div>
        <button className='btn bg-gray-200 text-green-600 py-2 px-2 text-2xl mr-2 rounded-lg shadow-inner font-bold'>
          <BiEdit />
        </button>
        <button className='btn bg-gray-200 text-red-600 py-2 px-2 text-2xl mr-2 rounded-lg shadow-inner font-bold'>
          <BiTrash />
        </button>
      </div>
    </div>
  );
}

export default CardPublicacion;
