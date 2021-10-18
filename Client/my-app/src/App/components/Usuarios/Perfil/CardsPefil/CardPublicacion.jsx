import React, { useEffect, useState } from 'react';
import { BiTrash, BiEdit, BiHappyBeaming } from 'react-icons/bi';
import { GrDocumentText } from 'react-icons/gr';
import { getFormByPet } from '../../../../services/getFormByPet';
import FormSlider from './FormSlider';
import PopUpDelete from './PopUpDelete';
import PopUpEdit from './PopUpEdit';
import PopUpSetFound from './PopUpSetFound';

function CardPublicacion({
  photo,
  name,
  petId,
  userId,
  age,
  size,
  type,
  sex,
  created,
  onPostPet,
  found,
  updated
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);
  const [isOpenE, setIsOpenE] = useState(false);
  const [isOpenF, setIsOpenF] = useState(false);
  const [forms, setForms] = useState(null);

  const pubDay = new Date(found ? updated : created);
  const now = new Date();
  const millDif = pubDay - now;
  const diffDays = Math.ceil(millDif / (1000 * 60 * 60 * 24));
  const timeAgo = new Intl.RelativeTimeFormat().format(diffDays, 'days');

  useEffect(() => {
    const getForm = async (id) => {
      const form = await getFormByPet(id);
      setForms(form.data.length);
    };
    getForm(petId);
  }, [petId]);

  const ringColor = type ? 'ring-green-600' : 'ring-attention';

  return (
    <div
      className={`grid grid-cols-10 auto-cols-min place-items-center my-8 rounded-lg py-4 shadow-inner ring ${ringColor} ring-offset-2  w-full h-1/5 border-4 bg-primary text-white`}>
      <div className=''>
        <img
          src={photo}
          alt=''
          className='w-16 h-16 rounded-full object-cover ring-4 ring-gray-600 ring-opacity-50 transform duration-100 hover:scale-125 hover:pointer '
        />
      </div>
      <div className='col-span-3'>
        <span className='text-white text-2xl capitalize font-bold'>{name}</span>
      </div>
      <div className='col-span-2'>
        <span className=' text-gray-200 text-lg mr-8'>
          {type ? `En adopcion ${timeAgo}` : !type && !found ? `Perdido ${timeAgo}` : `Encontrado ${timeAgo}`}
        </span>
      </div>
      {type ? (
        <div className='col-span-3 flex items-center'>
          <span className='text-gray-200 text-lg mr-8'>
            Solicitudes: {forms ? forms : 0}
          </span>
          <button
            className='btn bg-gray-200 text-white w-10 h-10 flex justify-center items-center mr-2 text-2xl rounded-lg shadow-inner'
            title='Ver Solicitudes'>
            <GrDocumentText onClick={() => setIsOpen(true)} />
          </button>
          {isOpen && <FormSlider onClose={() => setIsOpen(false)} id={petId} />}
        </div>
      ) : (
        <div className='col-span-3 flex items-center'></div>
      )}
      <div className='flex'>
        {type ? (
          <button
            className='btn bg-gray-200 text-green-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner'
            title='Editar publicacion'
            onClick={() => setIsOpenE(true)}>
            <BiEdit />
          </button>
        ) : !found && (
          <button
            className='btn bg-gray-200 text-green-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner'
            title='Ya lo encontre!!!'
            onClick={() => setIsOpenF(true)}>
            <BiHappyBeaming />
          </button>
        )}

        {isOpenF &&  <PopUpSetFound
            onClose={() => setIsOpenF(false)}
            petId={petId}
            userId={userId}
            onPostPet={onPostPet}
          />}

        {isOpenE && (
          <PopUpEdit
            onClose={() => setIsOpenE(false)}
            petId={petId}
            name={name}
            age={age}
            size={size}
            photo={photo}
            type={type}
            sex={sex}
            userId={userId}
            onPostPet={onPostPet}
          />
        )}
        <button
          className='btn bg-gray-200 text-red-600 w-10 h-10 flex justify-center items-center text-2xl mr-2 rounded-lg shadow-inner'
          title='Eliminar publicacion'
          onClick={() => setIsOpenD(true)}>
          <BiTrash />
        </button>
        {isOpenD && (
          <PopUpDelete
            onClose={() => setIsOpenD(false)}
            petId={petId}
            userId={userId}
            onPostPet={onPostPet}
            type={type}
          />
        )}
      </div>
    </div>
  );
}

export default CardPublicacion;
