import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { initialUser } from '../../../../redux/actions';
import { editUserData } from '../../../../services/editUserData';
import { BiX } from 'react-icons/bi';
import ErrorIconPulsing from '../../../ErrorIconPulsing';
import MapPost from '../../../Maps/MapPost';
import axios from 'axios';
import swal from 'sweetalert';
import emailjs from 'emailjs-com';

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
    direction: '',
    province: user.province,
    city: user.city,
    lat: '',
    lng: '',
    mail: user.mail,
  });
  const paises = useSelector(state => state.countries);
  // const provincias = useSelector((state) => state.provinces);
  const ciudades = useSelector(state => state.cities);
  // const [countryId, setCountryId] = useState(null);
  // const [provinceId, setProvinceId] = useState(null);
  //const [cityId, setCityId] = useState(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});

  //* estado para controlar errores en los links (deben empezar con `http`)
  const [linkErrors, setLinkErrors] = useState({});

  const handleOnChange = e => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleUbicationChange = e => {
    // if (e.target.id === 'pais') {
    //   let ubicacion = paises.find((pais) => pais.name === e.target.value);
    // ubicacion && setCountryId(ubicacion.id);
    // }
    // if (e.target.id === 'provincia') {
    //   let ubicacion = provincias.find(
    //     (provincia) => provincia.name === e.target.value
    //   );
    // ubicacion && setProvinceId(ubicacion.id);
    // }
    if (e.target.id === 'ciudad') {
      let ubicacion = ciudades.find(ciudad => ciudad.name === e.target.value.toLowerCase());
      let newInput = { ...input };
      ubicacion &&
        (newInput = {
          ...newInput,
          CityId: ubicacion.id,
        });
      setInput(newInput);
    }
  };

  const handleLocation = () => {
    let city = document.getElementById('administrative_area_level_2')?.innerHTML;
    let province = document.getElementById('administrative_area_level_1')?.innerHTML;
    let adress = document.getElementById('route')?.innerHTML + ' ' + document.getElementById('street_number')?.innerHTML;
    let country = document.getElementById('country')?.innerHTML;
    let lat = document.getElementById('lat')?.innerHTML;
    let lng = document.getElementById('lng')?.innerHTML;
    document.getElementById('direction').innerHTML = adress;
    setLocation({
      city,
      province,
      country,
    });
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    setInput(prevState => {
      return {
        ...prevState,
        direction: adress,
        lat: lat,
        lng: lng,
      };
    });
  };

  //* Una vez que el usuario clickee en Publicar
  /*  const handlePublicar = async (e) => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let newInput = {
      ...input,
      Cityid: city.data.id,
    };
    editUserData(newInput);
    //onPostPet();
    alert(
      '¡Listo! Tu posteo está pendiente de confirmación, ¡muy pronto será publicado!'
    );
    //onClose();
  }; */

  const validateLink = ({ link_donaciones, link_web, link_facebook, link_instagram }) => {
    let linkErrors = {};
    if (link_donaciones && !link_donaciones.startsWith('http')) {
      linkErrors.link_donaciones = 'El enlace debe empezar con http:// o https://';
    }
    if (link_web && !link_web.startsWith('http')) {
      linkErrors.link_web = 'El enlace debe empezar con http:// o https://';
    }
    if (link_facebook && !link_facebook.startsWith('http')) {
      linkErrors.link_facebook = 'El enlace debe empezar con http:// o https://';
    }
    if (link_instagram && !link_instagram.startsWith('http')) {
      linkErrors.link_instagram = 'El enlace debe empezar con http:// o https://';
    }
    return linkErrors;
  };

  const handleLinkChange = e => {
    let links = {
      link_donaciones: input.link_donaciones ? input.link_donaciones : null,
      link_web: input.link_web ? input.link_web : null,
      link_facebook: input.link_facebook ? input.link_facebook : null,
      link_instagram: input.link_instagram ? input.link_instagram : null,
      [e.target.name]: e.target.value,
    };
    setLinkErrors(validateLink(links));
    handleOnChange(e);
  };

  const onSubmit = async e => {
    e.preventDefault();
    emailjs
      .sendForm('service_ayo0oer', 'template_eqjjwlm', e.target, 'user_Fm0LQR1ItoVornKoxbfvo')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    let city = await axios.post('/locations', location);
    let newInput = {
      ...input,
      CityId: city.data.id,
    };
    editUserData(user.id, newInput);
    swal({
      title: 'Datos Actualizados!',
      text: 'Recuerda mantener tu info actualizada',
      icon: 'success',
    });
    dispatch(initialUser(user.id));
    close();
  };

  return (
    <div className='relative'>
      <form onSubmit={e => onSubmit(e)} className='flex flex-wrap'>
        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Nombre</label>
          <input type='text' id='name' name='name' value={input.name} onChange={handleOnChange} className='rounded-md p-1 mb-2 capitalize' />
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Mail</label>
          <input type='text' id='mail' name='mail' value={input.mail} onChange={handleOnChange} className='rounded-md p-1 mb-2' />
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label>Telefono</label>
          <input type='number' id='phone' name='phone' value={input.phone} onChange={handleOnChange} className='rounded-md p-1 mb-2' />
        </div>
        <img
          src={user.photo ? user.photo : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
          alt='foto de usuario'
          className='object-cover w-60 h-60 rounded-full absolute right-28 mx-auto top-0 ring ring-offset-4 ring-offset-gray-200'
        />

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label className=''>
            Pais: <span className='capitalize'></span>
          </label>
          <input name='country' type='text' id='pais' list='paises' onChange={handleUbicationChange} value={location.country} className='rounded-md p-1 mb-2 capitalize' />
          <datalist id='paises'>{paises && paises.map(pais => <option key={pais.id} value={pais.name} />)}</datalist>
        </div>

        <div className='w-1/3 p-2 m-2 flex flex-col'>
          <label className=''>
            Provincia/Departamento: <span className='capitalize'></span>
          </label>
          <input name='province' type='text' id='provincia' list='provincias' onChange={handleUbicationChange} value={location.province} className='rounded-md p-1 mb-2 capitalize' />
          {/* <datalist className='rounded-md p-1 mb-2' id='provincias'>
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
          </datalist> */}
        </div>

        <div className='w-1/3 h-80 p-2 m-2 flex flex-col'>
          <label className=''>
            Ciudad: <span className='capitalize'></span>
          </label>
          <input type='text' id='direction' name='direction' value={location.city} className='text-black rounded-md p-1 mb-2 capitalize' />
          <MapPost className='w-full h-full p-2 m-2 flex flex-col' onLocationChange={handleLocation} />
          <input type='text' id='direction' name='direction' value={input.direction} className='text-black rounded-md p-1 mb-2 capitalize' />
          {/* <input
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
          </datalist> */}
        </div>

        {type === 'r' && (
          <>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Responsable</label>
              <input type='text' id='responsable' name='responsable' value={input.responsable} onChange={handleOnChange} className='rounded-md p-1 mb-2' />
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>Descripcion</label>
              <textarea type='text' id='description' name='description' value={input.description} onChange={handleOnChange} className='rounded-md p-1 mb-2 ' />
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>
                Link Donaciones <ErrorIconPulsing error={linkErrors.link_donaciones} color='attentionLight' />
              </label>
              <input type='text' id='link_donaciones' name='link_donaciones' value={input.link_donaciones} onChange={handleLinkChange} className='rounded-md p-1 mb-2' />
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>
                Link Instagram <ErrorIconPulsing error={linkErrors.link_instagram} color='attentionLight' />
              </label>
              <input type='text' id='link_instagram' name='link_instagram' value={input.link_instagram} onChange={handleLinkChange} className='rounded-md p-1 mb-2' />
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>
                Link Facebook <ErrorIconPulsing error={linkErrors.link_facebook} color='attentionLight' />
              </label>
              <input type='text' id='link_facebook' name='link_facebook' value={input.link_facebook} onChange={handleLinkChange} className='rounded-md p-1 mb-2' />
            </div>
            <div className='w-1/3 p-2 m-2 flex flex-col'>
              <label>
                Sitio Web <ErrorIconPulsing error={linkErrors.link_web} color='attentionLight' />
              </label>
              <input type='text' id='link_web' name='link_web' value={input.link_web} onChange={handleLinkChange} className='rounded-md p-1 mb-2' />
            </div>
          </>
        )}

        <div className='w-1/3 ml-36 py-4 flex'>
          <button
            className='btn bg-green-600 text-white w-16 h-16 flex shadow-2xl justify-center items-center text-3xl mr-2 rounded-full '
            title='Guardar'
            type='submit'
            //onClick={onSubmit}
          >
            <FaSave />
          </button>
          <button className='btn bg-red-600 text-white w-16 h-16 shadow-2xl flex justify-center items-center text-3xl mr-2 rounded-full ' title='Cerrar' onClick={close}>
            <BiX />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioDatos;
