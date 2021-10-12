import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCities,
  getCountries,
  getProvinces,
  initialUser,
} from '../../../../redux/actions';
import { editUserData } from '../../../../services/editUserData';
import { BiX } from 'react-icons/bi';

function FormularioDatos({ user, close, type }) {
  const [input, setInput] = useState({
    name: user?.name,
    phone: user.phone,
    responsable: user.responsable,
    description: user.description,
    link_donaciones: user.link_donaciones,
    link_instagram: user.link_instagram,
    link_facebook: user.link_facebook,
    link_web: user.link_web,
    country: user.country,
    province: user.province,
    city: user.city
  });
  const paises = useSelector((state) => state.countries);
  const provincias = useSelector((state) => state.provinces);
  const ciudades = useSelector((state) => state.cities);
  const [countryId, setCountryId] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  //const [cityId, setCityId] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleUbicationChange = (e) => {
    if (e.target.id === 'pais') {
      let ubicacion = paises.find((pais) => pais.name === e.target.value);
      ubicacion && setCountryId(ubicacion.id);
    }
    if (e.target.id === 'provincia') {
      let ubicacion = provincias.find(
        (provincia) => provincia.name === e.target.value
      );
      ubicacion && setProvinceId(ubicacion.id);
    }
    if (e.target.id === 'ciudad') {
      let ubicacion = ciudades.find(
        (ciudad) => ciudad.name === e.target.value.toLowerCase()
      );
      let newInput = { ...input };
      ubicacion &&
        (newInput = {
          ...newInput,
          CityId: ubicacion.id,
        });
      setInput(newInput);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editUserData(user.id, input);
    alert('Se actualizaron los datos correctamente');
    dispatch(initialUser(user.id))
    close();
  };

  return (
    <div className='relative'>
      <form onSubmit={onSubmit} className='flex flex-wrap'>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Nombre</label>
          <input
            type='text'
            id='name'
            name='name'
            value={input.name}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2 capitalize'
          />
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Telefono</label>
          <input
            type='number'
            id='phone'
            name='phone'
            value={input.phone}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        <img
          src={user.photo}
          alt='foto de usuario'
          className='object-cover w-60 h-60 rounded-full absolute right-28 mx-auto top-0 ring ring-offset-4 ring-offset-gray-200'
        />

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label className=''>Pais: <span className='capitalize'>{input.country}</span></label>
          <input
            name='country'
            type='text'
            id='pais'
            list='paises'
            onChange={handleUbicationChange}
            className='rounded-md p-1 mb-2 capitalize'
          />
          <datalist id='paises' >
            {paises &&
              paises.map((pais) => <option key={pais.id} value={pais.name} />)}
          </datalist>
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
        <label className=''>Provincia/Departamento: <span className='capitalize'>{input.province}</span></label>
              <input
                name='province'
                type='text'
                id='provincia'
                list='provincias'
                onChange={handleUbicationChange}
                className='rounded-md p-1 mb-2 capitalize'
              />
          <datalist className='rounded-md p-1 mb-2' id='provincias'>
            {provincias &&
              provincias
                .filter(
                  (provincia) =>
                    parseInt(provincia.CountryId) === parseInt(countryId)
                )
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                )
                .map((provincia) => (
                  <option key={provincia.id} value={provincia.name} />
                ))}
          </datalist>
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label className=''>Ciudad: <span className='capitalize'>{input.city}</span></label>
          <input
            name='city'
            type='text'
            id='ciudad'
            list='ciudades'
            onChange={handleUbicationChange}
            className='rounded-md p-1 mb-2 capitalize'
          />
          <datalist className='rounded-md p-1 mb-2' id='ciudades'>
            {ciudades &&
              ciudades
                .filter(
                  (ciudad) =>
                    parseInt(ciudad.ProvinceId) === parseInt(provinceId)
                )
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                )
                .map((ciudad) => (
                  <option
                    key={ciudad.id}
                    value={ciudad.name.replace(
                      /(^|[^A-Za-zÁÉÍÓÚÑáéíóúñ])([a-záéíóúñ])/g,
                      (l) => l.toUpperCase()
                    )}
                  />
                ))}
          </datalist>
        </div>

        {type === 'r' && 
        <>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Responsable</label>
          <input
            type='text'
            id='responsable'
            name='responsable'
            value={input.responsable}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Descripcion</label>
          <textarea
            type='text'
            id='description'
            name='description'
            value={input.description}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2 '
          />
        </div>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Link Donaciones</label>
          <input
            type='text'
            id='link_donaciones'
            name='link_donaciones'
            value={input.link_donaciones}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Link Instagram </label>
          <input
            type='text'
            id='link_instagram'
            name='link_instagram'
            value={input.link_instagram}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Link Facebook </label>
          <input
            type='text'
            id='link_facebook'
            name='link_facebook'
            value={input.link_facebook}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label >Link Web </label>
          <input
            type='text'
            id='link_web'
            name='link_web'
            value={input.link_web}
            onChange={handleOnChange}
            className='rounded-md p-1 mb-2'
          />
        </div>
        </>}

        <div className='w-1/3 ml-36 py-4 flex'>

          <button
            className='btn bg-green-600 text-white w-16 h-16 flex shadow-2xl justify-center items-center text-3xl mr-2 rounded-full '
            title='Guardar'
            type='submit'
            >
            <FaSave />
          </button>
          <button
            className='btn bg-red-600 text-white w-16 h-16 shadow-2xl flex justify-center items-center text-3xl mr-2 rounded-full '
            title='Cerrar'
            onClick={close}>
            <BiX />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioDatos;