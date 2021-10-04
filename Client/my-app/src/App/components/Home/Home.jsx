import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCities,
  getCountries,
  getLostPetsHome,
  getPetsAdopHome,
  getProvinces,
  getShelters,
} from '../../redux/actions';
import ContenedorSlider from './ContenedorSlider';
import Onboarding from '../Onboarding';
import IconosHome from './IconosHome';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
    dispatch(getPetsAdopHome());
    dispatch(getLostPetsHome());
    dispatch(getShelters());
  }, [dispatch]);

  return (
    <div className="">
      <Onboarding />
      <IconosHome />
      <ContenedorSlider title="ADOPCION" className=" bg-gradient-to-r from-thirty to-fourty text-white" />
      <ContenedorSlider title="EXTRAVIADOS" className=" bg-gray-200 text-primary" />
      <ContenedorSlider title="REFUGIOS" className=" bg-gradient-to-r from-thirty to-fourty text-white" />
    </div>
  );
}

export default Home;
