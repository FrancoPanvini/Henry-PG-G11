import { CssBaseline, Grid } from "@material-ui/core";
import React, { useState, useCallback, useRef, useEffect } from "react";

import Search from "./subcomp/Search/Search";
import PetsDetail from "./subcomp/PetsDetail/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p");

  const [filteredSex, setFilteredSex] = useState([]);
  const [filteredSize, setFilteredSize] = useState([]);
  const [random, setRandom] = useState("");

  let filterin = {
    type:"",
    sex:"",
    size:""
  }
  const [filters, setFilters] = useState({
    type:"",
    sex:"",
    size:""
  })

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
  },);


  const applyFilter = (type, el) => {
    let aux = {...filters, [type]: el}
    setFilters(aux)
    let filterAux = Object.entries({...filters, [type]: el}); //[[type,""],[sex,""],[size,""]]
    console.log(filterAux)
    let auxDeAux = filterAux.reduce((acc, filtered) => {
      if(filtered[1] != "") {
        let auxe = filtered[0]

        console.log(acc[0], filtered[1])
        acc = acc.filter(pet => filtered[1] == pet[filtered[0]])
        return acc
      }
      else{
        return acc
      }
    },pets)
    console.log(auxDeAux)
    setFilteredPets(auxDeAux)
    setRandom("")

  }


  useEffect(() => {
         setIsLoading(true);
      const pet = async (sw, ne, type) => {
        try {
          const res = await axios.get(`/pets?adopted=false`);
          setPets(res.data.rows.filter((place) => place.name));
          setFilteredPets(res.data.rows.filter((place) => place.name))
          setIsLoading(false);
          setFilters({
            type:"",
            sex:"",
            size:""
          })
        } 
        catch (err) {
          console.log(err);
        }
      };
      pet();  
  }, [bounds]);




  return (
    <div>
      <CssBaseline />
      <Search setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%", height: "auto" }}>
        <Grid item xs={12} md={4}>
          <List
            //pets={filteredSex.length ? filteredSex : pets}
            //pets={filteredSize.length ? filteredSize : pets}
            filter={applyFilter}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            sex={sex}
            setSex={setSex}
            size={size}
            setSize={setSize}
            pets={filteredPets}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ marginTop: "20px" }}>
          <Map
            onLoad={onMapLoad}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            pets={filteredPets}
            //pets={filteredSex.length ? filteredSex : pets}
            //pets={filteredSize.length ? filteredSize : pets}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AppMap;
