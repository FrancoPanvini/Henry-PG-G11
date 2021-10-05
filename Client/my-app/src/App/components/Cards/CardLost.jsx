import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import Modal from '../pop-up/modal';

function CardLost({ photo, name, size, country, province, city }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

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

        <div className="card h-96 w-80 bg-secondary">
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
              Tamano:{' '}
              <span className="text-fourty">
                {size === 'c' ? 'pequeño' : size === 'm' ? 'mediano' : 'grande'}
              </span>
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
                  <h2 className="p-2">Contactate</h2>
                </button>

                <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
              </div>
            ) : null}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardLost;
