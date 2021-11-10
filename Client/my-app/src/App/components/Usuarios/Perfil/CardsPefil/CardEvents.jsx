import React, { useState } from 'react';
import { BiTrash, BiEdit } from 'react-icons/bi';
import PopUpDeleteEvent from './PopUpDeleteEvent';
import PopUpEditEvent from './PopUpEditEvent';

function CardEvents({ photo, name, initDate, endDate, userId, eventId, description, setUpdate, direction, lat, lng }) {
  const [isOpenE, setIsOpenE] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);

  const init = new Date(initDate).toLocaleString().slice(0, -3);
  const end = new Date(endDate).toLocaleString().slice(0, -3);

  return (
    <div className='grid grid-cols-10 auto-cols-min place-items-center my-8 rounded-lg py-4 shadow-inner ring ring-primary ring-offset-2  w-full h-1/5 border-4 bg-primary text-white '>
      <div className='1'>
        <img src={photo} alt='' className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-125 hover:pointer ' />
      </div>
      <div className='col-span-3'>
        <span className='text-white text-2xl capitalize font-bold'>{name}</span>
      </div>

      <div className='col-span-2 flex flex-col justify-center p-2 mx-4'>
        <label className=' text-gray-200 text-lg '>Fecha de inicio</label>
        <span className=' text-gray-200 text-lg font-bold'>{init}</span>
      </div>
      <div className='col-span-2 flex flex-col justify-center p-2'>
        <label className=' text-gray-200 text-lg'>Fecha de fin</label>
        <span className=' text-gray-200 text-lg font-bold'>{end}</span>
      </div>

      <div className='flex col-span-2'>
        <button className='btn bg-gray-200 text-green-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner' title='Editar publicacion' onClick={() => setIsOpenE(true)}>
          <BiEdit />
        </button>
        {isOpenE && (
          <PopUpEditEvent
            onClose={() => setIsOpenE(false)}
            eventId={eventId}
            userId={userId}
            name={name}
            description={description}
            initDate={initDate}
            endDate={endDate}
            setUpdate={setUpdate}
            direction={direction}
            photo={photo}
            lat={lat}
            lng={lng}
          />
        )}
        <button className='btn bg-gray-200 text-red-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner' title='Eliminar publicacion' onClick={() => setIsOpenD(true)}>
          <BiTrash />
        </button>
        {isOpenD && <PopUpDeleteEvent onClose={() => setIsOpenD(false)} eventId={eventId} userId={userId} setUpdate={setUpdate} />}
      </div>
    </div>
  );
}

export default CardEvents;
