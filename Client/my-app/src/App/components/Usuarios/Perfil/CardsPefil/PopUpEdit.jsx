import React from 'react';
import ReactDom from 'react-dom';

//? Services
import { IoIosCloseCircle } from 'react-icons/io';
import FormEdit from './FormEdit';
// import { useDispatch } from 'react-redux';
// import { getPetsAdopByUser } from '../../../../redux/actions';
// import { deletePet } from '../../../../services/deletePet';
//? Icons

function PopUpEdit({
  onClose,
  petId,
  name,
  age,
  photo,
  size,
  gender,
  type,
  description,
  userId,
}) {
  // const dispatch = useDispatch();
  //* Seteamos en el estado los datos de la pet con su id
  /*   const delPet = async  () => {
      await deletePet(petId);
      dispatch(getPetsAdopByUser(userId));
      onClose();

  } */
  //* Definir

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 overflow-y-scroll '>
        <div className='relative top-10 mx-auto w-2/4 p-6 bg-fourty rounded-2xl grid justify-items-center  '>
          <div>
            <IoIosCloseCircle
              className='text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all'
              onClick={onClose}
            />
          </div>
          <div className='w-full'>
            <FormEdit
              petId={petId}
              name={name}
              size={size}
              gender={gender}
              description={description}
              type={type}
              age={age}
              photo={photo}
              onClose={onClose}
              userId={userId}
            />
          </div>
          <div className='flex justify-center'>
            <button
              className='btn bg-gray-200 p-4 m-4 rounded-lg'
              onClick={onClose}>
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default PopUpEdit;
