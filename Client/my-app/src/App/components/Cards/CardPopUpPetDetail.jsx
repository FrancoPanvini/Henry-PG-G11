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
        <div className='panel relative top-10 mx-auto w-9/12 h-screen85 p-6 bg-gradient-to-r from-fourtyLight to-fourtyDark'>
          <div>
            <h3 className='font-bold text-3xl py-3 px-6 text-center text-white capitalize'>{pet?.name}</h3>
          </div>
          <div className='flex justify-items-center'>

            <div className={pet?.petPics?.length > 0 ? 'w-1/2' : 'w-full'}>
              <IoIosCloseCircle
                className='text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all'
                onClick={onClose}
              />
              <p className=' text-lg py-1 px-6 text-justify text-white italic'>{pet?.description}</p>
              <p className=' text-lg py-1 px-6 text-justify text-white italic'>
                {pet?.sex === 'm' ? 'Es un macho ' : 'Es una hembra '}
                {pet?.size === 'c' ? 'de tamaño pequeño ' : pet?.size === 'm' ? 'de tamaño mediano ' : 'grande '}
                {pet?.age === 0 ? 'de menos de un año' : pet?.age === 1 ? `de ${pet?.age} año` : `de ${pet?.age} años`}
                <span className='not-italic'> &#128512;</span>
              </p>
              <p className=' text-lg py-1 px-6 text-justify text-white italic'>
                Vive en <span className='capitalize'>{`${pet?.city}, ${pet?.province}, ${pet?.country} `}</span>
                <span className='not-italic'>&#127758;</span>
              </p>
            </div>
            <div className='w-1/2'>
              {pet?.petPics?.length > 0 && (
                <div>
                  <p className=' text-lg py-1 px-6 text-justify text-white italic'>
                    Mira q lind{pet?.sex === 'm' ? 'o' : 'a'} que es <span className='not-italic'>&#128525;</span>
                  </p>
                  <br />
                  <Carousel breakPoints={breakPoints}>
                    {pet?.petPics?.map((pic, index) => (
                      <div key={index} className='bg-gray-500 h-full w-full flex justify-center'>
                        <img key={index} src={pic} alt='not available' className='h-96 object-cover rounded-2xl shadow-similBorderWhite' />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
              {/* <div className='grid grid-cols-2 gap-3 justify-items-center mt-3'>
                {pet?.petPics?.map((pic, index) => (
                  <img key={index} src={pic} alt='not available' className='h-96 object-cover rounded-2xl' />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default CardPopUpPetDetail;
