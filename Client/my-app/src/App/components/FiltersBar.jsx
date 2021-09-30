import React from 'react'
import { useLocation } from 'react-router'

function FiltersBar() {

    let location = useLocation();

    return (

        location.pathname === "/adopciones" ? ( <div className="border p-8 mt-32 ml-4 bg-white rounded-sm shadow-inner">
        <div className="p-4">
            Especie
        </div>
        <div className="p-4">
            Ubicacion
        </div>
        <div className="p-4">
            Edad
        </div>
        <div className="p-4">
            Tamaño
        </div>
        <div className="p-4">
            Sexo
        </div>
        <div className="p-4">
            Fecha de publicacion
        </div>
        </div>) : location.pathname === "/perdidos" ? ( <div className="p-8 mt-32 ml-4 bg-white">
        <div className="p-4">
            Especie
        </div>
        <div className="p-4">
            Ubicacion
        </div>
        <div className="p-4">
            Sexo
        </div>
        <div className="p-4">
            Fecha de publicacion
        </div>
        </div>) : ( <div className="p-8 mt-32 ml-4 bg-white">
        <div className="p-4">
            Especie
        </div>
        <div className="p-4">
            Ubicacion
        </div>
    
        </div>
        )

       
       
    )
}

export default FiltersBar
