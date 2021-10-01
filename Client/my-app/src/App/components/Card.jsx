import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Modal from "./pop-up/modal";


function Card({ photo, name, age, size, country, province, city, sex }) {

  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-auto h-5/6">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="card w-70 h-full">

          <img src={photo} alt="" className="w-full" />
          <h3
            onClick={handleClick}
            className="grid justify-items-center font-bold text-white bg-primary p-8"
          >
            Nombre Mascota
          </h3>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>

          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            
          </Modal>

        </div>



        <div>

         

          <div className="card  h-full w-full bg-secondary " onClick={handleClick}>

          <div className="font-bold text-xl p-12">{name}</div>
          <h3>{age}</h3>
          <h3>{size}</h3>
          <h3>{sex}</h3>
          <h3>{country}</h3>
          <h3>{province}</h3>
          <h3>{city}</h3>

          <button className="btn bg-yellow-600 text-white border-yellow-700">
                Postulate
          </button>


            {/* <div className="font-bold text-xl p-12">Nombre Mascota</div>

            <p className="text-gray-700 text-xs" onClick={handleClick}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
              <br />
              <br />
              <button className="btn bg-yellow-600 text-white border-yellow-700">
                Contactame
              </button>
           </p> */}
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
