import React, { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
import ReactCardFlip from 'react-card-flip';
// import Modal from "../pop-up/modal";
import {
  FaFacebookSquare,
  FaInstagram,
  FaGlobe,
  FaDonate,
  // FaPaw,
} from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { getPetsByUser } from '../../services/getPetsByUser';
import { getEventsByUserId } from '../../services/getEventsByUserId';
import DetalleRefugio from '../Refugios/DetalleRefugio';
// import { useSelector } from 'react-redux';

function CardRefugio({ selected, refProp, photo, name, phone, country, province, city, description, socialNet, responsable, instagram, facebook, donaciones, id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //const isLogged = useSelector((state) => state.isLogged);
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

    const getEvents = async id => {
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
              <h3 className='p-1 text-white font-bold'>
                Responsable: <span className='text-fourty '>{responsable}</span>
              </h3>

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
              <h3 className='p-1 text-white font-bold'>
                Telefono:{' '}
                <a href={`https://wa.me/${phone}`}>
                  <span className='text-fourty '>{phone}</span>
                </a>
              </h3>
              <h3 className='p-1 text-white font-bold'>
                Redes:{' '}
                <a href={socialNet}>
                  <FaGlobe className='inline text-fourty mx-1 text-xl' />
                </a>
                <a href={facebook}>
                  <FaFacebookSquare className='inline text-fourty mx-1 text-xl' />
                </a>
                <a href={instagram}>
                  <FaInstagram className='inline text-fourty mx-1 text-xl' />
                </a>
              </h3>

              <h3 className='p-1 text-white font-bold'>
                Donaciones:{' '}
                <a href={donaciones}>
                  <FaDonate className='inline text-fourty mx-1 text-xl' />
                </a>
              </h3>
            </div>

            {/* Button & PopUp form for adoptions */}
            {/* isLogged && (
              <div className='mt-auto mb-4'>
                <button
                  className='shadow-buttonShadow btn-adogtame bg-fourty text-white border-fourtyDark rounded-2xl'
                  onClick={() => setIsOpen(true)}>
                  <h2 className='p-2 flex items-center tracking-wide'>
                    C
                    <FaPaw />
                    NTACTATE
                  </h2>
                </button> 
                 
                {isOpen && <FormularioAdopcion name={name} onClose={() => setIsOpen(false)} petId={id} />} 
              </div>
            ) */}
          </div>
        </div>

        {/*   <div className="card h-96 w-80 bg-secondary ">
          <div className="grid justify-items-center w-full">
            <div
              className="font-bold text-xl p-6 text-fourty cursor-pointer hover:text-white"
              onClick={handleClick}
            >
              {name.replace(/\b\w/g, function (l) {
                return l.toUpperCase();
              })}
            </div>
            <h3 className="p-1 text-white font-bold">
              Nombre: <span className="text-fourty ">{name}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Responsable: <span className="text-fourty ">{responsable}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Pais: <span className="text-fourty">{country}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Provincia:<span className="text-fourty"> {province}</span>
            </h3>

            <h3 className="pt-1 text-white font-bold">
              Ciudad: <span className="text-fourty">{city}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Descripcion:<span className="text-fourty"> {description}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Telefono: <span className="text-fourty ">{phone}</span>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Redes:{' '}
              <a href={socialNet}>
                <FaGlobe className="inline text-fourty mx-1 text-xl" />
              </a>
              <a href={facebook}>
                <FaFacebookSquare className="inline text-fourty mx-1 text-xl" />
              </a>
              <a href={instagram}>
                <FaInstagram className="inline text-fourty mx-1 text-xl" />
              </a>
            </h3>

            <h3 className="p-1 text-white font-bold">
              Donaciones:{' '}
              <a href={donaciones}>
                <FaDonate className="inline text-fourty mx-1 text-xl" />
              </a>
            </h3> */}

        {/*  {isLogged ? (
              <div>
                <button
                  className="btn bg-yellow-600 text-white border-yellow-700 rounded-md"
                  onClick={() => setIsOpen(true)}
                >
                  <h2 className="p-2">Contactanos</h2>
                </button>

                <Modal name={name} description={description} open={isOpen} onClose={() => setIsOpen(false)}></Modal>
              </div>
            ) : null} */}
        {/* </div> */}
        {/* </div> */}
      </ReactCardFlip>
    </div>
  );
}

export default CardRefugio;
