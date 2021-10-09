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
    country: '',
    province: '',
    city: '',
    agemin: '',
    agemax: '',
    size: '',
    sex: '',
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

  //* botón para resetar los filtros de edad
  const handleResetAge = () => {
    let updateFilter = {
      ...urlFilter,
      agemin: '',
      agemax: '',
    };
    setUrlFilter(updateFilter);
    sendFilters(updateFilter);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendFilters(urlFilter);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    currentLocation === '/adopciones'
      ? setUrlFilter({
          type: '',
          country: '',
          province: '',
          city: '',
          agemin: '',
          agemax: '',
          size: '',
          sex: '',
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
    let cleanFilter = { ...filters }; // ← Dami, acá había que hacer una copia, sino cleanFilter era lo mismo que urlFilter, y al hacer delete en cleanFilter estabas modificando las propiedades del estado en sí también ! ((((borrar este comentario))

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
    <div>
      <div className='px-2 ml-4 w-full h-7 font-bold text-thirty text-2xl'>Filtrar resultados:</div>
      {currentLocation === '/adopciones' ? (
        <div className='r w-full px-8 py-4 ml-4 bg-transparent rounded-sm '>
          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <label className='w-full h-7 font-bold'>
              Especie{' '}
              {urlFilter.type && (
                <button
                  value=''
                  name='type'
                  title='Resetear filtro de Especie'
                  onClick={handleSetUrl}
                  className='w-4 btn btn-nav text-white bg-primary'>
                  x
                </button>
              )}
            </label>
            <div className='h-7'>
              <button
                value='p'
                name='type'
                onClick={handleSetUrl}
                className={`w-16 btn-nav text-white ${
                  urlFilter.type === 'p' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Perro
              </button>
            </div>
            <div className='h-7 mb-2'>
              <button
                value='g'
                name='type'
                onClick={handleSetUrl}
                className={`w-16 btn-nav text-white ${
                  urlFilter.type === 'g' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Gato
              </button>
            </div>
          </div>

          <SelectUbication urlFilter={urlFilter} handleSetUrl={handleSetUrl} />

          <div className='p-1 mb-2 flex flex-wrap justify-between items-center border-b-2 border-t-2 border-thirtyLight border-opacity-50'>
            <label className='w-full h-7 font-bold mt-2'>
              Edad{' '}
              {(urlFilter.agemin || urlFilter.agemax) && (
                <button
                  title='Resetear filtro de Edad'
                  onClick={handleResetAge}
                  className='w-4 btn btn-nav text-white bg-primary'>
                  x
                </button>
              )}
            </label>
            <div className='flex justify-start w-full'>
              <div>
                Min:
                <br />
                <input
                  type='number'
                  name='agemin'
                  min={0}
                  max={20}
                  value={urlFilter.agemin}
                  className='mb-2 w-12 px-1 rounded-md mr-8'
                  onChange={handleSetAge}
                />
              </div>
              <div>
                Max:
                <br />
                <input
                  type='number'
                  name='agemax'
                  min={0}
                  max={20}
                  className='mb-2 w-12 px-1 rounded-md'
                  value={urlFilter.agemax}
                  onChange={handleSetAge}
                />
              </div>
            </div>
            <button
              type='submit'
              className={
                urlFilter.agemin || urlFilter.agemax
                  ? 'btn bg-primary p-1 rounded-lg disabled:opacity-50 mb-2'
                  : 'btn p-1 mb-2 invisible'
              }
              onClick={handleSend}>
              Aplicar
            </button>
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <label className='w-full h-7 font-bold'>
              Tamaño{' '}
              {urlFilter.size && (
                <button
                  value=''
                  name='size'
                  title='Resetear filtro de Tamaño'
                  onClick={handleSetUrl}
                  className='w-4 btn btn-nav text-white bg-primary'>
                  x
                </button>
              )}
            </label>
            <div className='h-7'>
              <button
                value='c'
                name='size'
                onClick={handleSetUrl}
                className={`w-20 btn-nav text-white transition-all ${
                  urlFilter.size === 'c' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Pequeño
              </button>
            </div>
            <div className='h-7'>
              <button
                value='m'
                name='size'
                onClick={handleSetUrl}
                className={`w-20 btn-nav text-white transition-all ${
                  urlFilter.size === 'm' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Mediano
              </button>
            </div>
            <div className='h-7 mb-2'>
              <button
                value='g'
                name='size'
                onClick={handleSetUrl}
                className={`w-20 btn-nav text-white transition-all ${
                  urlFilter.size === 'g' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Grande
              </button>
            </div>
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <label className='w-full h-7 font-bold'>
              Sexo{' '}
              {urlFilter.gender && (
                <button
                  value=''
                  name='gender'
                  title='Resetear filtro de Sexo'
                  onClick={handleSetUrl}
                  className='w-4 btn btn-nav text-white bg-primary'>
                  x
                </button>
              )}
            </label>
            <div className='h-7'>
              <button
                value='m'
                name='gender'
                onClick={handleSetUrl}
                className={`w-20 btn-nav text-white transition-all ${
                  urlFilter.gender === 'm' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Macho
              </button>
            </div>
            <div className='h-7 mb-2'>
              <button
                value='h'
                name='gender'
                onClick={handleSetUrl}
                className={`w-20 btn-nav text-white transition-all ${
                  urlFilter.gender === 'h' ? ' bg-thirtyDark' : 'btn bg-thirtyLight'
                }`}>
                Hembra
              </button>
            </div>
          </div>
          <br />

          <button className='btn bg-primary py-1 px-3 rounded-lg' onClick={handleResetFilters}>
            Resetear filtros
          </button>
        </div>
      ) : currentLocation === '/perdidos' ? (
        <div className='border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm'>
          <SelectUbication urlFilter={urlFilterLost} handleSetUrl={handleSetUrlLost} />
          <button className='btn bg-primary p-1 rounded-lg' onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className='border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm '>
          <SelectUbication urlFilter={urlShelter} handleSetUrl={handleSetUrlShelter} />
          <button className='btn bg-primary p-1 rounded-lg' onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FiltersBar;
