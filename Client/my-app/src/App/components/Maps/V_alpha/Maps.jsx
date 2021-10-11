import React, { useState, useCallback, useRef, useEffect } from 'react';
import style from './style';
import style2 from './style2';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Geocode,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

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
  //styles: style,
  styles: style2,
  mapTypeControl: false,
  panControl: true,
  zoomControl: true,
  scaleControl: false,
  streetViewControl: false,
};
function Maps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY',
    libraries,
  });

  const [markers, setMarkers] = useState([
    {
      lat: 0,
      lng: 0,
      time: new Date(),
    },
  ]);
  const [selected, setSelected] = useState(null);
  const [magicRender, setMagicRender] = useState('zapato');
  const [placeName, setPlaceName] = useState([]);
  let geocoder;
  if (window.google?.maps) {
    geocoder = new window.google.maps.Geocoder();
  }

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
    await geocodeLatLng(geocoder, mapRef, lat, lng)
    setSelected(null);
    ;
  };

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
          window.alert('No results found');
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  };

  const mapRef = useRef();
  const markerRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onMarkerLoad = useCallback((marker) => {
    markerRef.current = marker;
  }, []);

  const ubication = useCallback(({ lat, lng }) => {
    mapRef.current.ubication({ lat, lng });
    mapRef.current.setZoom(14);
  },[]);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

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

  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    } else {
      renderAddress(place);
      fillInAddress(place);
    }
  });

  function fillInAddress(place) {
    const addressNameFormat = {
      street_number: 'short_name',
      route: 'long_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
    };

    const getAddressComp = function (type) {
      for (let component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    
    for (let component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== 'location') {
        document.getElementById(component).innerHTML =
          getAddressComp(component);
      }
    }
  }
  const renderAddress = (place) => {
    mapRef.current.setCenter(place.geometry.location);
    mapRef.current.setZoom(15);
    setMarkers([
      {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        time: new Date(),
      },
    ]);
    setSelected({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      time: new Date(),
    },);

  };

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
    console.log(markers)
    await geocodeLatLng(geocoder, mapRef, lat, lng)

  };

  /*   if (!'geolocation' in navigator) {
    let center = {
      lng: -74.08175,
      lat: 4.710989,
    };
    return alert(
      'Tu navegador no soporta el acceso a la ubicación. Intenta con otro'
    );
  }

  const onUbicacionConcedida = (ubicacion) => {
    
    center = {
      lng: ubicacion.coords.longitude,
      lat: ubicacion.coords.latitude,
    };
    setMagicRender('zapatofono');
  };

  const onErrorDeUbicacion = (err) => {
    console.log('Error obteniendo ubicación: ', err);
  };

  const opcionesDeSolicitud = {
    enableHighAccuracy: true, // Alta precisión
    maximumAge: 0, // No queremos caché
    timeout: 5000, // Esperar solo 5 segundos
  };
  // Solicitar
  if(counter == 0) {
    console.log(counter)
    navigator.geolocation.getCurrentPosition(
      onUbicacionConcedida,
      onErrorDeUbicacion,
      opcionesDeSolicitud
      );
     counter++ 
    } */
  return (
    <div className='mt-6'>
      <input
        geolocation={ubication}
        type='text'
        placeholder='Address'
        id='location'
        style={{ width: '100%', height: '10%' }}
      />
      {/* <h1 className='absolute mt-16 ml-4 z-10 m-0 p-0 font-bold bg-white'>
        Mascotas Perdidas{' '}
        <span role='img' aria-label='tent'>
          🐾
        </span>
      </h1> */}
      <GoogleMap
        key={magicRender}
        //geolocation={ubication}
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
          key={magicRender}
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
