import React, { useEffect, useState } from 'react';

//? Components
import ReactCardFlip from 'react-card-flip';
import DetalleRefugio from '../Refugios/DetalleRefugio';

//? Services
import { getPetsByUser } from '../../services/getPetsByUser';
import { getEventsByUserId } from '../../services/getEventsByUserId';
import { FaFacebookSquare, FaInstagram, FaGlobe, FaDonate } from 'react-icons/fa';


function CardRefugio({ selected, refProp, photo, name, phone, country, province, city, description, web, responsable, instagram, facebook, donaciones, id, lat, lng }) {

  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [events, setEvents] = useState([]);

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  console.log(!id ? 'cargando id' : id);
  useEffect(() => {

    /*   const getPetsLost = async (id) => {
      const rta = await getLostPetsByUser(id);
      setPets1(rta);
    }; */
    /*   getPetsLost(userId);*/

    

    const getEvents = async (id) => {

      const rta = await getEventsByUserId(id);
      setEvents(rta.data.rows);
    };
    getEvents(id);

    const getPetsAdop = async id => {
      const rta = await getPetsByUser(id);
      setPets(rta);
    };
    getPetsAdop(id);
  }, [id]);

  return (
    <div className='w-auto h-5/6'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection='vertical'>
        <div onClick={handleClick} className='card card-size-lg'>
          <div className='w-full h-4/5 card-transparency-bottom relative object-cover'>

            <img src={photo} alt='' className='h-full w-full object-cover' />

          </div>
          <div className='z-50 flex justify-center items-center pb-2 w-full h-1/5 text-white font-bold text-2xl capitalize'>{name}</div>
        </div>


        <div className='card card-size-lg relative '>
          <div onClick={handleClick} className='flex flex-col h-full items-center w-full  cursor-pointer'>
            <div className='font-bold text-xl p-6 text-fourty capitalize flex items-start gap-3 '>
              {name}
              {/* Button & PopUp card for detail */}
              <div className=''>
                <IoMdAddCircle
                  title='Ver más detalles'
                  onClick={() => setIsOpen(true)}
                  className='text-fourty absolute text-3xl hover:text-fourtyLight cursor-pointer transition-all bg-white rounded-full'
                />
                {isOpen && (
                  <DetalleRefugio
                    pets={pets}
                    events={events}
                    onClose={() => setIsOpen(false)}
                    photo={photo}
                    name={name}
                    phone={phone}
                    country={country}
                    province={province}
                    city={city}
                    web={socialNet}
                    responsable={responsable}
                    description={description}
                    instagram={instagram}
                    facebook={facebook}
                    donaciones={donaciones}
                  />
                )}
              </div>
            </div>


            <div className='text-center'>
              {responsable && (
                <h3 className='p-1 text-white font-bold'>
                  Responsable: <span className='text-fourty '>{responsable}</span>
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
              {phone && (
                <h3 className='p-1 text-white font-bold'>
                  Telefono:{' '}
                  <a href={`https://wa.me/${phone}`}>
                    <span className='text-fourty '>{phone}</span>
                  </a>
                </h3>
              )}
              {(web || facebook || instagram) && (
                <h3 className='p-1 text-white font-bold'>
                  Redes:
                  {web && (
                    <a href={web}>
                      <FaGlobe className='inline text-fourty mx-1 text-xl' />
                    </a>
                  )}
                  {facebook && (
                    <a href={facebook}>
                      <FaFacebookSquare className='inline text-fourty mx-1 text-xl' />
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram}>
                      <FaInstagram className='inline text-fourty mx-1 text-xl' />
                    </a>
                  )}
                </h3>
              )}

              {donaciones && (
                <h3 className='p-1 text-white font-bold'>
                  Donaciones:{' '}
                  <a href={donaciones}>
                    <FaDonate className='inline text-fourty mx-1 text-xl' />
                  </a>
                </h3>
              )}
            </div>
          </div>
          {/* Button & PopUp card for detail */}
          <div className='w-full h-px absolute bottom-16'>
            <button onClick={() => setIsOpen(true)} className='btn rounded-2xl mr-4 bg-primaryDark text-white border-attentionLight'>
              <h2 className='p-2 tracking-wide'>Ver más detalles</h2>
            </button>
            {isOpen && (
              <DetalleRefugio
                pets={pets}
                events={events}
                onClose={() => setIsOpen(false)}
                photo={photo}
                name={name}
                phone={phone}
                country={country}
                province={province}
                city={city}
                web={web}
                responsable={responsable}
                description={description}
                instagram={instagram}
                facebook={facebook}
                donaciones={donaciones}
                lat={lat}
                lng={lng}
              />
            )}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardRefugio;
