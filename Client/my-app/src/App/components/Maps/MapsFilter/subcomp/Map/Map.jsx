import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

import useStyles from "./styles";
/* import CardAdopcion from "../../../../Cards/CardAdopcion"; */


const Map = ({ setCoordinates, setBounds, coordinates, pets, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

//bounds.ne.lat  latMax lngMin
//bounds.sw.lat  latMin lngMax

  return (
    <div className={classes.mapContainer}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY" }}
        /* defaultCenter={coordinates} */
        center={coordinates}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{gestureHandling: "greedy", clickableIcons: false}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ latMin: e.bounds.sw.lat, latMax: e.bounds.ne.lat, lngMin: e.bounds.sw.lng, lngMax: e.bounds.ne.lng  });
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {pets?.map((pet, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(pet.lat)}
            lng={Number(pet.lng)}
            key={i}
          >
            
         { !isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
                 /*  <CardAdopcion
                  photo={pet.petPic ? pet.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                  name={pet.name}
                  age={pet.age}
                  size={pet.size}
                  sex={pet.sex}
                  country={pet.country}
                  province={pet.province}
                  city={pet.city}
                  id={pet.id}/>  */
              <Paper elevation={3} className={classes.paper}>
                   <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                      {pet.name}
                  </Typography>
                  <img
                  alt=""
                  className={classes.pointer}
                  src={pet.petPic ? pet.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                  //alt={pet.name}
                  /> 
              </Paper> 
            )} 
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
