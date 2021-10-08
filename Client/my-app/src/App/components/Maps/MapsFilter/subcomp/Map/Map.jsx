import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles'

const Map = ({setCoordinates, setBounds, coordinates}) => {

const classes = useStyles();
const isMobile = useMediaQuery('(minwidth: 600px)')


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
            bootstrapURLKeys={{key:'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY'}}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={12}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
                console.log(e)
                setCoordinates({ lat: e.center.lat, lng: e.center.lng})
                setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
            }}
            onChildClick={''}
            ></GoogleMapReact>
        </div>
    )
}

export default Map
