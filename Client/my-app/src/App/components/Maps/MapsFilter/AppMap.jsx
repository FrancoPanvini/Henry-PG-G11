import { CssBaseline, Grid } from "@material-ui/core";
import React, { useState, useCallback, useRef, useEffect } from "react";

import Search from "./subcomp/Search/Search";
import PetsDetail from "./subcomp/PetsDetail/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p");

  const [filteredSex, setFilteredSex] = useState([]);
  const [filteredSize, setFilteredSize] = useState([]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  });

  useEffect(() => {
    const filteredSex = pets.filter((pet) => pet.sex !== sex);
    const filteredSize = pets.filter((pet) => pet.size == size);
    setFilteredSex(filteredSex);
    setFilteredSize(filteredSize);
  }, [sex, size]);

  useEffect(() => {
    setIsLoading(true);
    const pet = async (sw, ne, type) => {
      try {
        const res = await axios.get(`/pets/`);
        setPets(res.data.rows.filter((place) => place.name));
        setFilteredSize([]);
        setFilteredSex([]);
        setIsLoading(false);
        console.log(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    pet();
  }, [type, coordinates, bounds]);

  const setBoundsOnClick = () => {
    let bounds = mapRef.current.getBounds();
    console.log(bounds);
  };

  console.log(pets);
  return (
    <div>
      <CssBaseline />
      <Search setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: "100%" , height:"auto"}}>
        <Grid item xs={12} md={4}>
          <List
            pets={filteredSex.length ? filteredSex : pets}
            pets={filteredSize.length ? filteredSize : pets}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            sex={sex}
            setSex={setSex}
            size={size}
            setSize={setSize}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{marginTop: '20px'}}>
          <Map
            onLoad={onMapLoad}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            pets={filteredSex.length ? filteredSex : pets}
            pets={filteredSize.length ? filteredSize : pets}
            setChildClicked={setChildClicked}
          />
          {/* <button onClick={() => setBoundsOnClick()}>Buscar Aquí</button> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AppMap;
