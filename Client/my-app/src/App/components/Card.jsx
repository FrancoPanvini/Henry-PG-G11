import React from "react";


function Card({photo}) {
  //var photo = "https://www.hola.com/imagenes/estar-bien/20201105178590/perro-maltipoo-raza-pequena/0-937-760/maltipoo-perro-t.jpg";

  return (
    <div className="card bg-white ">
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
  );
}

export default Card;
