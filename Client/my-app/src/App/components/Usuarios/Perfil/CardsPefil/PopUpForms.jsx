import React, { useEffect, useState } from 'react';
import { getUserById } from '../../../../services/getUserById';
import { acceptForms } from '../../../../services/acceptForms';
import { IoLogoWhatsapp } from 'react-icons/io5';
import swal from 'sweetalert';

const PopUpForms = ({ UserId, adult, dedication, oldPets, oldPetsDesc, otherPets, otherPetsDesc, residence, residents, onClose, formId, state }) => {
  const [user, setUser] = useState();

  const handleUser = async id => {
    await getUserById(id).then(res => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    handleUser(UserId);
  }, [UserId]);

  const handleAccept = e => {
    e.preventDefault();
    acceptForms(formId);
    swal({
      text: 'Has aceptado esta postulacion',
      icon: 'success',
      timer: '3000',
    });
    onClose();
  };
  return (
    <>
      <div className='bg-gray-50 bg-opacity-70 z-40 ' />
      <div className='z-50 p-4 rounded-lg h-96 bg-primaryDark text-white m-2'>
        <h2>
          Nombre: <span className='capitalize font-bold'>{user?.name}</span>{' '}
        </h2>
        <h2>
          Telefono : <span className='font-bold'> {user?.phone}</span>
        </h2>
        <h2>
          Pais: <span className='capitalize font-bold'>{user?.country}</span>{' '}
        </h2>
        <h2>
          Provincia: <span className='capitalize font-bold'>{user?.province}</span>{' '}
        </h2>
        <h2>
          Ciudad: <span className='capitalize font-bold'>{user?.city}</span>{' '}
        </h2>
        <h2>
          Es mayor de edad:
          <span className='capitalize font-bold'> {adult === true ? 'Si' : 'No'}</span>{' '}
        </h2>
        <h2>
          Dedicacion: <span className='capitalize font-bold'>{dedication} horas diarias</span>{' '}
        </h2>
        <h2>
          Tuvo mascotas en el pasado?
          <span className=' font-bold'>{oldPets ? (oldPetsDesc ? ` ${oldPetsDesc}` : ' Si') : ' No'}</span>
        </h2>
        <h2>
          Tiene mascotas actualmente?
          <span className=' font-bold'>{otherPets ? (otherPetsDesc ? ` ${otherPetsDesc}` : ' Si') : ' No'}</span>
        </h2>
        <h2>
          Tipo de propiedad:
          <span className=' font-bold'>{residence === ' app' ? ' Departamento' : ' Casa'}</span>
        </h2>
        <h2>
          Cuantas personas viven en su propiedad: <span className=' font-bold'>{residents}</span>
        </h2>
        <div className='flex w-full justify-around mt-8'>
          {state === 'p' ? (
            <>
              {' '}
              <button onClick={handleAccept} className='btn bg-white text-black font-bold rounded-lg hover:bg-green-600 hover:text-white p-2 '>
                Aceptar
              </button>
              <a
                href={`https://wa.me/${user?.phone}`}
                title='Contactate'
                target='_blank'
                rel='noreferrer'
                className='btn bg-green-600 text-white text-2xl font-bold rounded-lg hover:bg-white hover:text-green-600 p-2 '
              >
                <IoLogoWhatsapp />{' '}
              </a>{' '}
            </>
          ) : state === 'a' ? (
            <>
              {' '}
              <span className=' font-bold'>Contactate con el adoptante</span>{' '}
              <a
                href={`https://wa.me/${user?.phone}`}
                title='Contactate'
                target='_blank'
                rel='noreferrer'
                className='btn bg-green-600 text-white text-2xl font-bold rounded-lg hover:bg-white hover:text-green-600 p-2 '
              >
                <IoLogoWhatsapp />{' '}
              </a>{' '}
            </>
          ) : (
            <span className=' font-bold'>Adopcion cerrada</span>
          )}

          {/* <button>Rechazar</button> */}
        </div>
      </div>
    </>
  );
};

export default PopUpForms;
