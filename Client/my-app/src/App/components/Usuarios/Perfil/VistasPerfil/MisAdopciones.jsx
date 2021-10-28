import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialUser } from '../../../../redux/actions';
import CardAdopcion from '../CardsPefil/CardAdopcion';
import { Link } from 'react-router-dom';

function MisAdopciones() {
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const [pet, setPet] = useState([]);

  const initialPet = userId => {
    axios.get(`/pets?adopter=${userId}`).then(res => {
      setPet(res.data.rows);
      return res.data.rows;
    });
  };
  useEffect(() => {
    dispatch(initialUser(userId));
    initialPet(userId);
  }, [dispatch, userId]);

  return (
    <div className='container mx-auto  flex flex-col'>
      <div className='container mx-auto p-2 '>
        {pet?.length === 0 ? (
          <div className='w-full flex flex-col  justify-center items-center'>
            <span className='text-primaryDark text-3xl p-2 m-2 font-bold'>Todavia no adoptaste a tu compañero?</span>
            <Link to='/adopciones' className='btn bg-primary w-1/6 rounded-lg m-8 p-4 font-bold text-center text-white'>
              ADOPTA AHORA
            </Link>
            <img src='https://cdn-icons-png.flaticon.com/512/1230/1230935.png' alt='refugio' width='300px' height='300px' className='m-8' />
          </div>
        ) : (
          pet?.map(el => {
            return (
              <div key={el.id}>
                <CardAdopcion photo={el.petPic} name={el.name} created={el.updatedAt} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MisAdopciones;
