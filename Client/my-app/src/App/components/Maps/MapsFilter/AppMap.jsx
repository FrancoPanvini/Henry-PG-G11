import { Grid } from "@material-ui/core";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router";

import Search from "./subcomp/Search/Search";
//import PetsDetail from "./subcomp/PetsDetail/PetsDetail";
import Map from "./subcomp/Map/Map";
import List from "./subcomp/List/List";

import axios from "axios";

const AppMap = () => {
  const [pets, setPets] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
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
  let location = useLocation();



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
    setFilteredItems(auxDeAux);
  };

  useEffect(() => {
    //setIsLoading(true);
    let currentLocation = location.pathname.split("/")[1];
    if(currentLocation==="adopciones"){
      currentLocation = "pets?adopted=false"
    }
    else if (currentLocation === "perdidos"){
      currentLocation="lostpets?lost=true"
    }
    else{
      currentLocation="users?type=r"
    }
    console.log(currentLocation)
    const pet = async () => {
      try {
        if (bounds?.latMax) {
          const res = await axios.get(
            `/${currentLocation}&lngMax=${bounds.lngMax}&lngMin=${bounds.lngMin}&latMax=${bounds.latMax}&latMin=${bounds.latMin}`
          );
          let animals = res.data.rows.filter((place) => place.name); //
          setPets(animals);

          let filterAux = Object.entries({ ...filters });
          filters
            ? setFilteredItems(
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
            : setFilteredItems(animals);

          
          setIsLoading(false);
        } else {
          const res = await axios.get(`/${currentLocation}`);
          setPets(res.data.rows.filter((place) => place.name));
          setFilteredItems(res.data.rows.filter((place) => place.name));
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
    // eslint-disable-next-line
  }, [bounds]);

  return (
    <div className='h-screen82'>
      <Search setCoordinates={setCoordinates} style={{height:"7vh"}}/>
      <Grid container spacing={3} style={{ width: "100%", height: "75vh" }}>
        <Grid item xs={12} md={3} style={{ height:"75vh"}}>
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
            items={filteredItems}
          />
        </Grid>
        <Grid item xs={12} md={9} style={{ marginTop: "5px", height: "77vh" }}>
          <Map
            onLoad={onMapLoad}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            items={filteredItems}
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
