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
import SliderContainer from './SliderContainer';
import Onboarding from './Onboarding';
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
      <SliderContainer title="ADOPCION" className=" bg-gradient-to-r from-thirty to-fourty text-white" />
      <SliderContainer title="PERDIDOS" className=" bg-gray-200 text-primary" />
      <SliderContainer title="REFUGIOS" className=" bg-gradient-to-r from-thirty to-fourty text-white" />
    </div>
  );
}

export default Home;
