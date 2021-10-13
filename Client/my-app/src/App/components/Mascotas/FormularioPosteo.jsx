import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import UploadImage from './../cargue-fotos/UploadImage';
import { postPets } from '../../redux/actions/index';
import MapPost from '../Maps/MapPost';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';
import { FaExclamationCircle } from 'react-icons/fa';

function FormularioPosteo({ onClose, onPostPet }) {
  const [mascota, setMascota] = useState({
    name: '',
    size: '',
    sex: '',
    age: null,
    description: '',
    Ownerid: localStorage.getItem('userId'),
    PetsTypeid: '',
    Cityid: localStorage.getItem('userCityid'),
    lat: '',
    lng: '',
  });
  const [url, setUrl] = useState([]);
  const [errors, setErrors] = useState({});

  const [location, setLocation] = useState({});

  const validate = ({ name, PetsTypeid, lat }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Tu mascota debe tener un nombre';
    }
    if (PetsTypeid === '') {
      errors.PetsTypeid = 'Debes seleccionar si tu mascota es perro o gato';
    }
    /*     if (lat === '') {
       errors.coords = "Debes seleccionar la ubicación donde está tu mascota"
     } */
    return errors;
  };

  const handleChange = e => {
    const newMascota = {
      ...mascota,
      [e.target.name]: e.target.value,
    };
    setMascota(newMascota);
    setErrors(validate(newMascota));
  };

  const handleDisabled = () => {
    if (mascota.name !== '' && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  const handlePublicar = async e => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let newMascota = {
      ...mascota,
      photo: url,
      Cityid: city.data.id,
    };
    console.log(newMascota);
    postPets(newMascota);
    onPostPet();
    setUrl([]);
    alert('¡Listo! Tu posteo está pendiente de confirmación, ¡muy pronto será publicado!');
    onClose();
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
    setMascota(prevState => {
      return {
        ...prevState,
        lat: lat,
        lng: lng,
      };
    });
  };

  return ReactDom.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40' />
      <div className='fixed inset-0 z-50 flex justify-center items-center'>
        <form className='panel flex flex-col w-4/5 min-w-max mx-auto bg-gradient-to-r from-primaryDark to-primary relative'>
          {/* ↓ botón para cancelar y volver atrás */}
          <IoIosCloseCircle className='text-fourty absolute top-3 right-3 text-3xl hover:text-fourtyLight cursor-pointer transition-all' onClick={onClose} />
          <div className='flex justify-between h-full'>
            <div className='flex flex-col'>
              {/* ↓ Nombre de la mascota */}
              <label>Nombre de la mascota: {errors.name && <FaExclamationCircle title={errors.name} className='inline text-fourtyLight align-baseline' />}</label>
              <input name='name' onChange={handleChange} className='rounded-md px-1 mb-4' />

              <div className='flex'>
                {/* ↓ Especie de la mascota */}
                <div className='text-center w-1/2 rounded-2xl px-4 py-2'>
                  <label>Especie: {errors.PetsTypeid && <FaExclamationCircle title={errors.PetsTypeid} className='inline text-fourtyLight align-baseline' />}</label>
                  <div className='flex justify-evenly items-center'>
                    <label htmlFor='gato'>
                      <input name='PetsTypeid' type='radio' id='gato' value='g' onChange={handleChange} />
                      Gato
                    </label>
                    <label htmlFor='perro'>
                      <input name='PetsTypeid' type='radio' id='perro' value='p' onChange={handleChange} />
                      Perro
                    </label>
                  </div>
                </div>
                {/* ↓ Genero de la mascota */}
                <div className='text-center w-1/2 px-8 py-2 border-l-2 border-primaryLight'>
                  <label>Sexo:</label>
                  <div className='flex justify-evenly items-centert'>
                    <label htmlFor='hembra'>
                      <input name='sex' type='radio' id='hembra' value='h' onChange={handleChange} />
                      Hembra
                    </label>
                    <label htmlFor='macho'>
                      <input name='sex' type='radio' id='macho' value='m' onChange={handleChange} />
                      Macho
                    </label>
                  </div>
                </div>
              </div>

              <div className='flex justify-evenly border-t-2 border-primaryLight mb-2'>
                {/* ↓ Edad de la mascota */}
                <div className='text-center w-2/5 p-4 border-r-2 border-primaryDark'>
                  <label>Edad (en años):</label>
                  <input name='age' type='number' min='0' max='50' onChange={handleChange} className='rounded-md px-1' />
                </div>
                {/* ↓ Tamaño de la mascota */}
                <div className='text-center w-3/5 px-8 py-4 border-l-2 border-primaryLight'>
                  <label>Tamaño aproximado de la raza:</label>
                  <div className='flex justify-evenly items-center'>
                    <label htmlFor='chico'>
                      <input name='size' type='radio' id='chico' value='c' onChange={handleChange} />
                      Chico
                    </label>
                    <label htmlFor='mediano'>
                      <input name='size' type='radio' id='mediano' value='m' onChange={handleChange} />
                      Mediano
                    </label>
                    <label htmlFor='grande'>
                      <input name='size' type='radio' id='grande' value='g' onChange={handleChange} />
                      Grande
                    </label>
                  </div>
                </div>
              </div>

              {/* ↓ Descripción */}
              <label>Descripción:</label>
              <textarea name='description' placeholder='Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc...' onChange={handleChange} className='rounded-md px-1 mb-4' />

              {/* ↓ Fotos */}
              <div className='flex justify-evenly items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2'>
                <div>
                  <label>Foto: (preferentemente la mascota al centro de la imagen)</label>
                  <UploadImage setUrl={setUrl} />
                </div>
                <div className='w-32 h-32 bg-primaryDark border-2 border-primaryDark'>
                  {url.length === 0 ? (
                    <div className='h-full flex justify-center items-center text-center text-primaryLight'>previsualización de imagen</div>
                  ) : (
                    <img src={url} alt='previsualización de imagen' className='w-full h-full object-cover' />
                  )}
                </div>
              </div>
            </div>

            <div className='h-auto w-full flex flex-col justify-center ml-4'>
              {/* ↓ Mapa de ubicación de la mascota */}
              <div>Ubicación de la Mascota:</div>
              <input disabled type='text' id='direction' name='direction' value={location?.city} className='rounded-md px-1 mb-2 text-white' />
              <MapPost onLocationChange={handleLocation} onChange={handleChange} className='h-full' />
              {/* ↓ botón Publicar */}
              <div className='w-full text-center mt-4 '>
                <button disabled={handleDisabled()} onClick={handlePublicar} className='btn btn-lg bg-thirty text-white border-fourty'>
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

export default FormularioPosteo;
