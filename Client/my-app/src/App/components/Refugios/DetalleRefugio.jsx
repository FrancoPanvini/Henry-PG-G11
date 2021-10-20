import React from 'react';
import ReactDom from 'react-dom';

//? Services

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';
import { GrInstagram, GrFacebook } from 'react-icons/gr';
import { BiWorld } from 'react-icons/bi';
import { FaDonate, FaWhatsapp } from 'react-icons/fa';

//? Components
import Carousel from 'react-elastic-carousel';
import CardAdopcion from '../Cards/CardAdopcion';
import CalendarComponent from '../Eventos/CalendarComponent';
import { GoogleMap, Marker } from '@react-google-maps/api';
const options = {
  mapTypeControl: false,
  panControl: true,
  zoomControl: true,
  scaleControl: false,
  streetViewControl: false,
  clickableIcons: false,
};

function DetalleRefugio({
  onClose,
  pets,
  events,
  photo,
  name,
  phone,
  country,
  province,
  city,
  web,
  responsable,
  description,
  instagram,
  facebook,
  donaciones,
  lat,
  lng,
}) {
  //* Seteamos en el estado los datos de la pet con su id
  // console.log(pets);
  console.log(lat, lng)
  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50'>
        <div className='panel relative top-20 mx-auto w-9/12 h-screen82 p-6 bg-gradient-to-r from-fourtyLight to-fourtyDark overflow-y-scroll'>
          <div className='flex justify-center mx-16 border-b-2 border-fourtyDark border-opacity-25'>
          <IoIosCloseCircle
            className='text-primary top-24 right-1/7 fixed text-3xl hover:text-primaryLight cursor-pointer transition-all'
            onClick={onClose}
            title='Cerrar'
          />
            <div className='w-2/3 flex flex-col mr-8'>
              <span className='py-1 text-primary text-3xl font-bold capitalize text-center'>{name}</span>

              <div className='py-6 px-5 border-b-2 border-fourtyDark border-opacity-25'>
                {description && (
                  <span className='text-white text-xl font-bold text-justify'>
                    Descripción: <br />
                    {description}
                  </span>
                )}
                <br />
                {responsable && (
                  <span className='text-white text-xl font-bold text-justify'>
                    Este refugio está a cargo de: <span className='capitalize'>{responsable}.</span>
                  </span>
                )}
              </div>
              <div className='w-full p-2 mb-2 ml-1 mr-4 flex justify-around items-center border-t-2 border-fourtyLight border-opacity-25'>
                {donaciones && (
                  <div className='w-1/4 p-2 h-full'>
                    <a
                      href={donaciones}
                      target='_blank'
                      rel='noreferrer'
                      className='btn w-full h-full p-2 flex flex-col justify-center items-center bg-donations rounded-lg text-white border-gray-600 tracking-wider'>
                      <FaDonate title='Donaciones' className='mr-2 text-3xl' /> DONACIONES
                    </a>
                  </div>
                )}
                <div className='w-3/4 grid grid-cols-2 gap-2 p-2'>
                  {web && (
                    <a
                      href={web}
                      target='_blank'
                      rel='noreferrer'
                      className='btn p-2 flex items-center justify-start bg-primary rounded-lg text-gray-700 border-gray-600'>
                      <BiWorld title='Web' className='inline mr-2' /> Sitio Web
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`https://wa.me/${phone}`}
                      target='_blank'
                      rel='noreferrer'
                      className='btn p-2 flex items-center justify-start bg-green-600 rounded-lg text-white border-gray-600'>
                      <FaWhatsapp title='WhatsApp' className='inline mr-2' /> {phone}
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target='_blank'
                      rel='noreferrer'
                      className='btn p-2 flex items-center justify-start bg-instagram2 rounded-lg text-white border-gray-600'>
                      <GrInstagram title='Instagram' className='inline mr-2' /> Página de Instagram
                    </a>
                  )}
                  {facebook && (
                    <a
                      href={facebook}
                      target='_blank'
                      rel='noreferrer'
                      className='btn p-2 flex items-center justify-start bg-facebook rounded-lg text-white border-gray-600'>
                      <GrFacebook title='Facebook' className='inline mr-2' /> Página de Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
            {photo && (
              <div className='w-1/3 p-4'>
                <img
                  src={photo}
                  alt='foto de usuario'
                  className='object-cover w-full max-w-md max-h-96 rounded-lg mx-auto ring ring-offset-4 ring-offset-gray-200'
                />
              </div>
            )}
          </div>

          <div className='pt-4 flex border-t-2 border-fourtyLight border-opacity-25'>
            <div className={`${pets.length === 0 ? 'w-full' : 'w-1/2'} p-4 mx-auto border-r-2 border-fourtyDark border-opacity-25`}>
              <span className='py-4 text-white text-xl font-bold capitalize inline-block'>Ubicación: {`${city}, ${province}, ${country}`}</span>
              <div className='h-96 w-full'>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '10px' }}
                  center={{ lat, lng }}
                  zoom={15}
                  options={options}>
                  <div>
                    <Marker
                      position={{ lat, lng }}
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
            </div>
            {pets.length !== 0 && (
              <div className='w-1/2 p-4 mx-auto flex flex-col items-center border-l-2 border-fourtyLight border-opacity-25'>
                <span className='py-4 text-white text-2xl font-bold'>Nuestras Mascotas en Adopción</span>

                <Carousel itemsToShow={1}>
                  {pets?.map((p) => {
                    return (
                      <div key={p.id}>
                        <CardAdopcion
                          photo={p.petPic ? p.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                          name={p.name}
                          age={p.age}
                          size={p.size}
                          sex={p.sex}
                          country={p.country}
                          province={p.province}
                          city={p.city}
                          id={p.id}
                          className='card-size-md'
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            )}
          </div>

          {events.length !== 0 && (
            <div className='w-2/3 mx-auto flex flex-col items-center'>
              <span className='text-white text-xl font-bold py-4'>Eventos</span>
              <CalendarComponent eventos={events} />
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default DetalleRefugio;
