import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UploadImage from './../cargue-fotos/UploadImage';
import { postPets } from '../../redux/actions/index';
import { FaExclamationCircle, FaWindowClose } from 'react-icons/fa';

function FormularioPosteo() {
  const history = useHistory();
  const [mascota, setMascota] = useState({
    name: '',
    size: '',
    sex: '',
    age: null,
    description: '',
    Ownerid: localStorage.getItem('userId'),
    PetsTypeid: '',
    Cityid: localStorage.getItem('userCityid'),
  });
  const [url, setUrl] = useState([]);
  const [errors, setErrors] = useState({});
  


  const validate = ({ name, PetsTypeid }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Tu mascota debe tener un nombre';
    }
    if (PetsTypeid === '') {
      errors.PetsTypeid = 'Debes seleccionar si tu mascota es perro o gato';
    }
    // if (Cityid === '') {
    //   errors.Cityid = "Debes seleccionar la ciudad donde está tu mascota"
    // }
    return errors;
  };

  const handleChange = (e) => {
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

  const handlePublicar = (e) => {
    e.preventDefault();
    let newMascota = {
      ...mascota,
      photo: url,
    };
    postPets(newMascota);
    setUrl([]);
    alert('¡Listo!');
    history.push('/adopciones');
  };

  return (
    <div className="background py-16">
      <form className="panel flex flex-col w-4/5 max-w-3xl mx-auto bg-gradient-to-r from-primaryDark to-primary relative">
        <Link to="/adopciones">
          <FaWindowClose
            title="Cancelar y volver a Adopciones"
            className="absolute text-2xl right-2 top-2 text-fourty transition-all hover:text-fourtyLight"
          />
        </Link>
        <label>
          Nombre de la mascota:{' '}
          {errors.name && (
            <FaExclamationCircle
              title={errors.name}
              className="inline text-fourty align-baseline"
            />
          )}
        </label>
        <input
          name="name"
          onChange={handleChange}
          className="rounded-md px-1 mb-4"
        />

        <div className="flex justify-evenly border-b-2 border-primaryDark">
          <div className="text-center w-1/2 px-8 py-4 border-r-2 border-primaryDark">
            <label>
              Especie:{' '}
              {errors.PetsTypeid && (
                <FaExclamationCircle
                  title={errors.PetsTypeid}
                  className="inline text-fourty align-baseline"
                />
              )}
            </label>
            <div className="flex justify-evenly items-center">
              <label htmlFor="gato">
                <input
                  name="PetsTypeid"
                  type="radio"
                  id="gato"
                  value="g"
                  onChange={handleChange}
                />
                Gato
              </label>{' '}
              <label htmlFor="perro">
                <input
                  name="PetsTypeid"
                  type="radio"
                  id="perro"
                  value="p"
                  onChange={handleChange}
                />
                Perro
              </label>
            </div>
          </div>
          <div className="text-center w-1/2 px-8 py-2 border-l-2 border-primaryLight">
            <label>Sexo:</label>
            <div className="flex justify-evenly items-centert">
              <label htmlFor="hembra">
                <input
                  name="sex"
                  type="radio"
                  id="hembra"
                  value="h"
                  onChange={handleChange}
                />
                Hembra
              </label>{' '}
              <label htmlFor="macho">
                <input
                  name="sex"
                  type="radio"
                  id="macho"
                  value="m"
                  onChange={handleChange}
                />
                Macho
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly border-t-2 border-primaryLight border-">
          <div className="text-center w-2/5 p-4 border-r-2 border-primaryDark">
            <label>Edad (en años):</label> <br />
            <input
              name="age"
              type="number"
              min="0"
              max="50"
              onChange={handleChange}
              className="rounded-md px-1"
            />
          </div>
          <div className="text-center w-3/5 px-8 py-4 border-l-2 border-primaryLight">
            <label>Tamaño aproximado de la raza:</label>
            <div className="flex justify-evenly items-center">
              <label htmlFor="chico">
                <input
                  name="size"
                  type="radio"
                  id="chico"
                  value="c"
                  onChange={handleChange}
                />
                Chico
              </label>{' '}
              <label htmlFor="mediano">
                <input
                  name="size"
                  type="radio"
                  id="mediano"
                  value="m"
                  onChange={handleChange}
                />
                Mediano
              </label>{' '}
              <label htmlFor="grande">
                <input
                  name="size"
                  type="radio"
                  id="grande"
                  value="g"
                  onChange={handleChange}
                />
                Grande
              </label>
            </div>
          </div>
        </div>
        <br />

        <label>Descripción:</label>
        <textarea
          name="description"
          placeholder="Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc..."
          onChange={handleChange}
          className="rounded-md px-1"
        />
        <br />

        {/* ↓ por lo menos para la primer demo la ciudad será la de quien postea */}
        {/* <label>Ciudad:</label>
        <select
          name="Cityid"
          onChange={handleChange}
          className="rounded-md px-1"
        >
          <option>--Selecciona una--</option>
          <option value="1">Ciudad 1</option>
          <option value="2">Ciudad 2</option>
          <option value="3">Ciudad 3</option>
        </select>
        <br /> */}

        <div className="flex justify-evenly items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2">
          <div>
            <label>
              Foto: (preferentemente la mascota al centro de la imagen)
            </label>
            <UploadImage setUrl={setUrl} />
          </div>
          <div className="w-32 h-32 bg-primaryDark border-2 border-primaryDark">
            {url.length === 0 ? (
              <div className="h-full flex justify-center items-center text-center text-secondaryLight">
                previsualización de imagen
              </div>
            ) : (
              <img
                src={url}
                alt="previsualización de imagen"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <br />

        <button
          disabled={handleDisabled()}
          onClick={handlePublicar}
          className="btn btn-lg bg-thirty text-white border-fourty"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default FormularioPosteo;
