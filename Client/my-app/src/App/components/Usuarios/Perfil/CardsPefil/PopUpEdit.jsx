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
  sex,
  type,
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
        <div className='relative top-10 mx-auto w-2/4 max-w-3xl grid justify-items-center'>
          <div>
            <IoIosCloseCircle
              title='Cancelar y volver'
              className='text-thirty absolute top-3 right-3 text-3xl hover:text-thirtyLight cursor-pointer transition-all z-50'
              onClick={onClose}
            />
          </div>
          <div className='w-full max-w-3xl'>
            <FormEdit
              petId={petId}
              name={name}
              size={size}
              sex={sex}
              type={type}
              age={age}
              photo={photo}
              onClose={onClose}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default PopUpEdit;
