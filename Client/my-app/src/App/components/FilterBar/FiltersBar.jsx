import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import {
  getCities,
  getCountries,
  getLostPets,
  getLostPetsFilter,
  getPetsAdop,
  getPetsAdopFilter,
  getProvinces,
  getShelters,
  getSheltersFilter,
} from '../../redux/actions';
import SelectUbication from './SelectCountries/SelectUbication';

function FiltersBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const [urlFilter, setUrlFilter] = useState({
    type: '',
    gender: '',
    size: '',
    agemin: '',
    agemax: '',
    country: '',
    province: '',
    city: '',
  });
  const [urlFilterLost, setUrlFilterLost] = useState({
    country: '',
    province: '',
    city: '',
  });
  const [urlShelter, setUrlShelter] = useState({
    country: '',
    province: '',
    city: '',
  });
  let location = useLocation();
  let currentLocation = location.pathname;

  const handleSetUrl = (e) => {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlFilter,
        [e.target.name]: e.target.value,
      };

      setUrlFilter(updateFilter);

      sendFilters(updateFilter);
    }
  };

  const handleSetUrlLost = (e) => {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlFilterLost,
        [e.target.name]: e.target.value,
      };

      setUrlFilterLost(updateFilter);
      sendFilters(updateFilter);
    }
  };

  const handleSetUrlShelter = (e) => {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlShelter,
        [e.target.name]: e.target.value,
      };

      setUrlShelter(updateFilter);
      sendFilters(updateFilter);
    }
  };

  const handleSetAge = (e) => {
    e.preventDefault();
    let value = e.target.value;

    let updateFilter = {
      ...urlFilter,
      [e.target.name]: value,
    };
    setUrlFilter(updateFilter);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendFilters(urlFilter);
  };

  const setDisabled = () => {
    if (urlFilter.agemax === '' && urlFilter.agemax === '') return true;

    return false;
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    currentLocation === '/adopciones'
      ? setUrlFilter({
          type: '',
          gender: '',
          size: '',
          agemin: '',
          agemax: '',
          country: '',
          province: '',
          city: '',
        })
      : currentLocation === '/perdidos'
      ? setUrlFilterLost({ country: '', province: '', city: '' })
      : setUrlShelter({ country: '', province: '', city: '' });

    currentLocation === '/adopciones'
      ? dispatch(getPetsAdop())
      : currentLocation === '/perdidos'
      ? dispatch(getLostPets())
      : dispatch(getShelters());
  };

  const sendFilters = (filters) => {
    let cleanFilter = filters;

    cleanFilter.type === '' && delete cleanFilter.type;
    cleanFilter.gender === '' && delete cleanFilter.gender;
    cleanFilter.size === '' && delete cleanFilter.size;
    cleanFilter.agemin === '' && delete cleanFilter.agemin;
    cleanFilter.agemax === '' && delete cleanFilter.agemax;
    cleanFilter.country === '' && delete cleanFilter.country;
    cleanFilter.city === '' && delete cleanFilter.city;
    cleanFilter.province === '' && delete cleanFilter.province;

    currentLocation === '/adopciones'
      ? dispatch(getPetsAdopFilter(cleanFilter))
      : currentLocation === '/perdidos'
      ? dispatch(getLostPetsFilter(cleanFilter))
      : dispatch(getSheltersFilter(cleanFilter));
  };

  return (
    <>
      {currentLocation === '/adopciones' ? (
        <div className='r w-full  p-8 ml-4 bg-transparent rounded-sm '>
          <div className='p-1 mb-2 flex flex-col justify-start'>
            <label className='w-full pr-8  font-bold'>Especie</label>
            <button
              value='p'
              name='type'
              onClick={handleSetUrl}
              className='w-1/6 hover:underline focus:underline'>
              Perro
            </button>
            <button
              value='g'
              name='type'
              onClick={handleSetUrl}
              className='w-1/6 hover:underline focus:underline'>
              Gato
            </button>
          </div>

          <SelectUbication urlFilter={urlFilter} handleSetUrl={handleSetUrl} />

          <div className='p-1 mb-2 flex flex-wrap justify-between items-center '>
            <label className='w-1/2 pr-8  font-bold'>Edad</label>
            <input
              type='number'
              name='agemin'
              min={0}
              max={20}
              placeholder='Edad min:'
              value={urlFilter.agemin}
              className='w-3/4 mb-2 rounded-sm'
              onChange={handleSetAge}
            />
            <input
              type='number'
              name='agemax'
              min={0}
              max={20}
              placeholder='Edad max:'
              className='w-3/4 mb-4 rounded-sm'
              value={urlFilter.agemax}
              onChange={handleSetAge}
            />
            <button
              type='submit'
              className='btn bg-primary p-1 rounded-lg disabled:opacity-50 mb-2'
              onClick={handleSend}
              disabled={setDisabled()}>
              Send
            </button>
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start'>
            <label className='w-1/2 pr-8  font-bold'>Tamaño</label>
            <button
              value='c'
              name='size'
              onClick={handleSetUrl}
              className='w-1/3 hover:underline focus:underline'>
              Pequeño
            </button>
            <button
              value='m'
              name='size'
              onClick={handleSetUrl}
              className='w-1/3 hover:underline focus:underline'>
              Mediano
            </button>
            <button
              value='g'
              name='size'
              onClick={handleSetUrl}
              className='w-1/3 hover:underline focus:underline'>
              Grande
            </button>
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start'>
            <label className='w-1/2 pr-8  font-bold'>Sexo</label>
            <button
              value='m'
              name='gender'
              onClick={handleSetUrl}
              className='w-1/3 hover:underline focus:underline'>
              Macho
            </button>
            <button
              value='h'
              name='gender'
              onClick={handleSetUrl}
              className='w-1/3 hover:underline focus:underline'>
              Hembra
            </button>
          </div>

          <button
            className='btn bg-primary p-1 rounded-lg'
            onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      ) : currentLocation === '/perdidos' ? (
        <div className='border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm'>
          <SelectUbication
            urlFilter={urlFilterLost}
            handleSetUrl={handleSetUrlLost}
          />
          <button
            className='btn bg-primary p-1 rounded-lg'
            onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className='border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm '>
          <SelectUbication
            urlFilter={urlShelter}
            handleSetUrl={handleSetUrlShelter}
          />
          <button
            className='btn bg-primary p-1 rounded-lg'
            onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

export default FiltersBar;
