import React from 'react';

const CardAdopcion = ({photo, name}) => {
    return(
        <div className='flex flex-row justify-around items-center my-4 rounded-lg shadow-inner ring ring-primary ring-offset-2  w-full h-1/4 border-4 bg-primary text-white '>
      <img
        src={photo}
        alt=''
        className='w-16 h-16 rounded-full ring-4 ring-gray-600 ring-opacity-50 '
      />
      <span className='text-white text-3xl'>{name}</span>
      <span className='text-gray-200 text-xl'>En adopcion hace: 20 dias</span>
      <span className='text-gray-200 text-xl'>Solicitudes: 15</span>
      <button className='btn bg-gray-200 text-primary py-2 px-4 rounded-lg shadow-inner font-bold'>Ver</button>
    </div>
    )
}

export default CardAdopcion