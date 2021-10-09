import { CssBaseline, Grid } from "@material-ui/core";
import React, { useState, useCallback, useRef, useEffect } from 'react';

import Search from "./subcomp/Search/Search";
import PetsDetail from "./subcomp/PetsDetail/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [childClicked, setChildClicked] = useState(null)
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  
  
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        setCoordinates({lat: latitude, lng: longitude})
      })
  })
  
  
  useEffect(() => {
    const pet = async (sw, ne) => {
      try {
        const res = await axios.get('/pets'); 
        setPets(res.data.rows);
        console.log(res.data.rows)
      } catch (err) {
        console.log(err);
      }
    };
    pet();
  }, []);
const setBoundsOnClick = () => {
  let bounds = mapRef.current.getBounds();
  console.log(bounds) 
} 

console.log(pets)
  return (
    <div>
      <CssBaseline />
      <Search />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List pets={pets}
          childClicked={childClicked}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          onLoad={onMapLoad}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          pets={pets}
          />
          <button onClick={() => setBoundsOnClick()}>Buscar Aquí</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppMap;
