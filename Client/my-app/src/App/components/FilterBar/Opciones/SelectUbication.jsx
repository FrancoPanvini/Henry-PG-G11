import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getProvinces, getCities, resetCities } from '../../../redux/actions/locations';

function SelectUbication({ urlFilter, handleSetUrl }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const paises = useSelector(state => state.countries);
  const provincias = useSelector(state => state.provinces);
  const ciudad = useSelector(state => state.cities);

  const [countryId, setCountryId] = useState(null);
  const [provinceId, setProvinceId] = useState(null);

  const handleFilterCountry = async e => {
    handleSetUrl(e);
    setCountryId(e.target.value);
    setProvinceId(null);
  };
  useEffect(() => {
    if (countryId) {
      dispatch(getProvinces(countryId));
      dispatch(resetCities());
    }
    //eslint-disable-next-line
  }, [countryId]);

  const handleFilterProvince = async e => {
    handleSetUrl(e);
    setProvinceId(e.target.value);
  };
  useEffect(() => {
    if (provinceId) {
      dispatch(getCities(provinceId));
    }
    //eslint-disable-next-line
  }, [provinceId]);

  return (
    <div className='p-1 mb-2 flex flex-wrap justify-between items-center '>
      <label className='w-1/2 pr-8  font-bold'>Ubicación</label>
      <select onChange={handleFilterCountry} name='country' value={urlFilter.country} className='w-full my-2 rounded-md px-1 capitalize'>
        <option>Seleccionar</option>
        {paises?.map(pais => (
          <option key={pais.id} name={pais.id} value={pais.id}>
            {pais.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={handleFilterProvince} name='province' value={urlFilter.province} className='w-full rounded-md px-1 my-2 capitalize'>
        <option>Seleccionar</option>
        {provincias.map(provincia => (
          <option key={provincia.id} value={provincia.id} name='province' onClick={provincia.target}>
            {provincia.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={handleSetUrl} value={urlFilter.city} className='w-full rounded-md px-1 my-2' name='city'>
        <option>Seleccionar</option>
        {ciudad &&
          ciudad
            .filter(p => parseInt(p.ProvinceId) === parseInt(provinceId))
            .map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
      </select>
    </div>
  );
}

export default SelectUbication;
