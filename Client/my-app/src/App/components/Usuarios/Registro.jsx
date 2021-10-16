import React, { useEffect, useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import emailjs from 'emailjs-com';

//? Components
import MapPost from '../Maps/MapPost';
import PhoneCodes from './phoneRegionInput';
import RadioSelectButtons from '../RadioSelectButtons';

//? Services
import { getCities, getCountries, getProvinces, postUsers } from '../../redux/actions/index';

//? Styles
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';

function Registro() {
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState('');
  const [location, setLocation] = useState({});
  const history = useHistory();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: '',
    mail: '',
    phone: '',
    direction: '',
    password: '',
    confirmPassword: '',
    lat: '',
    lng: '',
    Cityid: '',
    UsersTypeid: 'i',
  });
  const [errors, setErrors] = useState({});

  //* Validaciones de formulario y function para maneja de errores
  const validate = ({ name, mail, phone, direction, password, confirmPassword }) => {
    let errors = {};
    if (!name) {
      errors.name = 'Ingresa tu nombre y apellido';
    }
    if (!mail || !mail.includes('@') || !mail.includes('.')) {
      errors.mail = 'Debe ser un email válido';
    }
    if (!phone) {
      errors.phone = 'Ingresa tu número telefónico';
    }
    if (!direction) {
      errors.direction = 'Ingresa la zona donde resides';
    }
    if (!password || password.length < 8) {
      errors.password = 'Debe tener al menos 8 caracteres';
    }
    if (!confirmPassword || confirmPassword.length < 8 || !(confirmPassword === password)) {
      errors.confirmPassword = 'Las contraseñas deben coincidir';
    }
    return errors;
  };
  const handleOnChange = e => {
    e.preventDefault();
    if (e.target.name === 'phone') {
      if (e.target?.value) {
        setErrors(validate(input));

        const phoneNumber = parsePhoneNumber(e.target.value, phoneCode);
        if (phoneNumber?.isValid()) {
          //console.log('Is Valid');
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
  const handleDisabled = () => {
    if (input.name !== '' && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  //* function maneja los parametros del mapa para cargar en input
  const handleLocation = () => {
    let adress = document.getElementById('route')?.innerHTML + ' ' + document.getElementById('street_number')?.innerHTML;
    let city = document.getElementById('administrative_area_level_2')?.innerHTML;
    let province = document.getElementById('administrative_area_level_1')?.innerHTML;
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

    //setDireccion(adress)
    setErrors(validate({ ...input, direction: adress, lat: lat, lng: lng }));
  };

  //* Maneja el codigo de area del telefono
  const handlePhoneCodeChange = e => {
    setPhoneCode(e.target.value);
  };

  //* Maneja el submit del form registro
  const handleSubmit = async e => {
    e.preventDefault();
    emailjs.sendForm('service_ayo0oer', 'template_yvy3l7h', e.target, "user_Fm0LQR1ItoVornKoxbfvo").then(res => {console.log (res)}).catch(err=>{console.log(err)})
    let city = await axios.post('/locations', location);
    let auxInput = { ...input, Cityid: city.data.id };
    swal({
      title: "Registro Exitoso!",
      text: "Ahora puede iniciar sesión",
      icon: "success",
    }) 
    dispatch(postUsers(auxInput));
    history.push('/login');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='ml-auto mr-12 bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className='flex justify-center items-center w-3/5 z-1 h-full'>
        <form onSubmit={e => handleSubmit(e)} className='p-4 w-11/12 flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='mx-auto mb-4 flex justify-center items-center bg-fourty w-16 h-16 rounded-full'>
            <FaPaw className='text-white text-3xl' />
          </div>

          <div className='flex gap-8 overflow-auto mb-4'>
            <div className='flex flex-col w-2/5'>
              <label className='text-white'>Tipo de cuenta:</label>
              <div className='flex justify-evenly mb-2'>
                <RadioSelectButtons 
                  state={input}
                  name='UsersTypeid' 
                  options={['Personal', 'Refugios']} 
                  values={['i', 'r']} 
                  onSelection={handleOnChange} 
                  colorsOn='bg-thirtyDark'
                  colorsOff='bg-thirtyLight border-thirtyDark'
                />
              </div>

              <label className='text-white'>
                {input.UsersTypeid === 'r' ? 'Nombre del refugio' : 'Nombre y apellido'}:{' '}
                {errors.name && (
                  <span title={errors.name}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input
                type='text'
                id='name'
                name='name'
                // value={input.name}
                onChange={handleOnChange}
                className='rounded-md px-1 mb-2'
              />

              <label className='text-white'>
                E-mail:{' '}
                {errors.mail && (
                  <span title={errors.mail}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input
                type='text'
                id='mail'
                name='mail'
                // value={input.mail}
                onChange={handleOnChange}
                className='rounded-md px-1 mb-2'
              />

              <label className='text-white'>
                Contraseña:{' '}
                {errors.password && (
                  <span title={errors.password}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input
                type='password'
                id='password'
                name='password'
                // value={input.password}
                onChange={handleOnChange}
                className='rounded-md px-1 mb-2'
              />

              <label className='text-white'>
                Repetir contraseña:{' '}
                {errors.confirmPassword && (
                  <span title={errors.confirmPassword}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input
                type='password'
                // id='password'
                name='confirmPassword'
                // value={input.confirmPassword}
                onChange={handleOnChange}
                className='rounded-md px-1 mb-2'
              />

              <div className='flex gap-2'>
                <div className='w-1/4'>
                  <label className='text-white'>
                    Código:
                    <PhoneCodes onCodeChange={handlePhoneCodeChange} className='rounded-md' />
                  </label>
                </div>
                <div className='w-3/4 flex flex-col'>
                  <label className='text-white'>
                    Teléfono:
                    {errors.phone && (
                      <span title={errors.phone}>
                        <FaExclamationCircle className='inline text-primary align-baseline' />
                      </span>
                    )}
                  </label>
                  <input
                    type='number'
                    id='phone'
                    name='phone'
                    // value={input.phone}
                    onChange={handleOnChange}
                    className='rounded-md px-1 mb-2'
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col w-3/5 '>
              <label className='text-white'>
                Dirección: (Seleccionar en el mapa)
                {errors.direction && (
                  <span title={errors.direction}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input disabled type='text' id='direction' name='direction' value={input.direction} onChange={handleOnChange} className='rounded-md px-1 text-white' />
              <div className='h-full pt-2'>
                <MapPost onLocationChange={handleLocation} onChange={handleOnChange} className='' />
                {/* <button type="button" onClick={() => auxButtonClick()}>Confirm</button> */}
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <button type='submit' disabled={handleDisabled()} className='btn btn-lg bg-primary text-white border-yellow-600'>
              Registrate
            </button>
            <span className='text-center text-white hover:underline'>
              <Link to='/login'>¿Ya tienes una cuenta? Inicia sesión</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
