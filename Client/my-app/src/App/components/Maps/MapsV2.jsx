/* import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FaDog } from 'react-icons/fa';
import axios from 'axios';
import {format} from 'timeago.js'
//import Modal from '../pop-up/modal'
import CardAdopcion from '../Cards/CardAdopcion';

export default function MapsV2() {
  const [ubication, setUbication] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '84vh',
    latitude: 4.710989,
    longitude: -74.08175,
    zoom:14,
  });

  useEffect(() => {
    const ubications = async () => {
      try {
        const res = await axios.get('/pets');
        setUbication(res.data.rows);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    ubications();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiZGF2aWRtZW5sb3AiLCJhIjoiY2t1Z2RmdWZ4MjJ3MjMwbWF2Z2Fwb2tmZiJ9.8YK2w11gWN9DUwXsG_tHjQ'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle='mapbox://styles/davidmenlop/ckugem2fr00vy18p8doohuwax'>
        {ubication.map((p) => (
          <div>
            <Marker
              latitude={p.lat} //p.lat
              longitude={p.lng} //p.long
              offsetLeft={-20}
              offsetTop={-10}>
              <div>
                <FaDog style={{ fontSize: viewport.zoom * 2, cursor:"pointer" }} onClick={()=> handleMarkerClick(p.id)} />
              </div>
            </Marker>
            {p.id === currentPlaceId &&
           <Popup
              latitude={p.lat} //p.lat
              longitude={p.lng} //p.long
              closeButton={true}
              closeOnClick={false}
              onClose={()=>setCurrentPlaceId(null)}
              anchor='left'
              className='z-10'> 
                <CardAdopcion  
              
                photo={
                      p.petPic
                        ? p.petPic
                        : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                    }
                    name={p.name}
                    age={p.age}
                    size={p.size}
                    sex={p.sex}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                    description={p.description}/>
               </Popup> 
            }
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
} */



import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaDog } from 'react-icons/fa';
import axios from 'axios';
/* import {format} from 'timeago.js' */
import CardAdopcion from '../Cards/CardAdopcion';
//import Modal from '../pop-up/modal'

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
  } from '@react-google-maps/api';
const libraries = ['places'];








const mapContainerStyle = {
  width: '90vw',
  height: '90vh',
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
    const [ubication, setUbication] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    /* const isLogged = useSelector((state) => state.isLogged); */
    const [random, setRandom] = useState(1);

      useEffect(() => {
        const ubications = async () => {
          try {
            const res = await axios.get('/pets');
            setUbication(res.data.rows);
           
          } catch (err) {
            console.log(err);
          }
        };
        ubications();
      }, []);


    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
      setRandom(3)
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY',
        libraries,
    });
    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';


    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id)
        setRandom(9)
    }



  

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
    }
  });
  const renderAddress = async(place) => {
    mapRef.current.setCenter(place.geometry.location);
    mapRef.current.setZoom(15);
  };
  const onInputClick = () => {  
    setRandom(2)
  }



  const buttonOnClick = () => {
    let bounds = mapRef.current.getBounds()
    console.log(bounds)
  }



  return (
    <div className=' grid justify-items-center'>
      <input
      onClick={onInputClick}
        type='text'
        placeholder='Address'
        id='location'
        className='border-2 border-black rounded w-80 h-10 grid justify-items-center absolute mt-2.5 z-10'
      />
      <button onClick={()=>buttonOnClick}></button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        gestureHandling= {"greedy"}
        onLoad={onMapLoad}>

        {ubication.map((p) => (
          <div>
            <Marker
              position={{ lat: p.lat, lng: p.lng }}
              key={`${p.lat}-${p.lng}`}
              draggable={true}
              onClick={()=>handleMarkerClick(p.id)}
              icon={{
                url: '/1084899.svg',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}>
              
            </Marker>

            {p.id === currentPlaceId &&


                <InfoWindow
                    position={{ lat: p.lat, lng: p.lng }}
                    onCloseClick={() => {
                        setCurrentPlaceId(null);
                    }}
                    
                    className='z-10'>
                    <CardAdopcion  
                    id={p.id}
                    photo={
                        p.petPic
                        ? p.petPic
                        : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                        }
                    name={p.name}
                    age={p.age}
                    size={p.size}
                    sex={p.sex}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                    description={p.description}/>
                </InfoWindow> 
            }
              </div>
         ))}
     </GoogleMap>
    </div>
      );
}





export default Maps;