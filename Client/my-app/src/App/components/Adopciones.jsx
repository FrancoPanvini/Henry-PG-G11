import React from 'react'
import ContainerCardAdopcion from './ContainerCardAdopcion'
import FiltersBar from './FiltersBar'


function Adopciones() {
    return (
        <div className='flex justify-between items-start bg-gray-200'>
            <FiltersBar/>
            <ContainerCardAdopcion title="Adopciones"/>
        </div>
    )
}

export default Adopciones
