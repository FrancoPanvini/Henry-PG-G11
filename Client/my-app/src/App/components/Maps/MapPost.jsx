import React, { useState, useCallback, useRef } from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
const libraries = ['places'];

//Sets Map settings
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
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
  clickableIcons: false,
};

function Maps({ onLocationChange }) {
  const [selected, setSelected] = useState(null);
  const [placeName, setPlaceName] = useState([]);
  const [, setRandom] = useState(1);
  const [markers, setMarkers] = useState([{ lat: 0, lng: 0, time: new Date() }]);

  //Sets refs
  const mapRef = useRef();
  const markerRef = useRef();
  const onMarkerLoad = useCallback(marker => {
    markerRef.current = marker;
  }, []);
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
    setRandom(3);
  }, []);

  const { isLoaded, loadError } = useLoadScript({

    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,

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
      .then(response => {
        if (response.results[0]) {
          fillInAddress(response.results[0]);
          document.getElementById('lat').innerHTML = lat;
          document.getElementById('lng').innerHTML = lng;
          setPlaceName(prevState => [response.results[0].formatted_address]);
        } else {
          window.alert('Clickea una calle pa');
        }
      })
      .catch(e => console.log('Geocoder failed due to: ' + e));
  };

  //Handles marker when clicking on map
  const handleOnChange = async e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarkers([
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
    await geocodeLatLng(geocoder, mapRef, lat, lng);

    setSelected(null);
  };

  //Handles marker while dragging
  const handleOnDrag = async e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarkers([
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
    await geocodeLatLng(geocoder, mapRef, lat, lng);
    setSelected(1);
  };

  //Sets what data to store from geocoder
  const componentForm = ['route', 'street_number', 'administrative_area_level_2', 'administrative_area_level_1', 'country'];

  //Sets Autocomplete
  const autocompleteInput = document.getElementById('location');
  const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput, {
    fields: ['address_components', 'geometry', 'name'],
    types: ['address'],
  });

  //Event listener when user selects a location
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    } else {
      renderAddress(place);
    }
  });

  //Fills the divs
  const fillInAddress = place => {
    const addressNameFormat = {
      street_number: 'short_name',
      route: 'long_name',
      administrative_area_level_2: 'short_name',
      locality: 'short_name',
      sublocality: 'short_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
    };
    //Iterates for each hierarchy of locations data (country,province,city,locality,street,number)
    const getAddressComp = (type, i) => {
      for (let component of place.address_components) {
        if (component.types[i] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    //Iterates again trying to find the hierarchy searched (set at line 115)
    for (let component of componentForm) {
      if (component !== 'location') {
        if (component !== 'administrative_area_level_2') {
          document.getElementById(component).innerHTML = getAddressComp(component, 0);
        } else {
          if (getAddressComp(component, 0) !== '') {
            document.getElementById(component).innerHTML = getAddressComp(component, 0);
          } else {
            if (getAddressComp('sublocality', 1) !== '') {
              document.getElementById(component).innerHTML = getAddressComp('sublocality', 1);
            } else {
              document.getElementById(component).innerHTML = getAddressComp('locality', 0);
            }
          }
        }
      }
    }
    document.getElementById('location').value = '';
  };

  //Renders mapCenter and marker at gicen position
  const renderAddress = async place => {
    mapRef.current.setCenter(place.geometry.location);
    mapRef.current.setZoom(15);
    setMarkers([
      {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        time: new Date(),
      },
    ]);
    await geocodeLatLng(geocoder, mapRef, place.geometry.location.lat(), place.geometry.location.lng());
    setSelected({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      time: new Date(),
    });
  };

  //Rerenders on click to activate the autocomplete
  const onInputClick = () => {
    setRandom(2);
  };

  return (
    <div className='relative grid justify-items-center h-full'>
      <input onClick={onInputClick} type='text' placeholder='Buscar dirección...' id='location' className='border-2 border-black rounded w-3/5 h-10 grid justify-items-center absolute mt-2.5 z-10' />

      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={center} options={options} onClick={handleOnChange} onLoad={onMapLoad}>
        {markers.map(marker => (
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
              setSelected(marker);
            }}
            onDragStart={e => {
              setSelected(null);
            }}
            onDragEnd={handleOnDrag}
          />
        ))}

        {selected
          ? placeName.map((name, index) => (
              <InfoWindow
                key={index}
                position={{ lat: markers[0].lat, lng: markers[0].lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>Dirección: {name}</h2>
                </div>
              </InfoWindow>
            ))
          : null}
      </GoogleMap>
      {!document.getElementById('street_number') ? null : document.getElementById('street_number').innerHTML ? (
        <button type='button' onClick={() => onLocationChange()} className='btn bg-primary text-white border-yellow-600 z-10 absolute bottom-4 px-2 py-1 rounded-lg'>
          Confirmar
        </button>
      ) : null}
      <div style={{ display: 'none' }}>
        <div id='route' className='font-bold text-white rounded-md px-1 mb-2'></div>
        <div id='street_number' className='font-bold text-white rounded-md px-1 mb-2'></div>
      </div>

      <div style={{ display: 'none' }}>
        <div id='administrative_area_level_2' className='font-bold text-white rounded-md px-1 mb-2'></div>
        <span className='font-bold text-white rounded-md px-1 mb-2'>-</span>
        <div id='administrative_area_level_1' className='font-bold text-white rounded-md px-1 mb-2'></div>
        <span className='font-bold text-white rounded-md px-1 mb-2'>-</span>
        <div id='country' className='font-bold text-white rounded-md px-1 mb-2'></div>
      </div>
      <div style={{ display: 'none' }} id='lat'></div>
      <div style={{ display: 'none' }} id='lng'></div>
    </div>
  );
}

export default Maps;
