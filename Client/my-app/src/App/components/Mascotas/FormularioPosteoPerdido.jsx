import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';

//? Components
import UploadImage from './../cargue-fotos/UploadImage';
import MapPost from '../Maps/MapPost';
import RadioSelectButtons from '../RadioSelectButtons';
import ErrorIconPulsing from '../ErrorIconPulsing';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

//? Services
import { postLostPet } from '../../services/postLostPet';

function FormularioPosteoPerdido({ onClose, onPostPet }) {
  const [mascota, setMascota] = useState({
    name: '',
    PetsTypeid: '',
    size: '',
    description: '',
    lat: '',
    lng: '',
    Userid: localStorage.getItem('userId'),
    userMail: localStorage.getItem('userMail'),
    userName: localStorage.getItem('userName'),
  });

  //* "url" es el array de fotos de la mascota
  const [url, setUrl] = useState([]);

  //* "location" es el estado que guarda la info del lugar de la mascota, el cuál en handlePublicar se postea en DB
  const [location, setLocation] = useState({
    city: '',
    province: '',
    country: '',
  });

  //* displayLocation es el texto que se le mostrará al usuario, compuesta de `${ciudad}, ${provincia}, ${país}`
  const [displayLocation, setDisplayLocation] = useState('');

  //* "errors" es el objeto que la función validate del input manipula
  const [errors, setErrors] = useState({});

  //* validate recibe el input, si encuentra errores le agrega propiedades al estado de errors, el cuál desactiva el botón "Publicar"
  const validate = ({ name, lat }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Debes ingresar el nombre al que responde la mascota extraviada';
    }
    if (lat === '') {
      errors.direction = 'Tu mascota debe tener una ubicación';
    }
    return errors;
  };

  //* input change handler
  const handleChange = (e) => {
    e.preventDefault();
    const newMascota = {
      ...mascota,
      [e.target.name]: e.target.value,
    };
    setMascota(newMascota);
    setErrors(validate(newMascota));
  };

  const handleLocation = () => {
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
    setMascota((prevState) => {
      return {
        ...prevState,
        lat: lat,
        lng: lng,
      };
    });
    setErrors(validate({ ...mascota, lat, lng }));
    setDisplayLocation(`${city}, ${province}, ${country}`);
  };

  //* función que desactiva el botón Publicar cuando no todos los datos están completados
  const handleDisabled = () => {
    if (mascota.name !== '' && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  //* Una vez que el usuario clickee en Publicar
  const handlePublicar = async (e) => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let newMascota = {
      ...mascota,
      photo: url,
      Cityid: city.data.id,
    };
    postLostPet(newMascota);
    onPostPet();
    swal({
      text: 'La Mascota fue postulada en adopción',
      icon: 'success',
      timer: '3000',
    });
    try {
      axios.post('/sendmail/postlost', {
        name: mascota.name,
        mail: mascota.userMail,
        url: url[0],
        size: mascota.size,
        owner: mascota.userName,
        description: mascota.description,
      });
      console.log('correo enviado');
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
          <IoIosCloseCircle
            title='Cancelar y volver a Perdidos'
            onClick={onClose}
            className='text-thirty absolute top-3 right-3 text-3xl hover:text-thirtyLight cursor-pointer transition-all'
          />
          <div className='flex justify-between h-full w-full'>
            <div className='flex flex-col w-1/2'>
              {/* ↓ Nombre de la mascota */}
              <label>
                Responde al nombre de: <ErrorIconPulsing error={errors.name} color='thirty' />
              </label>
              <input name='name' onChange={handleChange} className='rounded-md px-1 mb-4' />

              {/* ↓ Especie de la mascota */}
              <div className='flex mb-4'>
                <div className='text-center w-1/2 rounded-2xl px-4 py-2'>
                  <label>Especie:</label>
                  <div className='flex justify-evenly items-center'>
                    <RadioSelectButtons
                      state={mascota}
                      name='PetsTypeid'
                      options={['Gato', 'Perro']}
                      values={['g', 'p']}
                      onSelection={handleChange}
                      colorsOff='bg-thirtyLight border-thirtyDark'
                      colorsOn='bg-thirtyDark'
                    />
                  </div>
                </div>

                {/* ↓ Tamaño de la mascota */}
                <div className='px-4 py-2 text-center border-l-2 border-primaryLight'>
                  <label>Tamaño:</label>
                  <div className='flex justify-evenly items-center'>
                    <RadioSelectButtons
                      state={mascota}
                      name='size'
                      options={['Chico', 'Mediano', 'Grande']}
                      values={['c', 'm', 'g']}
                      onSelection={handleChange}
                      colorsOff='bg-thirtyLight border-thirtyDark'
                      colorsOn='bg-thirtyDark'
                    />
                  </div>
                </div>
              </div>

              {/* ↓ Descripción */}
              <label>Descripción:</label>
              <textarea
                name='description'
                placeholder='Ej.: Tiene collar color rojo con plaquita con mi número de teléfono, no sabe cruzar la calle, etc...'
                onChange={handleChange}
                className='rounded-md px-1 mb-4'
              />

              {/* ↓ Fotos */}
              <div className='flex justify-evenly items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2'>
                <div className='w-full'>
                  <label>Foto: (preferentemente la mascota al centro de la imagen)</label>
                  <UploadImage url={url} setUrl={setUrl} />
                </div>
              </div>
              <br />
            </div>

            <div className='h-auto w-1/2 flex flex-col justify-center ml-4'>
              {/* ↓ Mapa de ubicación de la mascota */}
              <div>
                Zona en la que se perdió la mascota: (Seleccionar en el mapa y confirmar) <ErrorIconPulsing error={errors.direction} color='thirty' />
              </div>
              <input disabled type='text' id='direction' name='direction' value={displayLocation} className='rounded-md px-1 mb-2 text-white' />
              <MapPost onLocationChange={handleLocation} onChange={handleChange} className='h-full' />
              {/* ↓ botón Publicar */}
              <div className='w-full text-center mt-4'>
                <button
                  disabled={handleDisabled()}
                  onClick={handlePublicar}
                  className={`${
                    handleDisabled() ? 'opacity-50 cursor-default border-b-2 border-thirty' : 'btn'
                  } btn-xl bg-fourty text-white border-thirty`}>
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

export default FormularioPosteoPerdido;
