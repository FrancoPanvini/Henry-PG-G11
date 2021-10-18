import React from 'react';
import ReactDom from 'react-dom';
import CardAdopcion from '../Cards/CardAdopcion';

//? Services

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';
import { GrInstagram, GrFacebook } from 'react-icons/gr';
import {BiWorld } from 'react-icons/bi';

//? Carousel, seteamos que muestre una sola foto por página
import Carousel from 'react-elastic-carousel';
import CalendarComponent from '../Eventos/CalendarComponent';
import { FaDonate, FaWhatsapp } from 'react-icons/fa';

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
}) {
  //* Seteamos en el estado los datos de la pet con su id
  console.log(pets);

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
           <img
              src={photo ? photo : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
              alt='foto de usuario'
              className='object-cover w-60 h-60 rounded-lg absolute right-28 mx-auto top-3 ring ring-offset-4 ring-offset-gray-200'
            />
          <span className='text-white text-2xl font-bold py-4'>{name}</span><br/>
          <span className='text-white text-xl font-bold py-4'>{`Responsable: ${responsable}`}</span><br/>
          <span className='text-white text-xl font-bold py-4'>{`${city}, ${province}, ${country}`}</span><br/>
          <span className='text-white text-xl font-bold py-4'>Descripcion:</span>
          <span className='text-white text-lg font-bold py-4'>{` ${description}`}</span><br/>
          <div className='w-1/3 p-2 m-2 flex justify-around text-2xl items-center'>
              <a
                href={instagram} target='_blank' rel='noreferrer'
                className='p-2 bg-gradient-to-b from-instagram via-red-500  to-yellow-500 rounded-lg text-white'>
                <GrInstagram title='Instagram' />
              </a>
              <a
                href={facebook} target='_blank' rel='noreferrer'
                className='p-2 bg-facebook rounded-lg text-white'>
                <GrFacebook title='Facebook' />
              </a>
              <a
                href={`https://wa.me/${phone}`} target='_blank' rel='noreferrer'
                className='p-2 bg-green-600 rounded-lg text-white'>
                <FaWhatsapp title='WhatsApp' />
              </a>
              <a
                href={web} target='_blank' rel='noreferrer'
                className='p-2 bg-primary rounded-lg text-white'>
                <BiWorld title='Web' />
              </a>
              <a
                href={donaciones} target='_blank' rel='noreferrer'
                className='p-2 bg-donations rounded-lg text-white'>
                <FaDonate title='Donaciones' />
              </a>
            </div>

          {pets.length !== 0 &&
            <div className='mx-auto flex flex-col items-center'>
              <span className='text-white text-xl font-bold py-4'>
                Nuestras mascotas en adopcion
              </span>

              <Carousel  itemsToShow={3}>
                {pets?.map((p) => {
                  return (
                    <div key={p.id}>
                      <CardAdopcion
                        photo={
                          p.petPic
                            ? p.petPic
                            : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                        }
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
          }

          {events.length !== 0 && 
            <div className='w-2/3 mx-auto flex flex-col items-center'>
              <span className='text-white text-xl font-bold py-4'>
                Eventos
              </span>
              <CalendarComponent eventos={events} />
            </div>
          }
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default DetalleRefugio;
