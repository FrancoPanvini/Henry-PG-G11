import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Search from "./subcomp/Search/Search";
import PetsDetail from "./subcomp/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null)

  
  
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        setCoordinates({lat: latitude, lng: longitude})
      })
  })
  
  
  useEffect(() => {
    const pet = async (sw, ne) => {
      try {
        const res = await axios.get('/pets', {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
        });
        setPets(res.data.rows);
        console.log(res.data.rows)
      } catch (err) {
        console.log(err);
      }
    };
    pet();
  }, []);


  return (
    <div>
      <CssBaseline />
      <Search />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List pets={pets}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppMap;
