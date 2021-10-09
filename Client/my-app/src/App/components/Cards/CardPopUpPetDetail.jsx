import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

//? Services
import { getPetDetail } from '../../services/getPetDetail';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

//? Carousel
import Carousel from 'react-elastic-carousel';
const breakPoints = [{ width: 1, itemsToShow: 1 }];

function CardPopUpPetDetail({ onClose, petId }) {
  const [pet, setPet] = useState({});

  //* Seteamos en el estado los datos de la pet con su id
  useEffect(() => {
    const getPet = async (id) => {
      const pet = await getPetDetail(id);
      setPet(pet.data);
    };
    getPet(petId);
  }, [petId]);

  //* Definir

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 overflow-y-scroll '>
        <div className='panel relative top-32 mx-auto w-9/12 h-auto p-6 bg-gradient-to-r from-fourtyLight to-fourtyDark'>
          <IoIosCloseCircle
            className='text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all'
            onClick={onClose}
            title='Cerrar'
          />

          {/* ↓ mientras se carga la información en el estado */}
          {Object.keys(pet).length === 0 ? (
            <div className='flex justify-center items-center h-96 text-white text-2xl font-bold animate-pulse'>
              Cargando información...
            </div>
          ) : (

            /* ↓ una vez que tengo la información, la muestro */
            <>
              <div>
                <h3 className='font-bold text-4xl py-3 px-6 text-center text-white capitalize'>{pet?.name}</h3>
              </div>
              <div className='flex justify-center items-center h-full'>
                <div className={pet?.petPics ? 'w-1/2 pr-6' : 'w-full'}>
                  <p className=' text-lg p-6 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                    {pet?.sex === 'm' ? 'Es un macho ' : pet?.sex === 'h' ? 'Es una hembra ' : null}
                    {pet?.size === 'c'
                      ? 'de tamaño pequeño '
                      : pet?.size === 'm'
                      ? 'de tamaño mediano '
                      : pet?.size === 'g'
                      ? 'grande '
                      : null}
                    {pet?.age === 0
                      ? 'de menos de un año'
                      : pet?.age === 1
                      ? `de ${pet?.age} año`
                      : pet?.age > 1
                      ? `de ${pet?.age} años`
                      : null}
                    <span className='not-italic'> &#128512;</span>
                  </p>
                  {pet.description && (
                    <p className=' text-lg p-6 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                      <b>Descripción:</b> <br /> {pet?.description}
                    </p>
                  )}
                  <p className=' text-lg p-6 text-justify text-white italic'>
                    <b>Ubicación:</b> <br />
                    <span className='capitalize'>{`${pet?.city}, ${pet?.province}, ${pet?.country} `}</span>
                    <span className='not-italic'>&#127758;</span>
                  </p>
                </div>
                {pet?.petPics?.length > 0 && (
                  <div className='w-1/2 px-6 py-4 rounded-xl shadow-inner bg-fourtyDark bg-opacity-20'>
                    {pet.petPics.length === 1 ? (
                      <div className='h-full w-full flex justify-center'>
                        <img
                          src={pet.petPics[0]}
                          alt='not available'
                          className='object-cover rounded-xl shadow-lg h-96'
                        />
                      </div>
                    ) : (
                      <Carousel breakPoints={breakPoints}>
                        {pet?.petPics?.map((pic, index) => (
                          <div key={index} className='h-full w-full flex justify-center'>
                            <img
                              key={index}
                              src={pic}
                              alt='not available'
                              className='object-cover rounded-xl shadow-lg h-96'
                            />
                          </div>
                        ))}
                      </Carousel>
                    )}
                    {/* <div className='grid grid-cols-2 gap-3 justify-items-center mt-3'>
                {pet?.petPics?.map((pic, index) => (
                  <img key={index} src={pic} alt='not available' className='h-96 object-cover rounded-2xl' />
                  ))}
                </div> */}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default CardPopUpPetDetail;
