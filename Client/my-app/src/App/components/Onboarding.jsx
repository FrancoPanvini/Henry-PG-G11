import React from 'react';
import { Link } from 'react-router-dom';

function Onboarding() {
  return (
    // <div className="relative bg-gradient-to-r from-thirty to-fourty h-screen80 grid grid-cols-2">
    <div className="relative bg-gradient-to-r from-thirty to-fourty h-screen80 flex items-center justify-center">

      {/* <div className="flex justify-evenly items-center h-96"> */}

      {/* ↓ Versión con foto adicional de cachorro (a la izquierda del texto de bienvenida), si se usa se debe activar la línea 6 PERO CON 3 COLUMNAS ↓ */}
      {/* <div className="bg-cachorroWeb bg-center-bottomish bg-cover relative onboarding-transparency-right" /> */}

      {/* ↓ CONTENIDO QUE SÍ O SÍ VA (texto de bienvenida) ↓ */}
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

      {/* ↓ Versión foto de gatitos con difuminado, si se usa hay que activar la línea 6 y desactivar la línea 7 ↓ */}
      {/* <div className="bg-gatitosWeb bg-leftish-center bg-cover relative onboarding-transparency-left" /> */}

      {/* ↓ Versión con foto circular de gatitos, si se usa hay que activar la línea 7 y desactivar la 6 ↓ */}
      <div>
        <div className="bg-gatitosWeb bg-leftish-center bg-cover relative h-96 w-96 rounded-full ml-12 shadow-similBorderWhite floorShadowCircle" />
      </div>
    </div>
  );
}

export default Onboarding;
