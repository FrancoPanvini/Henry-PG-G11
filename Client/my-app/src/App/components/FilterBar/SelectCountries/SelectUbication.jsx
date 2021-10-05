import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, getCountries, getProvinces } from '../../../redux/actions';

function SelectUbication({ urlFilter, handleSetUrl }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

  const pais = useSelector((state) => state.countries);
  const provincia = useSelector((state) => state.provinces);
  const ciudad = useSelector((state) => state.cities);
  const [countryId, setCountryId] = useState(null);
  const [provinceId, setProvinceId] = useState(null);

  const handleFilterUbication = (e) => {
    handleSetUrl(e);

    e.target.name === 'country'
      ? setCountryId(e.target.value)
      : setProvinceId(e.target.value);
  };

  return (
    <div className='p-1 mb-2 flex flex-wrap justify-between items-center '>
      <label className='w-1/2 pr-8  font-bold'>Ubicación</label>
      <select
        onChange={handleFilterUbication}
        name='country'
        defaultValue='default'
        value={urlFilter.country}
        /* id="paises" */ className='w-full my-2 rounded-md px-1'>
        <option value='default'>Seleccionar</option>
        {pais &&
          pais.map((e) => (
            <option key={e.id} name={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
      </select>
      <br />
      <select
        onChange={handleFilterUbication}
        className='w-full rounded-md px-1 my-2' /* id="provincias" */
        name='province'
        value={urlFilter.province}>
        <option>Seleccionar</option>
        {provincia &&
          provincia
            .filter((p) => parseInt(p.CountryId) === parseInt(countryId))
            .map((e) => (
              <option key={e.id} value={e.id} name='city' onClick={e.target}>
                {e.name}
              </option>
            ))}
      </select>
      <br />
      <select
        onChange={handleSetUrl}
        className='w-full rounded-md px-1 my-2' /* id="provincias" */
        name='city'
        value={urlFilter.city}>
        <option>Seleccionar</option>
        {ciudad &&
          ciudad
            .filter((p) => parseInt(p.ProvinceId) === parseInt(provinceId))
            .map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
      </select>
    </div>
  );
}

export default SelectUbication;
