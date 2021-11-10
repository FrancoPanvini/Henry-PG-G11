import React from 'react';

const CardAdopcion = ({ photo, name, created }) => {
  const pubDay = new Date(created);
  const now = new Date();
  const millDif = pubDay - now;
  const diffDays = Math.ceil(millDif / (1000 * 60 * 60 * 24));
  const timeAgo = new Intl.RelativeTimeFormat().format(diffDays, 'days');

  return (
    <div className='grid grid-cols-10 auto-cols-min place-items-center my-4 rounded-lg py-4 shadow-inner ring ring-primary ring-offset-2  w-full  border-4 bg-primary text-white '>
      <div className=''>
        <img
          src={photo ? photo : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
          alt=''
          className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-125 hover:pointer '
        />
      </div>
      <div className='col-span-3'>
        <span className='text-white text-2xl capitalize font-bold'>{name}</span>
      </div>
      <div className='col-span-2'>
        <span className=' text-gray-200 text-lg mr-8'>{`Adoptado ${timeAgo}`}</span>
      </div>
    </div>
  );
};

export default CardAdopcion;
