import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip";
import Modal from "./pop-up/modal";

function Card({ photo, name, age, size, country, province, city, sex }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-auto h-5/6">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="card w-70 h-full grid justify-items-center">
          <img src={photo} alt="" className="w-full" />
          <h3 className="font-bold text-white bg-primary p-4 w-full grid justify-items-center">
            {name}
            <div className="pt-3">
              <button
                onClick={handleClick}
                className="btn bg-yellow-600 text-white border-yellow-700 rounded-md"
              >
                <h2 className="p-2">Ver mas</h2>
              </button>
            </div>
          </h3>
        </div>

        <div className="card h-full w-80 bg-secondary ">
          <div className="grid justify-items-center w-full">
            <div
              className="font-bold text-xl p-6 text-fourty cursor-pointer hover:text-white"
              onClick={handleClick}
            >
              {name}
            </div>
            <h3 className="p-1 text-white font-bold">
              Edad: <span className="text-fourty ">{age}</span>
            </h3>
            <h3 className="p-1 text-white font-bold">
              Tamano: <span className="text-fourty">{size}</span>
            </h3>
            <h3 className="p-1 text-white font-bold">
              Sexo <span className="text-fourty">: {sex}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Pais: <span className="text-fourty">{country}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Provincia:<span className="text-fourty"> {province}</span>
            </h3>

            <h3 className="pt-1 pb-4 text-white font-bold">
              Ciudad: <span className="text-fourty">{city}</span>
            </h3>
            {isLogged ? (
              <div>
                <button
                  className="btn bg-yellow-600 text-white border-yellow-700 rounded-md"
                  onClick={() => setIsOpen(true)}
                >
                  <h2 className="p-2">Postulate</h2>
                </button>

                <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
              </div>
            ) : null}
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
