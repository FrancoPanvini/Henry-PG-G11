import React from 'react'
import ContainerCardAdopcion from './ContainerCardAdopcion'
import FiltersBar from './FiltersBar'


function Perdidos() {
    return (
        <div className='grid grid-cols-7 place-items-center bg-gray-200'>
           <FiltersBar className='place-self-center'/>
            <ContainerCardAdopcion title="PERDIDOS" className="col-span-6"/>
        </div>
    )
}

export default Perdidos
