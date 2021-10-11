import { Grid } from "@material-ui/core";
import React, { useState, useCallback, useRef, useEffect } from "react";

import Search from "./subcomp/Search/Search";
//import PetsDetail from "./subcomp/PetsDetail/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p");

  const [, setRandom] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    sex: "",
    size: "",
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const currentPosition = (pos) => {
    setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };
  const noCurrentPosition = (error) => {
    setCoordinates({ lat: 4.6533326, lng: -74.083652 });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      currentPosition,
      noCurrentPosition
    );
    setRandom(1);
  }, []);

  const applyFilter = (type, el) => {
    let aux = { ...filters, [type]: el };
    setFilters(aux);
    let filterAux = Object.entries({ ...filters, [type]: el }); //[[type,""],[sex,""],[size,""]]
    console.log(filterAux);
    let auxDeAux = filterAux.reduce((acc, filtered) => {
      if (filtered[1] !== "") {
        //let auxe = filtered[0]

        console.log(acc[0], filtered[1]);
        acc = acc.filter((pet) => filtered[1] === pet[filtered[0]]);
        return acc;
      } else {
        return acc;
      }
    }, pets);
    console.log(auxDeAux);
    setFilteredPets(auxDeAux);
  };

  useEffect(() => {
    //setIsLoading(true);
    const pet = async () => {
      try {
        if (bounds?.latMax) {
          const res = await axios.get(
            `/pets?adopted=false&lngMax=${bounds.lngMax}&lngMin=${bounds.lngMin}&latMax=${bounds.latMax}&latMin=${bounds.latMin}`
          );
          let animals = res.data.rows.filter((place) => place.name); //
          setPets(animals);

          let filterAux = Object.entries({ ...filters });
          filters
            ? setFilteredPets(
                filterAux.reduce((acc, filtered) => {
                  if (filtered[1] !== "") {
                    //let auxe = filtered[0]
                    acc = acc.filter((pet) => filtered[1] === pet[filtered[0]]);
                    return acc;
                  } else {
                    return acc;
                  }
                }, animals)
              )
            : setFilteredPets(animals);

          //setFilteredPets(res.data.rows.filter((place) => place.name))
          setIsLoading(false);
        } else {
          const res = await axios.get(`/pets?adopted=false`);
          setPets(res.data.rows.filter((place) => place.name));
          setFilteredPets(res.data.rows.filter((place) => place.name));
          setFilters({
            type: "",
            sex: "",
            size: "",
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    pet();
  }, [bounds]);

  return (
    <div>
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
