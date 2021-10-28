import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//? Components
import DetallePerdido from '../Mascotas/DetallePerdido';
import ReactCardFlip from 'react-card-flip';
import ContactoPerdido from '../pop-up/ContactoPerdido';

//? Icons
import { FaPaw } from 'react-icons/fa';

function CardLost({ selected, refProp, photo, name, size, country, province, city, id, userId }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isLogged = useSelector(state => state.isLogged);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const userData = useSelector(state => state.userData);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  return (
    <div className='w-auto h-5/6'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' className=''>
        <div onClick={handleClick} className='card card-size-lg'>
          <div className='w-full h-4/5 card-transparency-bottom relative object-cover'>
            <img src={photo ? photo : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'} alt='' className='h-full w-full object-cover' />
          </div>
          <div className='z-50 flex justify-center items-center pb-2 w-full h-1/5 text-white font-bold text-2xl capitalize'>{name}</div>
        </div>

        <div className='card card-size-lg relative'>
          <div onClick={handleClick} className='flex flex-col h-full items-center w-full  cursor-pointer'>
            <div className='font-bold text-xl p-6 text-fourty capitalize flex items-start gap-3 '>{name}</div>

            <div className='text-center'>
              {size && (
                <h3 className='p-1 text-white font-bold'>
                  Tamaño: <span className='text-fourty capitalize'>{size === 'c' ? 'pequeño' : size === 'm' ? 'mediano' : 'grande'}</span>
                </h3>
              )}
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
          </div>

          <div className='w-full h-px absolute bottom-16'>
            {/* Button & PopUp card for detail */}
            <button onClick={() => setIsOpenDetail(true)} className='btn rounded-2xl mr-4 bg-primaryDark text-white border-attentionLight'>
              <h2 className='p-2 tracking-wide'>Ver más detalles</h2>
            </button>
            {isOpenDetail && <DetallePerdido onClose={() => setIsOpenDetail(false)} petId={id} />}

            {/* Button & PopUp form for adoptions */}
            {isLogged && userData.phone ? (
              <button className='btn-adogtame bg-fourty text-white border-fourtyDark rounded-2xl' onClick={() => setIsOpen(true)}>
                <h2 className='p-2 flex items-center tracking-wide'>
                  C
                  <FaPaw />
                  NTACTATE
                </h2>
              </button>
            ) : (
              <></>
            )}
            {isOpen && <ContactoPerdido name={name} onClose={() => setIsOpen(false)} petId={id} userId={userId} />}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardLost;
