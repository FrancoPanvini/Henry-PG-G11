import React from 'react'
import Maps from './Maps'
import { useState } from 'react'

let coordinates = {lat: 0, long: 0}
function success(pos) {
  coordinates = {lat: pos.coords.latitude, long: pos.coords.longitude}
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
function ContainerMaps() {


  let start = navigator.geolocation.getCurrentPosition(success, error)
  const [location, setLocation] = useState(navigator.geolocation.getCurrentPosition(success))
  const handleOnChange = (e) => {
    setLocation(e.target.value)
  }
  return (
    <div>
      <input type="text" onChange={handleOnChange} ></input>
      <Maps coordinates={coordinates} placeName={location}/>
    </div>
  )
}
 ///prueba
export default ContainerMaps
