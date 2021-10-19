import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getLostPets, getLostPetsFilter, getPetsAdop, getPetsAdopFilter, getShelters, getSheltersFilter } from '../../redux/actions';

//? Components
import SelectUbication from './Opciones/SelectUbication';
import SelectEspecie from './Opciones/SelectEspecie';
import SelectEdad from './Opciones/SelectEdad';
import SelectTamaño from './Opciones/SelectTamaño';
import SelectSexo from './Opciones/SelectSexo';

function FiltersBar() {
  const dispatch = useDispatch();

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

  const handleSetUrl = e => {
    if (e.preventDefault) e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlFilter,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === 'country') {
        updateFilter = {
          ...updateFilter,
          province: '',
          city: '',
        };
      }
      if (e.target.name === 'province') {
        updateFilter = {
          ...updateFilter,
          city: '',
        };
      }
      if (e.target.name === 'resetEdad') {
        updateFilter = {
          ...updateFilter,
          agemin: '',
          agemax: '',
        };
      }

      setUrlFilter(updateFilter);
      sendFilters(updateFilter);
    }
  };

  const handleSetUrlLost = e => {
    if (e.preventDefault) e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlFilterLost,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === 'country') {
        updateFilter = {
          ...updateFilter,
          province: '',
          city: '',
        };
      }
      if (e.target.name === 'province') {
        updateFilter = {
          ...updateFilter,
          city: '',
        };
      }

      setUrlFilterLost(updateFilter);
      sendFilters(updateFilter);
    }
  };

  const handleSetUrlShelter = e => {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      let updateFilter = {
        ...urlShelter,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === 'country') {
        updateFilter = {
          ...updateFilter,
          province: '',
          city: '',
        };
      }
      if (e.target.name === 'province') {
        updateFilter = {
          ...updateFilter,
          city: '',
        };
      }

      setUrlShelter(updateFilter);
      sendFilters(updateFilter);
    }
  };

  const handleResetFilters = e => {
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

    currentLocation === '/adopciones' ? dispatch(getPetsAdop()) : currentLocation === '/perdidos' ? dispatch(getLostPets()) : dispatch(getShelters());
  };

  const sendFilters = filters => {
    let cleanFilter = { ...filters };

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
      <div className='px-2 pt-2 w-full font-bold text-thirty text-xl border-t-2 border-thirtyLight border-opacity-50 text-center'>Filtrar resultados:</div>
      {currentLocation === '/adopciones' ? (
        <div className='w-full px-2 py-4 bg-transparent rounded-sm '>
          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectUbication urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
          </div>
          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectEspecie urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
          </div>

          <div className='p-1 mb-2 flex flex-wrap justify-between items-center border-b-2 border-thirtyLight border-opacity-50'>
            <SelectEdad urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectTamaño urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
          </div>

          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectSexo urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
          </div>
          <br />
          <div className='text-center'>
            <button className='btn bg-primary py-1 px-3 rounded-lg' onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      ) : currentLocation === '/perdidos' ? (
        <div className='w-full px-2 py-4 bg-transparent rounded-sm'>
          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectUbication urlFilter={urlFilterLost} handleSetUrl={handleSetUrlLost} />
          </div>
          <div className='text-center'>
            <button className='btn bg-primary py-1 px-3 rounded-lg' onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className='w-full px-2 py-4 bg-transparent rounded-sm'>
          <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
            <SelectUbication urlFilter={urlShelter} handleSetUrl={handleSetUrlShelter} />
          </div>
          <div className='text-center'>
            <button className='btn bg-primary py-1 px-3 rounded-lg' onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersBar;
