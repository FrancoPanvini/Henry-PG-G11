import React from 'react';
import { useSelector } from 'react-redux';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function EventSlider() {
  const events = useSelector(state => state.events);

  return (
    <div className='w-full h-120 px-32 pt-32  text-left overflow-hidden bg-gray-200'>
      <span className='text-primary font-bold text-xl ml-4 '>EVENTOS</span>
      <Fade duration={6000} arrows={false} pauseOnHover={false}>
        {events &&
          events?.map(e => {
            return (
              <div className='each-fade flex w-2/3 h-104 p-2 mx-auto rounded-lg overflow-auto justify-between bg-primary my-auto'>
                <div className='w-1/3 flex flex-col pr-2 justify-around uppercase text-gray-200'>
                  <h3 className='font-bold text-xl  text-center text-white capitalize'>{e.name}</h3>
                  <h3 className='font-bold text-lg text-center text-white'>Organizado por {e.organizer}</h3>
                  {/* ↓ mostramos la fecha de inicio y fin  */}
                  <p className=' text-md p-2 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                    <span className='not-italic'>&#x1F4C5;</span>
                    <br />
                    <b>Fecha de inicio:</b> <br />
                    <span className='capitalize'>{`${new Date(e.initDate).toLocaleString().slice(0, -3)}`}</span>
                    <br />
                    <b>Fecha de fin:</b> <br />
                    <span className='capitalize'>{`${new Date(e.endDate).toLocaleString().slice(0, -3)}`}</span>
                  </p>
                  {/* ↓ mostramos la descripción (si tiene) */}
                  {e.description && (
                    <p className=' text-md p-2 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                      <b>Descripción:</b> <br /> {e.description}
                    </p>
                  )}
                  <p className=' text-md p-2 text-justify text-white italic'>
                    <b>Ubicación:</b> <br />
                    <span className='capitalize'>{`${e.direction}`}</span>
                    <br />
                    <span className='capitalize'>{`${e.city}, ${e.province}, ${e.country} `}</span>
                    <span className='not-italic'>&#127758;</span>
                  </p>
                </div>
                <div className='h-full w-2/3 bg-primaryDark rounded-lg  '>
                  <img
                    src={e.photo ? e.photo : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                    alt='foto evento'
                    className=' py-2 w-full h-full object-contain rounded-xl'
                  />
                </div>
              </div>
            );
          })}
      </Fade>
    </div>
  );
}

export default EventSlider;
