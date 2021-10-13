import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp, IoTimeOutline } from 'react-icons/io5';
import { getPetDetail } from '../../../../services/getPetDetail';
import { AiOutlineClose } from 'react-icons/ai';

function CardPostulacion({ PetId, state }) {
  const [pet, setPet] = useState(null);
  useEffect(() => {
    const getPet = async (id) => {
      const pet = await getPetDetail(id);
      setPet(pet.data);
    };
    getPet(PetId);
  }, [PetId]);

  return (
    <div className='grid grid-cols-10 auto-cols-min place-items-center my-8 rounded-lg py-4 shadow-inner ring ring-primary ring-offset-2  w-full h-1/5 border-4 bg-primary text-white '>
      <div className=''>
        <img
          src={
            pet?.petPics[0]
              ? pet.petPics[0]
              : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
          }
          alt=''
          className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-125 hover:pointer '
        />
      </div>
      <div className='col-span-3'>
        <span className='text-white text-2xl capitalize font-bold'>
          {pet?.name}
        </span>
      </div>
      <div className='col-span-2'>
        <div className=' text-gray-200 text-xl mr-8 '>
          {state === 'p' ? (
            <div className='flex justify-center items-center'>
              <span>Pendiente</span>
              <span className='text-white bg-yellow-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
                <IoTimeOutline />
              </span>
            </div>
          ) : state === 'c' ? (
            <div className='flex justify-center items-center'>
              <h2>Cerrado</h2>
              <span className='text-white bg-red-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <span>Aceptado</span>
              <span className='text-white bg-green-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
                <IoCheckmarkSharp />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPostulacion;
