import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp, IoTimeOutline } from 'react-icons/io5';
import { getPetDetail } from '../../../../services/getPetDetail';
import { AiOutlineClose } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import PopUpDeletePostulation from './PopUpDeletePostulation';

function CardPostulacion({ PetId, state, adopId, update }) {
  const [pet, setPet] = useState(null);
  const [isOpenD, setIsOpenD] = useState(false);

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
      <div className=' text-gray-200 text-xl mr-8 col-span-2'>
        {state === 'p' ? (
          <div className='flex justify-center items-center'>
            <span>Pendiente</span>
          </div>
        ) : state === 'c' ? (
          <div className='flex justify-center items-center'>
            <span>Cerrado</span>
          </div>
        ) : (
          <div className='flex justify-center items-center'>
            <span>Aceptado</span>
          </div>
        )}
      </div>
      <div className=' text-gray-200 text-xl mr-8 col-span-2'>
        {state === 'p' ? (
          <div className='flex justify-center items-center'>
            <span className='text-white bg-yellow-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
              <IoTimeOutline />
            </span>
          </div>
        ) : state === 'c' ? (
          <div className='flex justify-center items-center'>
            <span className='text-white bg-red-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
              <AiOutlineClose />
            </span>
          </div>
        ) : (
          <div className='flex justify-center items-center'>
            <span className='text-white bg-green-600 font-bold text-2xl ml-8 rounded-full p-2 shadow-2xl'>
              <IoCheckmarkSharp />
            </span>
          </div>
        )}
      </div>
      <div className='col-span-2'>
        <button
          className='btn bg-gray-200 text-red-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-white'
          title='Eliminar postulacion'
          onClick={() => setIsOpenD(true)}>
          <BiTrash />
        </button>
        {isOpenD && (
          <PopUpDeletePostulation
            onClose={() => setIsOpenD(false)}
            adopId={adopId}
            update={update}
          />
        )}
      </div>
    </div>
  );
}

export default CardPostulacion;
