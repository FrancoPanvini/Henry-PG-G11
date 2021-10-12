import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFormByUserId } from '../../../../services/getFormByUserId';
import CardPostulacion from '../CardsPefil/CardPostulacion';

function Postulaciones({ UserId }) {
  const [formsByUser, setFormsByUser] = useState([]);

  useEffect(() => {
    const getFormByUser = async (UserId) => {
      const forms = await getFormByUserId(UserId);
      console.log(forms.data);
      setFormsByUser(forms.data);
    };
    getFormByUser(UserId);
  }, [UserId]);

  return (
    <div className='container mx-auto  flex flex-col'>
      <div className='container mx-auto p-2 '>
      {formsByUser?.length === 0 ? (
        <div className='w-full flex flex-col  justify-center items-center'>
          <span className='text-primaryDark text-3xl p-2 m-2 font-bold'>
            Todavia no adoptaste a tu compañero?
          </span>
          <Link
            to='/adopciones'
            className='btn bg-primary w-1/6 rounded-lg m-8 p-4 font-bold text-center text-white'>
            ADOPTA AHORA
          </Link>
          <img
            src='https://cdn-icons-png.flaticon.com/512/1230/1230935.png'
            alt='refugio'
            width='300px'
            height='300px'
            className='m-8'
          />
        </div>
      ) : (
        formsByUser?.map((el) => {
          return (
            <div>
              <CardPostulacion PetId={el.PetId} state={el.state} />
            </div>
          );
        })
      )}
    </div>
    </div>
  );
}

export default Postulaciones;
