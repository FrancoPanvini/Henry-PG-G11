import React from 'react';
import { useSelector } from 'react-redux';
import ContainerCardAdopcion from './ContainerCardAdopcion';
import FiltersBar from './FiltersBar';
import { Link } from 'react-router-dom';


function Adopciones() {
    const isLogged = useSelector((state) => (state.isLogged))

    return (
    <div>
        <div className='grid grid-cols-7 place-items-center bg-gray-200'>
            <FiltersBar className='place-self-center'/>
            <ContainerCardAdopcion title="ADOPCIONES" className="col-span-6"/>
        </div>

        { isLogged && 
        <div className="flex justify-center py-12 bg-gray-200">
            <Link to="/adopciones/ofrecer" className="mx-auto" >
                <button className="btn btn-lg bg-primary text-white">
                    Ofrecer una mascota en adopción
                </button>
            </Link>
        </div>
        }
    </div>
    )
}

export default Adopciones
