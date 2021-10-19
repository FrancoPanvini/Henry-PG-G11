import React, { useState, useEffect } from 'react';

//? Components
// import UploadImage from '../../../cargue-fotos/UploadImage';
import RadioSelectButtons from '../../../RadioSelectButtons';

//? Services and actions
import { editPetsData } from '../../../../services/editPetData';
import { editLostPetsData } from '../../../../services/editLostPetData';
import { getPetDetail } from '../../../../services/getPetDetail';
import { getLostPetDetail } from '../../../../services/getLostPetDetail';

//? Icons
import { FaExclamationCircle, FaAsterisk } from 'react-icons/fa';
// import { editPetsLostData } from '../../../../services/setFoundPetLost';

function FormEdit({ name, size, sex, age, photo, type, petId, onClose, onPostPet, description }) {
  const [mascota, setMascota] = useState({
    name,
    size,
    sex,
    age: age ? age : '',
    PetsTypeid: type === 'Perro' ? 'p' : 'g',
    Ownerid: localStorage.getItem('userId'),
    Cityid: localStorage.getItem('userCityid'),
  });

  //* Objeto que usaremos para comparar la info.
  const [originalData, setOriginalData] = useState({
    name,
    size,
    sex,
    age: age ? age : '',
    PetsTypeid: type === 'Perro' ? 'p' : 'g',
  });

  const publicacionTipoAdopcion = description !== ''  && !description;

  //* Obtengo los datos faltantes: descripción y todas las fotos
  useEffect(() => {
    const getDetails = async () => {
      let response;
      if (publicacionTipoAdopcion) {
        response = await getPetDetail(petId);
        setMascota({
          ...mascota,
          description: response.data.description,
          photo: response.data.petPics,
        });
        setOriginalData({
          ...originalData,
          description: response.data.description,
          photo: response.data.petPics,
        });
      } else {
        response = await getLostPetDetail(petId);
        setMascota({
          ...mascota,
          photo: response.data.petPics,
        });
        setOriginalData({
          ...originalData,
          photo: response.data.petPics,
        });
      }
    };
    getDetails();
    // eslint-disable-next-line
  }, []);

  /* const [url, setUrl] = useState([]); */
  const [errors, setErrors] = useState({});

  const validate = ({ name }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Tu mascota debe tener un nombre';
    }
    return errors;
  };

  const handleChange = (e) => {
    e.preventDefault();
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
    if (publicacionTipoAdopcion) await editPetsData(newMascota, petId);
    else await editLostPetsData(newMascota, petId);
    alert('¡Listo!');
    onPostPet();
    onClose();
  };

  return (
    <div className='w-full max-w-3xl'>
      <form className='panel flex flex-col w-full max-w-3xl mx-auto p-8 rounded-lg bg-primaryDark relative'>
        <label>
          Nombre de la mascota:{' '}
          {errors.name && <FaExclamationCircle title={errors.name} className='inline text-thirty align-baseline animate-pulse' />}
          {originalData.name !== mascota.name && (
            <FaAsterisk title='Cambiaste el nombre de tu mascota' className='inline text-attention align-baseline' />
          )}
        </label>
        <input name='name' value={mascota.name} onChange={handleChange} className='rounded-md px-1 capitalize' />
        <br />

        <div className={`${publicacionTipoAdopcion && 'grid grid-cols-2 gap-3'} justify-items-center`}>
          {type && <div className='text-center w-full px-4 py-2'>
            <label>
              Especie:{' '}
              {originalData.PetsTypeid !== mascota.PetsTypeid && (
                <FaAsterisk title='Cambiaste la especie de tu mascota' className='inline text-attention align-baseline' />
              )}
            </label>
            <div className='w-full'>
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
          </div>}
          {type && <div className='text-center w-full px-4 py-2'>
            <label>
              Sexo:
              {originalData.sex !== mascota.sex && (
                <FaAsterisk title='Cambiaste el sexo de tu mascota' className='inline text-attention align-baseline' />
              )}
            </label>
            <div className='w-full'>
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
          </div>}

          {type && <div className='text-center px-4 py-2'>
            <label>
              Edad (en años):
              {originalData.age !== parseInt(mascota.age) && (
                <FaAsterisk title='Cambiaste la edad de tu mascota' className='inline text-attention align-baseline' />
              )}
            </label>{' '}
            <br />
            <input name='age' type='number' min='0' max='50' value={mascota.age} onChange={handleChange} className='rounded-md px-1' />
          </div>}
          <div className='text-center w-full px-4 py-2'>
            <label>
              Tamaño:
              {originalData.size !== mascota.size && (
                <FaAsterisk title='Cambiaste el tamaño de tu mascota' className='inline text-attention align-baseline' />
              )}
            </label>
            <br />
            <div className='w-full'>
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
        <br />

        <label>
          Descripción:
          {originalData.description !== mascota.description && (
            <FaAsterisk title='Cambiaste el tamaño de tu mascota' className='inline text-attention align-baseline' />
          )}
        </label>
        <textarea
          name='description'
          placeholder='Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc...'
          onChange={handleChange}
          className='rounded-md px-1'
          value={mascota.description}
        />
        <br />

        <div className='flex justify-evenly items-center rounded-xl '>
          <div className='w-44 h-44 border-2 border-secondary'>
            <img src={photo} alt='previsualización de imagen' className='w-full h-full object-cover' />
          </div>
        </div>
        <br />

        <button disabled={handleDisabled()} onClick={handlePublicar} className='btn btn-lg bg-thirty text-white border-fourty'>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default FormEdit;
