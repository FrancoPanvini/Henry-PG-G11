import React,{useEffect, useState} from 'react'
import {getPetDetail} from '../../../../services/getPetDetail'


function CardPostulacion({PetId, state}) {
  const [pet, setPet] = useState(null)
  useEffect(() => {
    const getPet = async id => {
      const pet = await getPetDetail(id);
      setPet(pet.data);
    };
    getPet(PetId);
  }, [PetId]);

  console.log(pet)




  return (
    <div className='grid grid-cols-10 auto-cols-min place-items-center my-8 rounded-lg py-4 shadow-inner ring ring-primary ring-offset-2  w-full h-1/5 border-4 bg-primary text-white '>
    <div className=''>
      <img
        src={pet?.petPics[0] ? pet.petPics[0] : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png' }
        alt=''
        className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-125 hover:pointer '
      />
    </div>
    <div className='col-span-3'>
      <span className='text-white text-2xl capitalize font-bold'>{pet?.name}</span>
    </div>
    <div className='col-span-2'>
      <span className=' text-gray-200 text-lg mr-8'>
        {state === "p"? <h2>Pendiente</h2> : state === "c"? <h2> Cerrado </h2> : <h2>Aceptado</h2>}
      </span>
    </div>
  </div>
    
  )
}

export default CardPostulacion
