import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken';

//?Components
import SliderContainer from './SliderContainer';
import Onboarding from './Onboarding';
import IconosHome from './IconosHome';

//? Actions
import { getEvents, getLostPetsHome, getPetsAdopHome, getShelters, setUser } from '../../redux/actions';
import EventSlider from './EventSlider';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPetsAdopHome());
    dispatch(getLostPetsHome());
    dispatch(getShelters());
    dispatch(getEvents());
    const url = window.location.href;
    if (url.includes('loginGoogle=true')) {
      let token = url.slice(1).split('&')[1].slice(2).split('#')[0];
      let user = jwt.decode(token);
      localStorage.setItem('token', token);
      dispatch(setUser(user));
      history.push('/');
    }
  }, [dispatch, history]);

  return (
    <div className=''>
      <Onboarding />
      <IconosHome />
      <SliderContainer
        title='ADOPCION'
        className=' bg-gradient-to-r from-thirty to-fourty text-white'
      />
      <SliderContainer title='PERDIDOS' className=' bg-gray-200 text-primary' />
      <SliderContainer
        title='REFUGIOS'
        className=' bg-gradient-to-r from-thirty to-fourty text-white'
      />
      <EventSlider />
    </div>
  );
}

export default Home;
