import React from 'react';
import { BiTrash, BiEdit } from 'react-icons/bi';
import { GrDocumentText } from "react-icons/gr";

function CardPublicacion({ photo, name }) {

  return (
    <div className='grid grid-cols-10 auto-cols-min place-items-center  my-4 rounded-lg py-4 shadow-inner ring ring-primary ring-offset-2  w-full h-1/5 border-4 bg-primary text-white '>
       <div className="">
        <img
          src={photo}
          alt=''
          className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-150 hover:pointer '
        />
         </div> 
      <div className="col-span-3">
        <span className='text-white text-2xl capitalize font-bold'>{name}</span>
      </div>
      <div className='col-span-3'>
        <span className=' text-gray-200 text-xl mr-8'>
          En adopcion hace: 20 dias
        </span>
      </div>
      <div className="col-span-2">
        <span className='text-gray-200 text-xl mr-8'>Solicitudes: 15</span>
        <button className='btn bg-gray-200 text-white py-2 px-2 mr-2 text-2xl rounded-lg shadow-inner font-bold' title="Ver Solicitudes">
          <GrDocumentText/>
        </button>
      </div>
      <div className="">
        <button className='btn bg-gray-200 text-green-600 py-2 px-2 text-2xl mr-2 rounded-lg shadow-inner font-bold ' title="Editar publicacion">
          <BiEdit />
        </button>
        <button className='btn bg-gray-200 text-red-600 py-2 px-2 text-2xl mr-2 rounded-lg shadow-inner font-bold' title="Eliminar publicacion">
          <BiTrash />
        </button>
      </div>
    </div>
  );
}

export default CardPublicacion;
