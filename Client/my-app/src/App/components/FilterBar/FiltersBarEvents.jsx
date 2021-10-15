import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEventsFilter, getEvents } from '../../redux/actions';
import SelectUbication from './SelectCountries/SelectUbication';

function FiltersBarEvents() {
  const dispatch = useDispatch();

  //* Defino estado de filtros ingresados en Bar
  const [urlFilter, setUrlFilter] = useState({
    country: '',
    province: '',
    city: '',
  });

  //* Función para manejar el cambio del estado de filtros y el filtrado
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
  const sendFilters = (filters) => {
    let cleanFilter = { ...filters };

    cleanFilter.country === '' && delete cleanFilter.country;
    cleanFilter.city === '' && delete cleanFilter.city;
    cleanFilter.province === '' && delete cleanFilter.province;

    dispatch(getEventsFilter(cleanFilter));
  };

  //* Funcion para resetear los filtros y volver a cargar todos los eventos
  const handleResetFilters = (e) => {
    e.preventDefault();
    setUrlFilter({
      country: '',
      province: '',
      city: '',
    });
    dispatch(getEvents());
  };

  return (
    <div className=' h-full mt-44'>
      <div className='px-2 pt-2 w-full font-bold text-thirty text-xl border-t-2 border-thirtyLight border-opacity-50 text-center'>
        Filtrar eventos:
      </div>
      <div className='w-full px-2 py-4 bg-transparent rounded-sm '>
        <div className='p-1 mb-2 flex flex-col justify-start border-b-2 border-thirtyLight border-opacity-50'>
          <SelectUbication urlFilter={urlFilter} handleSetUrl={handleSetUrl} />
        </div>

        <button
          className='btn bg-primary py-1 px-3 rounded-lg'
          onClick={handleResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default FiltersBarEvents;
