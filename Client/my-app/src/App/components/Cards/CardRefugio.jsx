import React, { useState } from 'react';
// import { useSelector } from "react-redux";
import ReactCardFlip from 'react-card-flip';
// import Modal from "../pop-up/modal";
import {
  FaFacebookSquare,
  FaInstagram,
  FaGlobe,
  FaDonate,
} from 'react-icons/fa';

function CardRefugio({ photo, name, phone, country, province, city, description, socialNet, responsable, instagram, facebook, donaciones }) {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const isLogged = useSelector((state) => state.isLogged);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-auto h-5/6">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="card w-80 h-96 grid justify-items-center">
          <img src={photo} alt="" className="w-full h-72 object-cover" />
          <h3 className="font-bold text-white bg-primary p-4 w-full grid justify-items-center">
            {name.replace(/\b\w/g, function (l) {
              return l.toUpperCase();
            })}
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

        <div className="card h-96 w-80 bg-secondary ">
          <div className="grid justify-items-center w-full">
            <div
              className="font-bold text-xl p-6 text-fourty cursor-pointer hover:text-white"
              onClick={handleClick}
            >
              {name.replace(/\b\w/g, function (l) {
                return l.toUpperCase();
              })}
            </div>
            <h3 className="p-1 text-white font-bold">
              Nombre: <span className="text-fourty ">{name}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Responsable: <span className="text-fourty ">{responsable}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Pais: <span className="text-fourty">{country}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Provincia:<span className="text-fourty"> {province}</span>
            </h3>

            <h3 className="pt-1 text-white font-bold">
              Ciudad: <span className="text-fourty">{city}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Descripcion:<span className="text-fourty"> {description}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Telefono: <span className="text-fourty ">{phone}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Redes:{' '}
              <a href={socialNet}>
                <FaGlobe className="inline text-fourty mx-1 text-xl" />
              </a>
              <a href={facebook}>
                <FaFacebookSquare className="inline text-fourty mx-1 text-xl" />
              </a>
              <a href={instagram}>
                <FaInstagram className="inline text-fourty mx-1 text-xl" />
              </a>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Donaciones:{' '}
              <a href={donaciones}>
                <FaDonate className="inline text-fourty mx-1 text-xl" />
              </a>
            </h3>

            {/*  {isLogged ? (
              <div>
                <button
                  className="btn bg-yellow-600 text-white border-yellow-700 rounded-md"
                  onClick={() => setIsOpen(true)}
                >
                  <h2 className="p-2">Contactanos</h2>
                </button>

                <Modal name={name} description={description} open={isOpen} onClose={() => setIsOpen(false)}></Modal>
              </div>
            ) : null} */}
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

export default CardRefugio;
