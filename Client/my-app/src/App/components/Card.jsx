import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

function Card({ photo }) {
  //var photo = "https://www.hola.com/imagenes/estar-bien/20201105178590/perro-maltipoo-raza-pequena/0-937-760/maltipoo-perro-t.jpg";

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card">
          <img src={photo} alt="" className="w-full" onClick={handleClick}/>
          <h3 className='grid justify-items-center font-bold text-white bg-primary'>Nombre Mascota</h3>
        </div>

        <div>
          <div className="card px-6 py-4 h-full w-full bg-secondary" onClick={handleClick}>
            <div className="font-bold text-xl mb-2">Nombre Mascota</div>
            <p className="text-gray-700 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
              <br />
              <br />
              <button className="btn bg-yellow-600 text-white border-yellow-700">
                Contactame
              </button>
            </p>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );

  /* return (
    <div className="card">
      <img src={photo} alt="" className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Nombre Mascota</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 py-4 bg-primary">
        <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-2">
          Buenos Aires
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
          Perdido
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
          Cachorro
        </span>
      </div>
    </div>
  ); */
}

export default Card;
