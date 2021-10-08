import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPetsAdopByUser } from '../../../../redux/actions';
import CardPublicacion from '../CardsPefil/CardPublicacion';

function Publicaciones({ userId }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPetsAdopByUser(userId));
  }, [dispatch, userId]);
  
  const pets = useSelector((state) => state.userPets.rows);



  return (
    <div className='container mx-auto  flex flex-col'>
      <div className='flex flex-row justify-center mt-8 h-full bg-gray-200'>
        <Link to='/adopciones/ofrecer' className='mx-auto'>
          <button className='btn btn-lg text-3xl bg-primary text-white'>
            Ofrecer una mascota en adopción
          </button>
        </Link>
        <Link to='/adopciones/ofrecer' className='mx-auto'>
          <button className='btn btn-lg text-3xl bg-primary text-white'>
            Postear perdido
          </button>
        </Link>
      </div>
      <div className='container mx-auto p-2'>
        {pets ? (
          pets.map((p) => {
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
                />
              </div>
            );
          })
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
}

export default Publicaciones;
