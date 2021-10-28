import { Grid } from '@material-ui/core';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';

import Search from './subcomp/Search/Search';
import Map from './subcomp/Map/Map';
import List from './subcomp/List/List';
import ListRefugios from './subcomp/List/ListRefugios';

import axios from 'axios';

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('p');
  const [sex, setSex] = useState('m');
  const [size, setSize] = useState('p');

  const [, setRandom] = useState('');

  const [filters, setFilters] = useState({
    type: '',
    sex: '',
    size: '',
  });

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const currentPosition = pos => {
    setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };
  const noCurrentPosition = error => {
    setCoordinates({ lat: 4.6533326, lng: -74.083652 });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(currentPosition, noCurrentPosition);
    setRandom(1);
  }, []);
  let location = useLocation();

  const applyFilter = (type, el) => {
    let aux = { ...filters, [type]: el };
    setFilters(aux);
    let filterAux = Object.entries({ ...filters, [type]: el });
    let auxDeAux = filterAux.reduce((acc, filtered) => {
      if (filtered[1] !== '') {
        acc = acc.filter(pet => filtered[1] === pet[filtered[0]]);
        return acc;
      } else {
        return acc;
      }
    }, pets);
    setFilteredItems(auxDeAux);
  };

  useEffect(() => {
    let currentLocation = location.pathname.split('/')[1];
    if (currentLocation === 'adopciones') {
      currentLocation = 'pets?adopted=false';
    } else if (currentLocation === 'perdidos') {
      currentLocation = 'lostpets?lost=true';
    } else {
      currentLocation = 'users?type=r';
    }

    const pet = async () => {
      try {
        if (bounds?.latMax) {
          const res = await axios.get(`/${currentLocation}&lngMax=${bounds.lngMax}&lngMin=${bounds.lngMin}&latMax=${bounds.latMax}&latMin=${bounds.latMin}`);
          let animals = res.data.rows.filter(place => place.name); //
          setPets(animals);

          let filterAux = Object.entries({ ...filters });
          filters
            ? setFilteredItems(
                filterAux.reduce((acc, filtered) => {
                  if (filtered[1] !== '') {
                    acc = acc.filter(pet => filtered[1] === pet[filtered[0]]);
                    return acc;
                  } else {
                    return acc;
                  }
                }, animals)
              )
            : setFilteredItems(animals);

          setIsLoading(false);
        } else {
          const res = await axios.get(`/${currentLocation}`);
          setPets(res.data.rows.filter(place => place.name));
          setFilteredItems(res.data.rows.filter(place => place.name));
          setFilters({
            type: '',
            sex: '',
            size: '',
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    pet();
    // eslint-disable-next-line
  }, [bounds]);

  return (
    <div className='h-screen82 relative overflow-hidden'>
      <Search setCoordinates={setCoordinates} />
      <Grid container spacing={3} className='w-full h-full'>
        <Grid item xs={12} md={4} className='w-full h-full'>
          {location.pathname.includes('refugios') ? (
            <ListRefugios filter={applyFilter} childClicked={childClicked} isLoading={isLoading} items={filteredItems} />
          ) : (
            <List filter={applyFilter} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} sex={sex} setSex={setSex} size={size} setSize={setSize} items={filteredItems} />
          )}
        </Grid>
        <Grid item xs={12} md={8} style={{ height: '77vh' }}>
          <Map onLoad={onMapLoad} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} items={filteredItems} setChildClicked={setChildClicked} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AppMap;
