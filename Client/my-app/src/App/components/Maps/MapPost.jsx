import React, { useState, useCallback, useRef, useEffect } from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
  } from '@react-google-maps/api';
const libraries = ['places'];


const mapContainerStyle = {
  width: '50vh',
  height: '50vh',
};

let center = {
  lng: -74.08175,
  lat: 4.710989,
};

const options = {
    mapTypeControl: false,
    panControl: true,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
};

function Maps() {
    const [selected, setSelected] = useState(null);
    const [placeName, setPlaceName] = useState([]);
    const [random, setRandom] = useState(1);
    const [markers, setMarkers] = useState([{lat: 0,lng: 0,time: new Date()}]);

    //Sets refs
    const mapRef = useRef();
    const markerRef = useRef();
    console.log(mapRef)
    const onMarkerLoad = useCallback((marker) => {
      markerRef.current = marker;
    }, []);
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
      console.log(map)
      setRandom(3)
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY',
        libraries,
    });
    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';


    



  //Sets geocoding function
  let geocoder;
  if (window.google?.maps) {
      geocoder = new window.google.maps.Geocoder();
    }
  const geocodeLatLng = (geocoder, map, lat, lng) => {
    const latlng = {
      lat: lat,
      lng: lng,
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
         setPlaceName(prevState => [response.results[0].formatted_address]);
         console.log(response.results[0]);
         
        } else {
          window.alert('Clickea una calle pa');
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  };





  //Handles marker when clicking on map
  const handleOnChange = async(e) => {
    let lat = e.latLng.lat()
    let lng = e.latLng.lng()
    setMarkers([
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
    console.log(markers[0])
    await geocodeLatLng(geocoder, mapRef, lat, lng)
    setSelected(null);
    ;
  };

  //Handles marker while dragging
  const handleOnDrag = async(e) => {
    let lat = e.latLng.lat()
    let lng = e.latLng.lng()
    setMarkers([
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
    await geocodeLatLng(geocoder, mapRef, lat, lng)
    setSelected(1)

  };





  const componentForm = [
    'route',
    'street_number',
    'location',
    'administrative_area_level_2',
    'administrative_area_level_1',
    'country',
  ];

  const autocompleteInput = document.getElementById('location');
  const autocomplete = new window.google.maps.places.Autocomplete(
    autocompleteInput,
    {
      fields: ['address_components', 'geometry', 'name'],
      types: ['address'],
    }
  );
  

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    } else {
      renderAddress(place);
      fillInAddress(place);
    }
  });


  const fillInAddress = (place) => {
    const addressNameFormat = {
      street_number: 'short_name',
      route: 'long_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
    };

    const getAddressComp = (type) => {
        console.log(place)
      for (let component of place.address_components) {

        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    
    for (let component of componentForm) {
      if (component !== 'location') {
        document.getElementById(component).innerHTML =
          getAddressComp(component);
      }
    }
  }


  const renderAddress = async(place) => {
    mapRef.current.setCenter(place.geometry.location);
    mapRef.current.setZoom(15);
    setMarkers([
      {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        time: new Date(),
      },
    ]);
    await geocodeLatLng(geocoder, mapRef, place.geometry.location.lat(), place.geometry.location.lng())
    setSelected({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      time: new Date(),
    },);

  };

  const onInputClick = () => {
    /* setInputKey(2) */
    setRandom(2)
    document.getElementById("location").focus()

  }

  return (
    <div className='mt-6'>
      <input
      onClick={onInputClick}
        type='text'
        placeholder='Address'
        id='location'
        style={{ width: '100%', height: '15%' }}
      />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={handleOnChange}
        onLoad={onMapLoad}>
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            onLoad={onMarkerLoad}
            draggable={true}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/1084899.svg',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              /* mapRef.current.setCenter({lgn: markers[0].lng, lat:markers[0].lat}); */
              setSelected(marker);
            }}
            onDragStart={(e) => {
              setSelected(null);
            }}
            onDragEnd={handleOnDrag}
          />
        ))}

        {selected ? placeName.map((name) => (
          <InfoWindow
            position={{ lat: markers[0].lat, lng: markers[0].lng }}
            onCloseClick={() => {
              setSelected(null);
            }}>
            <div>
              <h2>Mascota ubicada en: {name}</h2>
              <div></div>
              <p>Publicada: {/* markers[0].time */}</p>
            </div>
          </InfoWindow>
        )) : null}
      </GoogleMap>
      <div id='street_number'></div>
      <div id='route'></div>
      <div id='location'></div>
      <div id='administrative_area_level_2'></div>
      <div id='administrative_area_level_1'></div>
      <div id='country'></div>
    </div>
  );
}

export default Maps;