import React from 'react';
import { useSelector } from 'react-redux';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function EventSlider() {
  /*   const [index, setIndex] = useState(0);
   */ const events = useSelector((state) => state.events);
  /*   let size = events.length - 1;

  useEffect(() => {
    if (index === size) setIndex(setIndex(0));
    setTimeout(() => setIndex(index + 1), 2000);
  }, [index, size]); */

  return (
    <div className='w-full h-auto  text-left px-32 py-16 bg-gray-200'>
      <span className='text-primary font-bold text-xl ml-4 '>EVENTOS</span>
      <Fade
        className='my-12'
        duration={6000}
        arrows={false}
        pauseOnHover={false}>
        {events &&
          events?.map((e) => {
            return (
              <div className='each-fade flex w-2/3 h-full  mx-auto rounded-lg bg-primary my-auto'>
                <div className='  w-1/3 flex flex-col justify-around uppercase text-gray-200'>
                  <div className= 'w-full pl-2'>
                    <h3 className='font-bold text-xl  text-center text-white capitalize'>
                      {e.name}
                    </h3>
                    <h3 className='font-bold text-lg text-center text-white'>
                      Organizado por {e.organizer}
                    </h3>
                    {/* ↓ mostramos la fecha de inicio y fin  */}
                    <p className=' text-md p-2 text-justify text-white italic border-b-2 border-fourty border-opacity-25'>
                      <span className='not-italic'>&#x1F4C5;</span>
                      <br />
                      <b>Fecha de inicio:</b> <br />
                      <span className='capitalize'>{`${new Date(e.initDate)
                        .toLocaleString()
                        .slice(0, -3)}`}</span>
                      <br />
                      <b>Fecha de fin:</b> <br />
                      <span className='capitalize'>{`${new Date(e.endDate)
                        .toLocaleString()
                        .slice(0, -3)}`}</span>
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
                </div>
                <img
                  src={e.photo}
                  alt='foto evento'
                  className='p-4 w-2/3 object-cover rounded-xl'
                />
              </div>
            );
          })}
      </Fade>
    </div>
  );
}

export default EventSlider;
