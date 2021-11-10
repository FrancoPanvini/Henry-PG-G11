import React, { useState, useEffect } from 'react';

//? Components
import CardEvents from '../CardsPefil/CardEvents';
import FormularioPosteoEvento from '../../../Eventos/FormularioPosteoEvento';

//? Services
import { getEventsByUserId } from '../../../../services/getEventsByUserId';

function MisEventos() {
  const userId = localStorage.getItem('userId');

  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  //* Import array de eventos del user
  useEffect(() => {
    const getEvents = async id => {
      const rta = await getEventsByUserId(id);
      setEvents(rta.data.rows);
    };
    getEvents(userId);
    if (update) setUpdate(false);
  }, [userId, isOpen, update]);

  return (
    <div className='container mx-auto flex flex-col'>
      <div className='flex flex-col justify-center mt-8 h-full'>
        <div className='w-full flex justify-center'>
          <button className='btn btn-lg bg-primary text-white' onClick={() => setIsOpen(true)}>
            Agrega un evento al calendario
          </button>
          {isOpen && <FormularioPosteoEvento onClose={() => setIsOpen(false)} />}
        </div>
        {events.length === 0 ? (
          <div className='w-full flex flex-col  justify-center items-center'>
            <span className='text-primaryDark text-3xl p-2 m-2 font-bold'>Todavia no publicastes ningún evento</span>
            <img src='https://cdn-icons-png.flaticon.com/512/1255/1255372.png' alt='refugio' width='300px' height='300px' className='m-8' />
          </div>
        ) : (
          events?.map(event => {
            return (
              <CardEvents
                key={event.id}
                name={event.name}
                photo={event.photo}
                initDate={event.initDate}
                endDate={event.endDate}
                userId={userId}
                description={event.description}
                eventId={event.id}
                setUpdate={setUpdate}
                direction={event.direction}
                lat={event.lat}
                lng={event.lng}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default MisEventos;
