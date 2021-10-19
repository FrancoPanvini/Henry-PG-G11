import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

//? Services
import { getEventDetail } from '../../services/getEventById';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function EventPopUpDetail({ onClose, id }) {
  const [event, setEvent] = useState({});

  //* Seteamos en el estado los datos de la pet con su id
  useEffect(() => {
    const getEvent = async (id) => {
      const event = await getEventDetail(id);
      setEvent(event.data);
    };
    getEvent(id);
  }, [id]);

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
          {Object.keys(event).length === 0 ? (
            <div className='flex justify-center items-center h-96 text-white text-2xl font-bold animate-pulse'>
              Cargando información...
            </div>
          ) : (
            /* ↓ una vez que tengo la información, la muestro */
            <>
              <div>
                <h3 className='font-bold text-4xl py-3 px-6 text-center text-white capitalize'>
                  {event.name}
                </h3>
                <h3 className='font-bold text-2xl py-3 px-6 text-center text-white'>
                  Organizado por {event.organizer}
                </h3>
              </div>
              <div className='flex justify-center items-center h-full'>
                <div className={event.photo ? 'w-1/2 pr-6' : 'w-full'}>
                  {/* ↓ mostramos la fecha de inicio y fin  */}
                  <p className=' text-lg p-6 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                    <span className='not-italic'>&#x1F4C5;</span>
                    <br />
                    <b>Fecha de inicio:</b> <br />
                    <span className='capitalize'>{`${new Date(event.initDate)
                      .toLocaleString()
                      .slice(0, -3)}`}</span><br/>
                    <b>Fecha de fin:</b> <br />
                    <span className='capitalize'>{`${new Date(event.endDate)
                      .toLocaleString()
                      .slice(0, -3)}`}</span>
                  </p>
                  {/* ↓ mostramos la descripción (si tiene) */}
                  {event.description && (
                    <p className=' text-lg p-6 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                      <b>Descripción:</b> <br /> {event.description}
                    </p>
                  )}
                  <p className=' text-lg p-6 text-justify text-white italic'>
                    <b>Ubicación:</b> <br />
                    <span className='capitalize'>{`${event.direction}`}</span><br/>
                    <span className='capitalize'>{`${event.city}, ${event.province}, ${event.country} `}</span>
                    <span className='not-italic'>&#127758;</span>
                  </p>
                </div>

                {/* ↓ Si tiene fotos, las mostramos. Si es más de una, se muestran en un carousel */}

                <div className='w-1/2 px-6 py-4 rounded-xl shadow-inner bg-fourtyDark bg-opacity-20'>
                  <div className='h-full w-full flex justify-center'>
                    <img
                      src={
                        event.photo
                          ? event.photo
                          : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                      }
                      alt='not available'
                      className='object-cover rounded-xl shadow-lg h-96'
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default EventPopUpDetail;
