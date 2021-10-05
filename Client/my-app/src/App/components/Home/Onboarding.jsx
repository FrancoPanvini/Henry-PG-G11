import React from 'react';
import { Link } from 'react-router-dom';

function Onboarding() {
  return (
    <div className="relative bg-gradient-to-r from-thirty to-fourty h-screen80 flex items-center justify-center">
      
      <div className="flex flex-col items-center justify-center">
        <span className="text-center text-white text-3xl">
          ENCUENTRA A TU MASCOTA IDEAL
          <br /> Y DALE UN HOGAR
        </span>
        <br />
        <Link to="/registro">
          <button className="btn btn-lg bg-primary text-white border-fourty">
            REGISTRATE
          </button>
        </Link>
      </div>

      <div>
        <div className="bg-gatitosWeb bg-leftish-center bg-cover relative h-96 w-96 rounded-full ml-12 shadow-similBorderWhite floorShadowCircle" />
      </div>
    </div>
  );
}

export default Onboarding;
