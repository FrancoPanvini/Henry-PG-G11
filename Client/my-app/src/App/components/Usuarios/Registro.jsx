import React, { useEffect, useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import PhoneCodes from './phoneRegionInput';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { getCities, getCountries, getProvinces, postUsers } from '../../redux/actions/index';
import { useHistory } from 'react-router-dom';
import MapPost from '../Maps/MapPost';

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

    setInput((prevState) => {
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

  const handlePhoneCodeChange = (e) => {
    setPhoneCode(e.target.value);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'phone') {
      if (e.target?.value) {
        setErrors(validate(input));

        const phoneNumber = parsePhoneNumber(e.target.value, phoneCode);
        if (phoneNumber?.isValid()) {
          console.log('Is Valid');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let auxInput = { ...input, Cityid: city.data.id };
    console.log(auxInput);
    dispatch(postUsers(auxInput));

    alert('¡Registro exitoso! ahora puede iniciar sesión');
    history.push('/login');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className='flex justify-center items-center w-3/5 z-10'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='h-auto p-4 py-12 mr-auto bg-thirty rounded-lg w-3/5 min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full'>
            <FaPaw className='text-white text-3xl' />
          </div>
          <br />

          <div className='flex gap-8'>
            <div className='flex flex-col h-7 w-2/5'>
              <label className='text-white'>Tipo de cuenta:</label>
              <div className='flex justify-evenly mb-2'>
                <button
                  value='i'
                  name='UsersTypeid'
                  onClick={handleOnChange}
                  className={`w-16 btn-nav text-white ${
                    input.UsersTypeid === 'i' ? 'border-b-2 border-opacity-0 bg-thirtyDark' : 'btn bg-thirtyLight'
                  }`}>
                  Personal
                </button>
                <button
                  value='r'
                  name='UsersTypeid'
                  onClick={handleOnChange}
                  className={`w-16 btn-nav text-white ${
                    input.UsersTypeid === 'r' ? 'border-b-2 border-opacity-0 bg-thirtyDark' : 'btn bg-thirtyLight'
                  }`}>
                  Refugio
                </button>
              </div>

              <label className='text-white'>
                Nombre y apellido{input.UsersTypeid === 'r' && ' del titular'}:{' '}
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
                <div className='w-3/4'>
                  <label className='text-white'>
                    Teléfono:{' '}
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

              {/* <label className='text-white'>
                Pais:{' '}
                {errors.paises && (
                  <span title={errors.paises}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <select
                autoComplete='on'
                onChange={(e) => setCountryId(e.target.value)}
                id='paises'
                className='rounded-md px-1 mb-2 capitalize'>
                {paises &&
                  paises.map((pais) => (
                    <option key={pais.id} name={pais.id} value={pais.id} className='capitalize'>
                      {pais.name}
                    </option>
                  ))}
              </select> */}

              {/*             <label className='text-white'>Pais:</label>
              <input type='text' id='pais' list='paises' onChange={handleUbicationChange} className='rounded-md px-1 mb-2' />
              <datalist id='paises'>{paises && paises.map((pais) => <option key={pais.id} value={pais.name} />)}</datalist> */}

              {/* <label className='text-white'>Provincia/Departamento: </label>
              <select onChange={(e) => setProvinceId(e.target.value)} className='rounded-md px-1 mb-2' id="provincias">
                {provincias &&
                  provincias
                    .filter((p) => parseInt(p.CountryId) === parseInt(countryId))
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
              </select> */}

              {/* <label className='text-white'>Provincia/Departamento: </label>
              <input
                type='text'
                id='provincia'
                list='provincias'
                onChange={handleUbicationChange}
                className='rounded-md px-1 mb-2'
              />
              <datalist className='rounded-md px-1 mb-2' id='provincias'>
                {provincias &&
                  provincias
                    .filter((provincia) => parseInt(provincia.CountryId) === parseInt(countryId))
                    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                    .map((provincia) => <option key={provincia.id} value={provincia.name} />)}
              </datalist> */}

              {/* <label className='text-white'>
                Ciudad:{' '}
                {errors.Cityid && (
                  <span title={errors.Cityid}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <select onChange={handleOnChange} className='rounded-md px-1' id="provincias" name='Cityid'>
                {ciudad &&
                  ciudad
                    .filter((p) => parseInt(p.ProvinceId) === parseInt(provinceId))
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
              </select> */}

              {/* <label className='text-white'>Ciudad:</label>
              <input type='text' id='ciudad' list='ciudades' onChange={handleUbicationChange} className='rounded-md px-1 mb-2' />
              <datalist className='rounded-md px-1 mb-2' id='ciudades'>
                {ciudades &&
                  ciudades
                    .filter((ciudad) => parseInt(ciudad.ProvinceId) === parseInt(provinceId))
                    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                    .map((ciudad) => (
                      <option
                        key={ciudad.id}
                        value={ciudad.name.replace(/(^|[^A-Za-zÁÉÍÓÚÑáéíóúñ])([a-záéíóúñ])/g, (l) => l.toUpperCase())}
                      />
                    ))}
              </datalist> */}
            </div>

            <div className='flex flex-col w-3/5'>
              <label className='text-white'>
                Dirección: (Seleccionar en el mapa){' '}
                {errors.direction && (
                  <span title={errors.direction}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <input
                disabled
                type='text'
                id='direction'
                name='direction'
                // value={input.direction}
                onChange={handleOnChange}
                className='rounded-md px-1'
              />
              <div>
                <MapPost onLocationChange={handleLocation} onChange={handleOnChange} className='h-4/5' />
                {/* <button type="button" onClick={() => auxButtonClick()}>Confirm</button> */}
              </div>
            </div>
          </div>
          <br />
          <div className='flex flex-col'>
            <button type='submit' disabled={handleDisabled()} className='btn btn-lg bg-primary text-white border-yellow-600'>
              Registrate
            </button>
            <br />
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
