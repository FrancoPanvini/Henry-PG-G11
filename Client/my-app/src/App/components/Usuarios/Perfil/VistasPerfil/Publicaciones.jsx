import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPetsAdopByUser } from '../../../../redux/actions';
import FormularioPosteo from '../../../Mascotas/FormularioPosteo';
import FormularioPosteoPerdido from '../../../Mascotas/FormularioPosteoPerdido';
import CardPublicacion from '../CardsPefil/CardPublicacion';

function Publicaciones({ userId }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [petPosted, setPetPosted] = useState(false);

  //* cuando el botón de postear mascota se presiona, activa el re-renderizado (useEffect)
  const onPostPet = () => {
    setPetPosted(true);
  };

  useEffect(() => {
    if (petPosted) {
      dispatch(getPetsAdopByUser(userId));
      setPetPosted(false);
    }
    dispatch(getPetsAdopByUser(userId));
  }, [dispatch, userId, petPosted]);

  const pets = useSelector((state) => state.userPets.rows);

  return (
    <div className='container mx-auto  flex flex-col'>
      <div className='flex flex-row justify-center mt-8 h-full bg-gray-200'>
        <button
          className='btn btn-lg bg-primary text-white mr-16'
          onClick={() => setIsOpen(true)}>
          Postear mascota en adopcion
        </button>
        <button
          className='btn btn-lg bg-primary text-white '
          onClick={() => setIsOpen2(true)}>
          Postear mascota perdida
        </button>

        {isOpen && (
          <FormularioPosteo
            onClose={() => setIsOpen(false)}
            onPostPet={onPostPet}
          />
        )}
        {isOpen2 && (
          <FormularioPosteoPerdido
            onClose={() => setIsOpen2(false)}
            onPostPet={onPostPet}
          />
        )}
      </div>
      <div className='container mx-auto p-2'>
        {pets?.length === 0 ? (
          <div className='w-full flex flex-col mt-8 justify-center items-center'>
            <span className='text-primaryDark text-3xl p-2 m-2 font-bold'>
              No tenes ninguna mascota publicada
            </span>
            <img
              src='https://cdn-icons-png.flaticon.com/512/1230/1230935.png'
              alt='refugio'
              width='300px'
              height='300px'
              className='m-8'
            />
          </div>
        ) : (
          pets?.map((p) => {
            return (
              <div key={p.id}>
                <CardPublicacion
                  photo={
                    p.petPic
                      ? p.petPic
                      : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                  }
                  name={p.name}
                  petId={p.id}
                  userId={userId}
                  size={p.size}
                  age={p.age}
                  type={p.type}
                  gender={p.sex}
                  created={p.createdAt}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Publicaciones;
