import React, { useState } from 'react';
// import UploadImage from '../../../cargue-fotos/UploadImage';
import { FaExclamationCircle } from 'react-icons/fa';
import { editPetsData } from '../../../../services/editPetData';
import { useDispatch } from 'react-redux';
import { getPetsAdopByUser } from '../../../../redux/actions';

function FormEdit({
  name,
  size,
  gender,
  description,
  age,
  photo,
  type,
  petId,
  onClose,
  userId,
}) {
  const dispatch = useDispatch();
  const [mascota, setMascota] = useState({
    name: name,
    size: size,
    sex: gender,
    age: age,
    description: description,
    Ownerid: localStorage.getItem('userId'),
    PetsTypeid: type,
    Cityid: localStorage.getItem('userCityid'),
  });
  /* const [url, setUrl] = useState([]); */
  const [errors, setErrors] = useState({});

  const validate = ({ name, PetsTypeid }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Tu mascota debe tener un nombre';
    }
    /* if (PetsTypeid === '') {
      errors.PetsTypeid = 'Debes seleccionar si tu mascota es perro o gato';
    } */
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

  const handlePublicar = async (e) => {
    e.preventDefault();
    let newMascota = {
      ...mascota,
      photo,
    };
    await editPetsData(newMascota, petId);
    /* setUrl([]); */
    dispatch(getPetsAdopByUser(userId));
    alert('¡Listo!');
    onClose();
  };

  return (
    <div className='py-16 w-full'>
      <form className='flex flex-col w-full max-w-3xl mx-auto p-8 rounded-lg bg-primaryDark border-white border-opacity-50 relative'>
        <label>
          Nombre de la mascota:{' '}
          {errors.name && (
            <FaExclamationCircle
              title={errors.name}
              className='inline  align-baseline'
            />
          )}
        </label>
        <input
          name='name'
          value={mascota.name}
          onChange={handleChange}
          className='rounded-md px-1 capitalize'
        />
        <br />

        <div className='grid grid-cols-2 gap-3 justify-items-center'>
          <div className='text-center w-2/5 rounded-2xl  px-4 py-2'>
            <label>
              Especie:{' '}
              {/*  {errors.PetsTypeid && (
                <FaExclamationCircle
                  title={errors.PetsTypeid}
                  className="inline text-fourtyLight align-baseline"
                />
              )} */}
            </label>
            <br/>
            <select
              defaultValue={mascota.PetsTypeid}
              name='PetsTypeid'
              onChange={handleChange} className='rounded-md px-1 capitalize'>
              <option value='p'>Perro</option>
              <option value='g'>Gato</option>
            </select>
            {/* <div className="flex justify-evenly items-center">
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
            </div> */}
          </div>
          <div className='text-center w-2/5 rounded-xl  px-4 py-2'>
            <label>Sexo:</label>
            <br/>
            <select
              defaultValue={mascota.sex}
              name='sex'
              onChange={handleChange} className='rounded-md px-1 capitalize'>
              <option value='h'>Hembra</option>
              <option value='m'>Macho</option>
            </select>
            {/* <div className="flex justify-evenly items-center">
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
            </div> */}
          </div>

          <div className='text-center rounded-xl  px-4 py-2'>
            <label>Edad (en años):</label> <br />
            <input
              name='age'
              type='number'
              min='0'
              max='50'
              value={mascota.age}
              onChange={handleChange}
              className='rounded-md px-1'
            />
          </div>
          <div className='text-center w-3/5 rounded-2xl  px-4 py-2'>
            <label>Tamaño aprox:</label>
            <br/>
            <select
              defaultValue={mascota.size}
              name='size'
              onChange={handleChange} className='rounded-md px-1 capitalize'>
              <option value='c'>Pequeño</option>
              <option value='m'>Mediano</option>
              <option value='g'>Grande</option>
            </select>
            {/* <div className="flex justify-evenly items-center">
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
            </div> */}
          </div>
        </div>
        <br />

        <label>Descripción:</label>
        <textarea
          name='description'
          placeholder='Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc...'
          onChange={handleChange}
          className='rounded-md px-1'
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

        <div className='flex justify-evenly items-center rounded-xl '>
          <div className='w-44 h-44 border-2 border-secondary'>
            <img
              src={photo}
              alt='previsualización de imagen'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <br />

        <button
          disabled={handleDisabled()}
          onClick={handlePublicar}
          className='btn btn-lg bg-thirty text-white border-fourty'>
          Publicar
        </button>
      </form>
    </div>
  );
}

export default FormEdit;
