import React from 'react';
import { Link } from 'react-router-dom';

function Things() {
  return (
    <div className='flex justify-around p-4 items-center text-center py-24 bg-gray-200  text-primary font-bold '>
      <Link to='/adopciones'>
        <div className='flex flex-col items-center mx-16'>
          <img src={process.env.PUBLIC_URL + '/adoptar.png'} alt='adoptar' width='200px' height='200px' className='mb-8' />
          <label className='text-2xl'>Adopta a tu compañero</label>
        </div>
      </Link>
      <Link to='/perdidos'>
        <div className='flex flex-col items-center mx-16'>
          <img src={process.env.PUBLIC_URL + '/ayuda.png'} alt='ayuda' width='200px' height='200px' className='mb-8' />
          <label className='text-2xl'>Ayuda a encontrarlos</label>
        </div>
      </Link>
      <Link to='/refugios'>
        <div className='flex flex-col items-center mx-16'>
          <img src={process.env.PUBLIC_URL + '/refugio.png'} alt='refugio' width='200px' height='200px' className='mb-8' />
          <label className='text-2xl'>Conoce todos los refugios</label>
        </div>
      </Link>
    </div>
  );
}

export default Things;
