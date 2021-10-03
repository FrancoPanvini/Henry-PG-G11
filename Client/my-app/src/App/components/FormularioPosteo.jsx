import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UploadImage from './cargue-fotos/UploadImage';
import { postPets } from '../redux/actions/index';

function FormularioPosteo() {
  const dispatch = useDispatch();

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

  const handleChange = e => {
    setMascota({
      ...mascota,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublicar = e => {
    e.preventDefault();
    let newMascota = {
      ...mascota,
      photo: url,
    }
    console.log(newMascota);
    dispatch(postPets(newMascota));
    setUrl([])
  };

  return (
    <div className="py-16 bg-gradient-to-r from-thirty to-fourty">
      <form className="flex flex-col w-4/5 max-w-3xl mx-auto p-8 rounded-lg bg-gradient-to-l from-secondary to-secondaryDark border-2 border-white border-opacity-50">
        <label>Nombre de la mascota:</label>
        <input
          name="name"
          onChange={handleChange}
          className="rounded-md px-1"
        />
        <br />

        <div className="flex justify-evenly">
          <div className="text-center w-2/5 rounded-2xl bg-secondaryDark px-4 py-2">
            <label>Especie:</label>
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
          <div className="text-center w-2/5 rounded-xl bg-secondary px-4 py-2">
            <label>Sexo:</label>
            <div className="flex justify-evenly items-center">
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
        <br />

        <div className="flex justify-evenly">
          <div className="text-center rounded-xl bg-secondaryDark px-4 py-2">
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
          <div className="text-center w-3/5 rounded-2xl bg-secondary px-4 py-2">
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

        <div className="flex justify-evenly items-center rounded-xl bg-gradient-to-r from-secondary to-secondaryLight px-4 py-2">
          <div>
            <label>Foto: (preferentemente la mascota al centro de la imagen)</label>
            <UploadImage setUrl={setUrl} />
          </div>
          <div className="w-32 h-32 bg-secondaryDark border-2 border-secondary">
            {url === '' ? (
              <div className="h-full flex justify-center items-center text-center text-secondaryLight">
                previsualización de imagen
              </div>
            ) : (
              <img src={url} alt="previsualización de imagen" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
        <br />

        <button
          // disabled={true}
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
