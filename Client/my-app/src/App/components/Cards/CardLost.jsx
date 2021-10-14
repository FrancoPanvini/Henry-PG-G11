import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
// import Modal from '../pop-up/modal';
import { FaPaw } from 'react-icons/fa';
// import { IoMdAddCircle } from 'react-icons/io';

function CardLost({ photo, name, size, country, province, city }) {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='w-auto h-5/6'>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection='horizontal'
        className=''>
        <div onClick={handleClick} className='card card-size-lg'>
          <div className='w-full h-4/5 card-transparency-bottom relative object-cover'>
            <img src={photo} alt='' className='h-full w-full object-cover' />
          </div>
          <div className='z-50 flex justify-center items-center pb-2 w-full h-1/5 text-white font-bold text-2xl capitalize'>
            {name}
          </div>
        </div>

        <div className='card card-size-lg relative '>
          <div
            onClick={handleClick}
            className='flex flex-col h-full items-center w-full  cursor-pointer'>
            <div className='font-bold text-xl p-6 text-fourty capitalize flex items-start gap-3 '>
              {name}
              {/* Button & PopUp card for detail */}
              {/*    <div className="">
                <IoMdAddCircle
                  title="Ver más detalles"
                  onClick={() => setIsOpenDetail(true)}
                  className="text-fourty absolute text-3xl hover:text-fourtyLight cursor-pointer transition-all bg-white rounded-full"
                />
                {isOpenDetail && <CardPopUpPetDetail onClose={() => setIsOpenDetail(false)} petId={id} />}
              </div> */}
            </div>

            <div className='text-center'>
              <h3 className='p-1 text-white font-bold'>
                Tamaño:{' '}
                <span className='text-fourty capitalize'>
                  {size === 'c'
                    ? 'pequeño'
                    : size === 'm'
                    ? 'mediano'
                    : 'grande'}
                </span>
              </h3>

              <h3 className='p-1 text-white font-bold'>
                Pais: <span className='text-fourty capitalize'>{country}</span>
              </h3>
              <h3 className='p-1 text-white font-bold'>
                Provincia:
                <span className='text-fourty capitalize'> {province}</span>
              </h3>
              <h3 className='pt-1 pb-4 text-white font-bold'>
                Ciudad: <span className='text-fourty capitalize'>{city}</span>
              </h3>
            </div>

            {/* Button & PopUp form for adoptions */}
            {isLogged && (
              <div className='mt-auto mb-4'>
                <button
                  className='shadow-buttonShadow btn-adogtame bg-fourty text-white border-fourtyDark rounded-2xl'
                  >
                  <h2 className='p-2 flex items-center tracking-wide'>
                    C
                    <FaPaw />
                    NTACTATE
                  </h2>
                </button>
                {/* 
                {isOpen && <FormularioAdopcion name={name} onClose={() => setIsOpen(false)} petId={id} />} */}
              </div>
            )}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardLost;
