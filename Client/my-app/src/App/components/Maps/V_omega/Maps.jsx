import React from 'react'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
//import {formatRelative} from 'date-fns' parametrizar fechas.

export default function Maps() {

const {} = useLoadScript({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})

  return (
    <div>
      <h1>Maps</h1>
    
    </div>
  )
}
