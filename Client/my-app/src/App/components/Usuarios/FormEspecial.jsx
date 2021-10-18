import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { initialUser } from '../../redux/actions/';
import { getCities, getProvinces, getCountries } from '../../redux/actions/locations';
import { editUserData } from '../../services/editUserData';
import axios from 'axios';
import parsePhoneNumber from 'libphonenumber-js';
import PhoneCodes from './phoneRegionInput';
import MapPost from '../Maps/MapPost';
import { useHistory } from 'react-router';

const FormEspecial = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const [phoneCode, setPhoneCode] = useState('');
  const [location, setLocation] = useState({});
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const validate = ({ phone, direction }) => {
    let errors = {};
    if (!phone) {
      errors.phone = 'Ingresa tu número telefónico';
    }
    if (!direction) {
      errors.direction = 'Ingresa la zona donde resides';
    }
    return errors;
  };
  const handlePhoneCodeChange = e => {
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
    setErrors(validate({ ...input, direction: adress, lat: lat, lng: lng }));
  };

  const handleOnChange = e => {
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

  const handleSubmit = async e => {
    e.preventDefault();
    let city = await axios.post('/locations', location);
    let auxInput = { ...input, CityId: city.data.id };
    editUserData(userId, auxInput);
    alert('Se actualizaron los datos correctamente');
    dispatch(initialUser(userId));
    history.push('/');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='flex justify-center items-center w-1/5 z-10'></div>
      <form onSubmit={e => handleSubmit(e)} className='h-auto p-4 py-12 mr-auto bg-thirty rounded-lg w-3/5 min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
        <label className='text-white'>Tipo de cuenta:</label>
        <div className='flex justify-evenly mb-2'>
          <button
            value='i'
            name='UsersTypeid'
            onClick={handleOnChange}
            className={`w-16 btn-nav text-white ${input.UsersTypeid === 'i' ? 'border-b-2 border-opacity-0 bg-thirtyDark' : 'btn bg-thirtyLight'}`}
          >
            Personal
          </button>
          <button
            value='r'
            name='UsersTypeid'
            onClick={handleOnChange}
            className={`w-16 btn-nav text-white ${input.UsersTypeid === 'r' ? 'border-b-2 border-opacity-0 bg-thirtyDark' : 'btn bg-thirtyLight'}`}
          >
            Refugio
          </button>
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
        <div className='flex flex-col w-3/5 h-screen60'>
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
          <div className='h-full pt-2'>
            <MapPost onLocationChange={handleLocation} onChange={handleOnChange} className='' />
            {/* <button type="button" onClick={() => auxButtonClick()}>Confirm</button> */}
          </div>
        </div>
        {input.UsersTypeid === 'r' ? (
          <div className='flex p-2 m-2 flex-wrap'>
            <label className='text-white m-2'>
              {' '}
              Descripcion
              <input type='text' id='description' name='description' onChange={handleOnChange}></input>
            </label>
            <label className='text-white m-2'>
              {' '}
              Responsable del refugio
              <input type='text' id='responsable' name='responsable' onChange={handleOnChange}></input>
            </label>
            <label className='text-white m-2'>
              {' '}
              link_donaciones
              <input type='text' id='link_donaciones' name='link_donaciones' onChange={handleOnChange}></input>
            </label>
            <label className='text-white m-2'>
              {' '}
              link_instagram
              <input type='text' id='link_instagram' name='link_instagram' onChange={handleOnChange}></input>
            </label>
            <label className='text-white m-2'>
              {' '}
              link_facebook
              <input type='text' id='link_facebook' name='link_facebook' onChange={handleOnChange}></input>
            </label>
            <label className='text-white m-2'>
              {' '}
              link_web
              <input type='text' id='link_web' name='link_web' onChange={handleOnChange}></input>
            </label>
          </div>
        ) : (
          <> </>
        )}
        <button type='submit'>Guardar</button>
      </form>
    </div>
  );
};

export default FormEspecial;
