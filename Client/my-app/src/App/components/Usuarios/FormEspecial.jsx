import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import parsePhoneNumber from 'libphonenumber-js';

//? Components
import PhoneCodes from './phoneRegionInput';
import MapPost from '../Maps/MapPost';
import RadioSelectButtons from '../RadioSelectButtons';
import ErrorIconPulsing from '../ErrorIconPulsing';

//? Services
import { getCities, getProvinces, initialUser, getCountries } from '../../redux/actions';
import { editUserData } from '../../services/editUserData';

//? Icons
import { FaExclamationCircle } from 'react-icons/fa';
import { FaPaw, FaHome } from 'react-icons/fa';

const FormEspecial = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const [phoneCode, setPhoneCode] = useState('');
  const [location, setLocation] = useState({});
  const [errors, setErrors] = useState({});
  const [linkErrors, setLinkErrors] = useState({});

  const [input, setInput] = useState({
    phone: '',
    direction: '',
    lat: '',
    lng: '',
    CityId: '',
    UsersTypeid: 'i',
    responsable: '',
    description: '',
    link_donaciones: '',
    link_instagram: '',
    link_facebook: '',
    link_web: '',
  });

  const [displayDirection, setDisplayDirection] = useState('');

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const validate = ({ phone, responsable, direction }) => {
    let errors = {};
    if (!phone) {
      errors.phone = 'Ingresa un número telefónico de contacto';
    }
    if (!direction) {
      errors.direction = 'Ingresa tu ubicación';
    }
    if (!responsable) {
      errors.responsable = 'Debe ingresar el nombre de la persona a cargo';
    }
    return errors;
  };

  const handlePhoneCodeChange = (e) => {
    setPhoneCode(e.target.value);
  };

  const handleLocation = () => {
    let adress = document.getElementById('route')?.innerHTML + ' ' + document.getElementById('street_number')?.innerHTML;
    let city = document.getElementById('administrative_area_level_2')?.innerHTML;
    let province = document.getElementById('administrative_area_level_1')?.innerHTML;
    let country = document.getElementById('country')?.innerHTML;
    let lat = document.getElementById('lat')?.innerHTML;
    let lng = document.getElementById('lng')?.innerHTML;
    document.getElementById('direction').innerHTML = adress;
    setDisplayDirection(`${adress}, ${province}, ${country}`);
    setLocation({
      city,
      province,
      country,
    });
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    setInput((prevState) => {
      return {
        ...prevState,
        direction: adress,
        lat: lat,
        lng: lng,
      };
    });
    setErrors(validate({ ...input, direction: adress, lat: lat, lng: lng }));
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'phone') {
      if (e.target?.value) {
        setErrors(validate(input));

        const phoneNumber = parsePhoneNumber(e.target.value, phoneCode);
        if (phoneNumber?.isValid()) {
          const newInput = {
            ...input,
            [e.target.name]: phoneNumber.number.substring(1),
          };
          setInput(newInput);
          setErrors(validate(newInput));
        }
      }
    } else {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      setInput(newInput);
      setErrors(validate(newInput));
    }
  };

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

  const handleLinkChange = (e) => {
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

  const handleDisabled = () => {
    if (input.UsersTypeid === 'i') {
      if (input.direction !== '' && !errors.hasOwnProperty('direction') && !errors.hasOwnProperty('phone')) {
        return false;
      }
      return true;
    }
    /* falta agregar para deshabilitar en caso de refugio, pero algo está roto y no sé qué es...... */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    let city = await axios.post('/locations', location);
    let auxInput = { ...input, CityId: city.data.id };
    editUserData(userId, auxInput);
    alert('Se actualizaron los datos correctamente');
    dispatch(initialUser(userId));
    history.push('/');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-3/5'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col h-auto p-4 py-10 ml-auto mr-4 bg-thirty rounded-lg w-10/12 min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='flex gap-8'>
            <div className='w-5/12 flex flex-col relative'>
              <label className='text-white'>Tipo de cuenta:</label>
              <div className='flex justify-start mb-2'>
                <RadioSelectButtons
                  state={input}
                  name='UsersTypeid'
                  options={['Personal', 'Refugios']}
                  values={['i', 'r']}
                  onSelection={handleOnChange}
                  colorsOn='bg-thirtyDark mx-1'
                  colorsOff='bg-thirtyLight border-thirtyDark mx-1'
                />
                <div className='mx-auto flex justify-center items-center bg-fourty w-16 h-16 rounded-full absolute top-0 right-0'>
                  {input.UsersTypeid === 'i' ? <FaPaw className='text-white text-3xl' /> : <FaHome className='text-white text-3xl' />}
                </div>
              </div>
              <div className='flex gap-2 '>
                <div className='w-1/4'>
                  <label className='text-white'>
                    Código:
                    <PhoneCodes onCodeChange={handlePhoneCodeChange} className='rounded-md' />
                  </label>
                </div>
                <div className='w-3/4'>
                  <label className='text-white'>
                    Teléfono: <ErrorIconPulsing error={errors.phone} color='primary' />
                  </label>
                  <input
                    type='number'
                    id='phone'
                    name='phone'
                    // value={input.phone}
                    onChange={handleOnChange}
                    className='rounded-md px-1 mb-2 w-full'
                  />
                </div>
              </div>
              {input.UsersTypeid === 'r' && (
                <>
                  <label className='text-white'>
                    Responsable del refugio: <ErrorIconPulsing error={errors.responsable} color='primary' />
                  </label>
                  <input type='text' id='responsable' name='responsable' onChange={handleOnChange} className='rounded-md px-1 mb-1' />

                  <label className='text-white'>Descripción:</label>
                  <input type='text' id='description' name='description' onChange={handleOnChange} className='rounded-md px-1 mb-1' />

                  <label className='text-white'>
                    Link para donaciones: <ErrorIconPulsing error={linkErrors.link_donaciones} color='primary' />
                  </label>
                  <input type='text' id='link_donaciones' name='link_donaciones' onChange={handleLinkChange} className='rounded-md px-1 mb-1' />

                  <label className='text-white'>
                    Sitio web: <ErrorIconPulsing error={linkErrors.link_web} color='primary' />
                  </label>
                  <input type='text' id='link_web' name='link_web' onChange={handleLinkChange} className='rounded-md px-1 mb-1' />

                  <label className='text-white'>
                    Página de Facebook: <ErrorIconPulsing error={linkErrors.link_facebook} color='primary' />
                  </label>
                  <input type='text' id='link_facebook' name='link_facebook' onChange={handleLinkChange} className='rounded-md px-1 mb-1' />

                  <label className='text-white'>
                    Página de Instagram: <ErrorIconPulsing error={linkErrors.link_instagram} color='primary' />
                  </label>
                  <input type='text' id='link_instagram' name='link_instagram' onChange={handleLinkChange} className='rounded-md px-1 mb-1' />
                </>
              )}
            </div>
            <div className='w-7/12 h-full flex flex-col'>
              <label className='text-white'>
                Dirección: (Seleccionar en el mapa) <ErrorIconPulsing error={errors.direction} color='primary' />
              </label>
              <input
                disabled
                type='text'
                id='direction'
                name='direction'
                value={displayDirection}
                onChange={handleOnChange}
                className='rounded-md px-1 text-white'
              />
              <div className='h-96 py-4'>
                <MapPost onLocationChange={handleLocation} onChange={handleOnChange} />
                {/* <button type="button" onClick={() => auxButtonClick()}>Confirm</button> */}
              </div>
            </div>
          </div>
          <button type='submit' disabled={handleDisabled()} className='btn btn-lg bg-primary text-white border-primaryDark'>
            Guardar
          </button>
        </form>
      </div>
      <div className='w-2/5'>
        <span className='font-bold text-white text-opacity-90 lg:text-xl xl:text-2xl 2xl:text-3xl lg:w-60 xl:w-80 2xl:w-96 block text-center ml-12 mr-auto'>
          ¡Hola! para poder utilizar todas las funcionalidades de <span className='text-primary'>ADOGTAME</span> te pedimos por favor completes estos
          datos, ¡Muchas gracias!
        </span>
        <div>
          <div className='ml-12 mr-auto mt-4 bg-gatitosWeb bg-bottom bg-cover relative lg:w-60 lg:h-60 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 rounded-full shadow-similBorderWhite floorShadowCircle' />
        </div>
      </div>
    </div>
  );
};

export default FormEspecial;
