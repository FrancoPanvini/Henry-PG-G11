import React from 'react'
import { Link } from 'react-router-dom'
import CardPublicacion from '../CardsPefil/CardPublicacion'

function Publicaciones() {
  return (
    <div className="container mx-auto  flex flex-col">
      <div className="container mx-auto p-2 overflow-auto h-96"> 
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>
        <CardPublicacion/>

     

      </div>
        <div className="flex justify-center mt-8 h-auto bg-gray-200">
          <Link to="/adopciones/ofrecer" className="mx-auto">
            <button className="btn btn-lg bg-primary text-white">
              Ofrecer una mascota en adopción
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Publicaciones
