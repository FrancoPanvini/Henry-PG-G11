import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';

//? Components
import UploadImage from './../cargue-fotos/UploadImage';
import MapPost from '../Maps/MapPost';
import DatePick from './DatePick';
import ErrorIconPulsing from '../ErrorIconPulsing';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

//? Services
import { postEvent } from '../../services/postEvent';

function FormularioPosteoEvento({ onClose }) {
  const [evento, setEvento] = useState({
    name: '',
    description: '',
    initDate: '',
    endDate: '',
    Userid: localStorage.getItem('userId'),
    direction: '',
    lat: '',
    lng: '',
    mail: localStorage.getItem('userMail'),
    userName: localStorage.getItem('userName'),
  });

  //* errors
  const [errors, setErrors] = useState({});

  //* "url" es dir del evento
  const [url, setUrl] = useState([]);

  //* "location" es el estado que guarda la info del lugar de la mascota, el cuál en handlePublicar se postea en DB
  const [location, setLocation] = useState({
    city: '',
    province: '',
    country: '',
  });

  //* displayLocation es el texto que se le mostrará al usuario, compuesta de `${ciudad}, ${provincia}, ${país}`
  const [displayLocation, setDisplayLocation] = useState('');

  //* error validation
  const validate = ({ name, initDate, endDate, direction }) => {
    let errors = {};
    if (!name) {
      errors.name = 'El evento debe tener un nombre';
    }
    if (!initDate || !endDate) {
      errors.date = 'El evento debe tener fechas de inicio y finalización válidas';
    }
    if (initDate && endDate) {
      const init = new Date(initDate);
      const end = new Date(endDate);
      if (init >= end) {
        errors.date = 'El evento debe tener fechas de inicio y finalización válidas';
      }
    }
    if (!direction) {
      errors.direction = 'El evento debe tener una ubicación';
    }
    return errors;
  };

  //* input change handler
  const handleChange = e => {
    const newEvento = {
      ...evento,
      [e.target.name]: e.target.value,
    };
    setEvento(newEvento);
    setErrors(validate(newEvento));
  };

  //* Init datePick handler
  const handleInitDatePickChange = date => {
    const newEvento = {
      ...evento,
      initDate: date,
    };
    setEvento(newEvento);
    setErrors(validate(newEvento));
  };
  //* End datePick handler
  const handleEndDatePickChange = date => {
    const newEvento = {
      ...evento,
      endDate: date,
    };
    setEvento(newEvento);
    setErrors(validate(newEvento));
  };

  const handleLocation = () => {
    let adress = document.getElementById('route')?.innerHTML + ' ' + document.getElementById('street_number')?.innerHTML;
    let city = document.getElementById('administrative_area_level_2')?.innerHTML;
    let province = document.getElementById('administrative_area_level_1')?.innerHTML;
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
    const newEvento = {
      ...evento,
      direction: adress,
      lat: lat,
      lng: lng,
    };
    setEvento(newEvento);
    setErrors(validate(newEvento));
    setDisplayLocation(`${adress}, ${province}, ${country}`);
  };

  //* función que desactiva el botón Publicar cuando no todos los datos están completados
  const handleDisabled = () => {
    if (evento.name !== '' && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  //* Una vez que el usuario clickee en Publicar
  const handlePublicar = async e => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let newEvento = {
      ...evento,
      photo: url[0],
      Cityid: city.data.id,
    };
    postEvent(newEvento);
    swal({
      text: "¡Listo! Tu Evento fue publicado!'",
      icon: 'success',
      timer: '3000',
    });
    try {
      axios.post('/sendmail/postevent', {
        name: evento.name,
        mail: evento.userMail,
        userName: evento.userName,
        initDate: evento.initDate,
        endDate: evento.endDate,
        location: location.city,
      });
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 flex justify-center items-center'>
        <form className='panel flex flex-col w-4/5 min-w-max mx-auto bg-gradient-to-r from-primaryDark to-primary relative'>
          {/* ↓ botón para cancelar y volver atrás */}
          <IoIosCloseCircle className='text-fourty absolute top-3 right-3 text-3xl hover:text-fourtyLight cursor-pointer transition-all' onClick={onClose} />
          <div className='flex justify-between h-full'>
            <div className='flex flex-col w-1/2'>
              {/* ↓ Nombre del evento */}
              <label>
                Nombre del evento: <ErrorIconPulsing error={errors.name} color='thirty' />
              </label>
              <input name='name' onChange={handleChange} className='rounded-md px-1 mb-4' />

              {/* ↓ Fecha de inicio del evento */}
              <div className='flex mb-4'>
                <div className='text-center w-1/2 rounded-2xl px-4'>
                  <DatePick handleInput={handleInitDatePickChange} label='Fecha de inicio' />
                </div>

                {/* ↓ Fecha de finalizacion del evento */}
                <div className=' w-1/2 text-center border-l-2 border-primaryLight'>
                  <DatePick handleInput={handleEndDatePickChange} minDate={evento.initDate} label='Fecha de finalización' />
                  <ErrorIconPulsing error={errors.date} color='thirty' />
                </div>
              </div>

              {/* ↓ Descripción */}
              <label>Descripción:</label>
              <textarea name='description' placeholder='Ej.: La idea del evento es mostar nuestras mascotas y pasar un buen momento....' onChange={handleChange} className='rounded-md px-1 mb-4' />

              {/* ↓ Fotos */}
              <div className='flex flex-col bg-gradient-to-r from-primary to-primaryLight px-4 py-2'>
                <label>Foto: (incluir una única foto)</label>
                <UploadImage setUrl={setUrl} url={url} />
              </div>
              <br />
            </div>

            <div className='h-auto w-1/2 flex flex-col justify-center ml-4'>
              {/* ↓ Mapa de ubicación del evento */}
              <div>
                Ubicación del evento: (Seleccionar en el mapa y confirmar) <ErrorIconPulsing error={errors.direction} color='thirty' />
              </div>
              <input disabled type='text' id='direction' name='direction' value={displayLocation} className='rounded-md px-1 mb-2 text-white' />
              <MapPost onLocationChange={handleLocation} onChange={handleChange} className='h-full' />
              {/* ↓ botón Publicar */}
              <div className='w-full text-center mt-4'>
                <button
                  disabled={handleDisabled()}
                  onClick={handlePublicar}
                  className={`${handleDisabled() ? 'opacity-50 cursor-default border-b-2 border-thirty' : 'btn'} btn-xl bg-fourty text-white border-thirty`}
                >
                  Publicar
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
