import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

//? Services
import { getLostPetDetail } from '../../services/getLostPetDetail';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

//? Carousel, seteamos que muestre una sola foto por página
import Carousel from 'react-elastic-carousel';

//? mapas para mostrar la ubicación de la mascota
// import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker } from '@react-google-maps/api';
const options = {
  mapTypeControl: false,
  panControl: true,
  zoomControl: true,
  scaleControl: false,
  streetViewControl: false,
  clickableIcons: false,
};

const breakPoints = [{ width: 1, itemsToShow: 1 }];

function CardPopUpPetDetail({ onClose, petId }) {
  const [pet, setPet] = useState({});

  //* Seteamos en el estado los datos de la pet con su id
  useEffect(() => {
    const getPet = async (id) => {
      const pet = await getLostPetDetail(id);
      setPet(pet.data);
    };
    getPet(petId);
  }, [petId]);

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
            <div className='flex justify-center items-center h-96 text-white text-2xl font-bold animate-pulse'>Cargando información...</div>
          ) : (
            /* ↓ una vez que tengo la información, la muestro */
            <>
              <div>
                <h3 className='font-bold text-4xl py-3 px-6 text-center text-white capitalize'>{pet.name}</h3>
              </div>
              <div className='flex justify-center items-center h-full'>
                <div className={pet.petPics ? 'w-1/2 pr-6' : 'w-full'}>

                  {/* ↓ mostramos la descripción (si tiene) */}
                  {pet.description && (
                    <p className=' text-lg p-6 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                      <b>Descripción:</b> <br /> {pet.description}
                    </p>
                  )}
                  <p className=' text-lg p-6 text-justify text-white italic capitalize'>
                    <b>Zona en la que se perdió:</b> {`${pet.city}, ${pet.province}, ${pet.country} `}<br />
                    {/* <span className='capitalize mb-4 pb-4'>{`${pet.city}, ${pet.province}, ${pet.country} `}</span> <br /> */}
                    <div className='h-80 w-full'>
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '10px' }}
                        center={{ lat: pet.lat, lng: pet.lng }}
                        zoom={15}
                        options={options}
                        // bootstrapURLKeys={{ key: 'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY' }}
                        // margin={[50, 50, 50, 50]}
                        // options={{ gestureHandling: 'greedy', clickableIcons: false }}
                      >
                        <div lat={pet.lat} lng={pet.lng}>
                          <Marker
                            position={{ lat: pet.lat, lng: pet.lng }}
                            icon={{
                              url: '/1084899.svg',
                              scaledSize: new window.google.maps.Size(30, 30),
                              origin: new window.google.maps.Point(0, 0),
                              anchor: new window.google.maps.Point(15, 15),
                            }}
                          />
                        </div>
                      </GoogleMap>

                    </div>
                  </p>
                </div>

                {/* ↓ Si tiene fotos, las mostramos. Si es más de una, se muestran en un carousel */}
                {pet.petPics?.length > 0 && (
                  <div className='w-1/2 px-6 py-4 rounded-xl shadow-inner bg-fourtyDark bg-opacity-20'>
                    {pet.petPics.length === 1 ? (
                      <div className='h-full w-full flex justify-center'>
                        <img src={pet.petPics[0]} alt='not available' className='object-cover rounded-xl shadow-lg h-96' />
                      </div>
                    ) : (
                      <Carousel breakPoints={breakPoints}>
                        {pet.petPics.map((pic, index) => (
                          <div key={index} className='h-full w-full flex justify-center'>
                            <img key={index} src={pic} alt='not available' className='object-cover rounded-xl shadow-lg h-96' />
                          </div>
                        ))}
                      </Carousel>
                    )}
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
