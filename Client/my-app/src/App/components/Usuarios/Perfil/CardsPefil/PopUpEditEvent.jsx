import React from 'react';
import ReactDom from 'react-dom';

//? Services
import { IoIosCloseCircle } from 'react-icons/io';
import FormEditEvent from './FormEditEvent';
// import { useDispatch } from 'react-redux';
// import { getPetsAdopByUser } from '../../../../redux/actions';
// import { deletePet } from '../../../../services/deletePet';
//? Icons

function PopUpEditEvent({
  onClose,
  name,
  description,
  userId,
  eventId,
  initDate,
  endDate,
  setUpdate,
  direction,
  photo,
  lat,
  lng,
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
          <div>
            <IoIosCloseCircle
              className='text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all'
              onClick={onClose}
            />
          </div>
          <div className='w-full'>
            <FormEditEvent
              eventId={eventId}
              userId={userId}
              name={name}
              description={description}
              initDate={initDate}
              endDate={endDate}
              onClose={onClose}
              setUpdate={setUpdate}
              direction={direction}
              photo={photo}
              lat={lat}
              lng={lng}
            />
          </div>
    </>,
    document.getElementById('portal')
  );
}

export default PopUpEditEvent;
