import React from 'react';
import ContainerCardAdopcion from './ContainerCardAdopcion';
import FiltersBar from './FiltersBar';
import { Link } from 'react-router-dom';


function Adopciones() {
    return (
    <div>
        <div className='grid grid-cols-7 place-items-center bg-gray-200'>
            <FiltersBar className='place-self-center'/>
            <ContainerCardAdopcion title="ADOPCIONES" className="col-span-6"/>
        </div>
        <div className="flex justify-center py-12 bg-gray-200">
            <Link to="/adopciones/ofrecer" className="mx-auto" >
                <button className="btn btn-lg bg-primary text-white">
                    Ofrecer una mascota en adopción
                </button>
            </Link>
        </div>
    </div>
    )
}

export default Adopciones
