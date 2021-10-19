import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates, items, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY' }}
        center={coordinates}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{ gestureHandling: 'greedy', clickableIcons: false }}
        onChange={e => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ latMin: e.bounds.sw.lat, latMax: e.bounds.ne.lat, lngMin: e.bounds.sw.lng, lngMax: e.bounds.ne.lng });
        }}
      >
        {items?.map((pet, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(pet.lat)}
            lng={Number(pet.lng)}
            key={i}
            onClick={event => {
              setChildClicked(event.target.id);
            }}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <div className='w-20 h-32 absolute rounded-xl overflow-hidden bg-primary transition-all cursor-pointer'>
                <div id={i} className='relative w-full h-4/5 object-cover card-transparency-bottom'>
                  <img alt='not available' src={pet.petPic ? pet.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'} className='h-full w-full object-cover' />
                </div>
                <p className=' w-full h-1/5 text-center leading-loose text-white text-sm font-bold capitalize'>{pet.name}</p>
              </div>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
