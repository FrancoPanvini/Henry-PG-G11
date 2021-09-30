import React from 'react'
import ContainerCardAdopcion from './ContainerCardAdopcion'
import FiltersBar from './FiltersBar'


function Perdidos() {
    return (
        <div className='flex justify-between items-start bg-gray-200'>
            <FiltersBar/>
            <ContainerCardAdopcion title="Perdidos"/>
        </div>
    )
}

export default Perdidos
