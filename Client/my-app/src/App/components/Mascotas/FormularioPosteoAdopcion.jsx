import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

//? Components
import UploadImage from '../cargue-fotos/UploadImage';
import MapPost from '../Maps/MapPost';
import RadioSelectButtons from '../RadioSelectButtons';
import ErrorIconPulsing from '../ErrorIconPulsing';

//? Actions
import { postPets } from '../../redux/actions/index';

//? Icons
import { IoIosCloseCircle } from "react-icons/io";
import swal from "sweetalert";

function FormularioPosteo({ onClose, onPostPet }) {
  const [mascota, setMascota] = useState({
    name: "",
    size: "",
    sex: "",
    age: null,
    description: "",
    Ownerid: localStorage.getItem("userId"),
    PetsTypeid: "",
    Cityid: localStorage.getItem("userCityid"),
    lat: "",
    lng: "",
  });

  //* estado en el que guardaremos las fotos de la mascota
  const [url, setUrl] = useState([]);

  const [errors, setErrors] = useState({});

  const [location, setLocation] = useState({
    city: "",
    province: "",
    country: "",
  });

  //* La dirección que se le mostrará al usuario, compuesta de `${ciudad}, ${provincia}, ${país}`
  const [displayLocation, setDisplayLocation] = useState('');

  const validate = ({ name, PetsTypeid, lat }) => {
    let errors = {};
    if (!name) {
      errors.name = "Tu mascota debe tener un nombre";
    }
    if (PetsTypeid === "") {
      errors.PetsTypeid = "Debes seleccionar si tu mascota es perro o gato";
    }
    if (lat === '') {
      errors.direction = 'Tu mascota debe tener una ubicación';
    }
    return errors;
  };

  const handleChange = e => {
    e.preventDefault();
    const newMascota = {
      ...mascota,
      [e.target.name]: e.target.value,
    };
    setMascota(newMascota);
    setErrors(validate(newMascota));
  };

  const handleDisabled = () => {
    if (mascota.name !== "" && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    let city = await axios.post("/locations", location);
    let newMascota = {
      ...mascota,
      photo: url,
      Cityid: city.data.id,
    };
    swal({
      title: "Mascota en Adopcion",
      text: "Estas seguro que deseas poner en adopción esta mascota?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((res) => {
      if (res) {
        swal({
          text: "La Mascota fue postulada en adopción",
          icon: "success",
          timer: "3000",
        }).then(postPets(newMascota), onPostPet(), setUrl([]));
      }
    });
    onClose();
  };

  const handleLocation = () => {
    let city = document.getElementById(
      "administrative_area_level_2"
    )?.innerHTML;
    let province = document.getElementById(
      "administrative_area_level_1"
    )?.innerHTML;
    let country = document.getElementById("country")?.innerHTML;
    let lat = document.getElementById("lat")?.innerHTML;
    let lng = document.getElementById("lng")?.innerHTML;
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

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <form className="panel flex flex-col w-4/5 min-w-max mx-auto bg-gradient-to-r from-primaryDark to-primary relative">
          {/* ↓ botón para cancelar y volver atrás */}
          <IoIosCloseCircle title='Cancelar y volver a Adopciones' onClick={onClose}  className='text-thirty absolute top-3 right-3 text-3xl hover:text-thirtyLight cursor-pointer transition-all' />
          <div className='flex justify-between h-full'>
            <div className='flex flex-col w-1/2'>
              {/* ↓ Nombre de la mascota */}
              <label>Nombre de la mascota: <ErrorIconPulsing error={errors.name} color='thirty' /></label>
              <input name='name' onChange={handleChange} className='rounded-md px-1 mb-4' />

              <div className="flex">
                {/* ↓ Especie de la mascota */}
                <div className='text-center w-1/2 rounded-2xl px-4 py-2'>
                  <label>Especie: <ErrorIconPulsing error={errors.PetsTypeid} color='thirty' /></label>
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
                {/* ↓ Sexo de la mascota */}
                <div className='text-center w-1/2 px-8 py-2 border-l-2 border-primaryLight'>
                  <label>Sexo:</label>
                  <div className='flex justify-evenly items-centert'>
                  <RadioSelectButtons
                      state={mascota}
                      name='sex'
                      options={['Hembra', 'Macho']}
                      values={['h', 'm']}
                      onSelection={handleChange}
                      colorsOff='bg-thirtyLight border-thirtyDark'
                      colorsOn='bg-thirtyDark'
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly border-t-2 border-primaryLight mb-2">
                {/* ↓ Edad de la mascota */}
                <div className="text-center w-2/5 p-4 border-r-2 border-primaryDark">
                  <label>Edad (en años):</label>
                  <input
                    name="age"
                    type="number"
                    min="0"
                    max="50"
                    onChange={handleChange}
                    className="rounded-md px-1"
                  />
                </div>
                {/* ↓ Tamaño de la mascota */}
                <div className="text-center w-3/5 px-8 py-4 border-l-2 border-primaryLight">
                  <label>Tamaño aproximado de la raza:</label>
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
                name="description"
                placeholder="Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc..."
                onChange={handleChange}
                className="rounded-md px-1 mb-4"
              />

              {/* ↓ Fotos */}
              <div className='flex justify-between items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2'>
                <div className='w-full'>
                  <label>Foto: (preferentemente la mascota al centro de la imagen)</label>
                  <UploadImage url={url} setUrl={setUrl} />
                </div>
              </div>
            </div>

            <div className='h-auto w-1/2 flex flex-col justify-center ml-4'>
              {/* ↓ Mapa de ubicación de la mascota */}
              <div>Ubicación de la Mascota: <ErrorIconPulsing error={errors.direction} color='thirty' /></div>
              <input
                disabled
                type="text"
                id="direction"
                name="direction"
                value={displayLocation}
                className="rounded-md px-1 mb-2 text-white"
              />
              <MapPost onLocationChange={handleLocation} className="h-full" />
              {/* ↓ botón Publicar */}
              <div className="w-full text-center mt-4 ">
                <button
                  disabled={handleDisabled()}
                  onClick={handlePublicar}
                  className="btn btn-lg bg-thirty text-white border-fourty"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default FormularioPosteo;
