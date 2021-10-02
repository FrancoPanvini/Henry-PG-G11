import React from 'react'
import ContainerCardAdopcion from './ContainerCardAdopcion'
import FiltersBar from './FiltersBar'

function Refugios() {
    return (
        <div className='flex justify-between items-center bg-gray-200'>
            <FiltersBar/>
            <ContainerCardAdopcion title="Refugios"/>
        </div>
    )
}

export default Refugios
