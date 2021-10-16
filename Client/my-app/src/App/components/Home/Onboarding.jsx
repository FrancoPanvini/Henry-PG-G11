import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Onboarding() {
  const   isLogged = useSelector((state) => state.isLogged);

  return (
    <div className='relative bg-gradient-to-r from-thirty to-fourty h-screen60 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-center text-white text-3xl'>
          ENCUENTRA A TU MASCOTA IDEAL
          <br /> Y DALE UN HOGAR
        </span>
        <br />
        {isLogged ? (
          <Link to='/adopciones'>
            <button className='btn btn-lg bg-primary text-white border-fourty'>
              ADOPTA
            </button>
          </Link>
        ) : (
          <Link to='/registro'>
            <button className='btn btn-lg bg-primary text-white border-fourty'>
              REGISTRATE
            </button>
          </Link>
        )}
      </div>

      <div>
        <div className='bg-gatitosWeb bg-leftish-center bg-cover relative md:h-52 md:w-52 lg:h-72 lg:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 rounded-full ml-12 shadow-similBorderWhite floorShadowCircle' />
      </div>
    </div>
  );
}

export default Onboarding;
