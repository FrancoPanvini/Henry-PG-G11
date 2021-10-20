import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';

//? Components
import MapPost from '../../../Maps/MapPost';
import DatePick from '../../../Eventos/DatePick';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';
/* import { FaExclamationCircle } from 'react-icons/fa';
 */
//? Services
import { updateEvent } from '../../../../services/updateEvent';

function FormularioPosteoEvento({
  onClose,
  name,
  description,
  userId,
  eventId,
  initDate,
  endDate,
  direction,
  setUpdate,
  photo, 
  lat, 
  lng
}) {
  const [evento, setEvento] = useState({
    name: name,
    description: description,
    initDate: initDate,
    endDate: endDate,
    Userid: localStorage.getItem('userId'),
    direction: direction,
    lat: lat,
    lng: lng
  });

  //* "url" es dir del evento
/*   const [url, setUrl] = useState([]);
 */
  //* "location" es el estado que guarda la info del lugar de la mascota, el cuál en handlePublicar se postea en DB
  const [location, setLocation] = useState({
    city: '',
    province: '',
    country: '',
  });

  //* "errors" es el objeto que la función validate del input manipula
/*   const [errors, setErrors] = useState({});
 */
  //* validate recibe el input, si encuentra errores le agrega propiedades al estado de errors, el cuál desactiva el botón "Publicar"
  /* const validate = ({ name, initDate, endDate, lat }) => {
    let errors = {};
    if (name) {
      errors.name = 'Debes ingresar el nombre del evento';
    }
    // if (!endDate) {
    //   errors.name = 'Debes ingresar la fecha y hora de fin ';
    // }
    // if (!initDate) {
    //   errors.name = 'Debes ingresar la fecha y hora de inicio';
    // }
    // if (lat === '') {
    //   errors.coords = 'Debes seleccionar la ubicación donde está tu mascota';
    // }
    return errors;
  };
 */
  //* input change handler
  const handleChange = (e) => {
    const newEvento = {
      ...evento,
      [e.target.name]: e.target.value,
    };
    setEvento(newEvento);
    // setErrors(validate(newEvento));
  };

  //* Init datePick handler
  const handleInitDatePickChange = (date) => {
    const newEvento = {
      ...evento,
      initDate: date,
    };
    setEvento(newEvento);
  };
  //* End datePick handler
  const handleEndDatePickChange = (date) => {
    const newEvento = {
      ...evento,
      endDate: date,
    };
    setEvento(newEvento);
  };

  const handleLocation = () => {
    let adress =
      document.getElementById('route')?.innerHTML +
      ' ' +
      document.getElementById('street_number')?.innerHTML;
    let city = document.getElementById(
      'administrative_area_level_2'
    )?.innerHTML;
    let province = document.getElementById(
      'administrative_area_level_1'
    )?.innerHTML;
    let country = document.getElementById('country')?.innerHTML;
    let lat = document.getElementById('lat')?.innerHTML;
    let lng = document.getElementById('lng')?.innerHTML;
    setLocation({
      city,
      province,
      country,
    });
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    setEvento((prevState) => {
      return {
        ...prevState,
        direction: adress,
        lat: lat,
        lng: lng,
      };
    });
  };

  //* función que desactiva el botón Publicar cuando no todos los datos están completados
  const handleDisabled = () => {
    if (evento.name !== '' /* && Object.keys(errors).length === 0 */) {
      return false;
    }
    return true;
  };

  //* Una vez que el usuario clickee en Publicar
  const handlePublicar = async (e) => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let newEvento = {
      ...evento,
      Cityid: city.data.id,
    };
    updateEvent(eventId, newEvento);
    swal({
      text: '¡Listo! Tu evento está  publicado!',
      icon: 'success',
      timer: 3000
    })
    setUpdate();
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 flex justify-center items-center'>
        <form className='panel flex flex-col w-4/5 min-w-max mx-auto bg-gradient-to-r from-primaryDark to-primary relative'>
          {/* ↓ botón para cancelar y volver atrás */}
          <IoIosCloseCircle
            className='text-fourty absolute top-3 right-3 text-3xl hover:text-fourtyLight cursor-pointer transition-all'
            onClick={onClose}
          />
          <div className='flex justify-between h-full'>
            <div className='flex flex-col'>
              {/* ↓ Nombre del evento */}
              <label>
                Nombre del evento: 
           {/*      {errors.name && (
                  <FaExclamationCircle
                    title={errors.name}
                    className='inline text-fourtyLight align-baseline'
                  />
                )} */}
              </label>
              <input
                name='name'
                onChange={handleChange}
                defaultValue={name}
                className='rounded-md px-1 mb-4'
              />

              {/* ↓ Fecha de inicio del evento */}
              <div className='flex mb-4'>
                <div className='text-center w-1/2 rounded-2xl px-4'>
                  <DatePick
                    handleInput={handleInitDatePickChange}
                    label='Fecha de inicio'
                    initDate={initDate}
                  />
                </div>

                {/* ↓ Fecha de finalizacion del evento */}
                <div className=' w-1/2 text-center border-l-2 border-primaryLight'>
                  <DatePick
                    handleInput={handleEndDatePickChange}
                    minDate={evento.initDate}
                    initDate={endDate}
                    label='Fecha de finalización'
                  />
                </div>
              </div>

              {/* ↓ Descripción */}
              <label>Descripción:</label>
              <textarea
                name='description'
                placeholder='Ej.: La idea del evento es mostar nuestras mascotas y pasar un buen momento....'
                onChange={handleChange}
                defaultValue={description}
                className='rounded-md px-1 mb-4'
              />

              {/* ↓ Fotos */}
              <div className='flex justify-evenly items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2'>
              {/*   <div>
                  <label>Foto: (incluir una única foto)</label>
                  <UploadImage setUrl={setUrl} />
                </div> */}
               {/*  <div className='w-32 h-32 bg-primaryDark border-2 border-primaryDark'>
                  {url.length === 0 ? (
                    <div className='h-full flex justify-center items-center text-center text-primaryLight'>
                      previsualización de imagen
                    </div>
                  ) : ( */}
                    <img
                      src={photo}
                      alt='previsualización de imagen'
                      className='w-full h-full object-cover'
                    />
               {/*    )}
                </div> */}
              </div>
              <br />
            </div>

            <div className='h-auto w-4/6 flex flex-col justify-center ml-4'>
              {/* ↓ Mapa de ubicación del evento */}
              <div>Ubicación del evento: {direction}</div>
              <input
                disabled
                type='text'
                id='direction'
                name='direction'
                value={location.city}
                className='rounded-md px-1 mb-2 text-white'
              />
              <MapPost
                onLocationChange={handleLocation}
                onChange={handleChange}
                className='h-full'
              />
              {/* ↓ botón Publicar */}
              <div className='w-full text-center mt-4'>
                <button
                  disabled={handleDisabled()}
                  onClick={handlePublicar}
                  className='btn btn-lg bg-thirty text-white border-fourty'>
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default FormularioPosteoEvento;
