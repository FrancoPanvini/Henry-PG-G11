import React from 'react';
import { useSelector } from 'react-redux';
import ContainerCardAdopcion from './ContainerCardAdopcion';
import FiltersBar from './FiltersBar';
import { Link } from 'react-router-dom';


function Adopciones() {
    const isLogged = useSelector((state) => state.isLogged);

    return (
    <div>
        <div className='flex justify-between items-center bg-gray-200'>
            <FiltersBar/>
            <ContainerCardAdopcion title="ADOPCIONES"/>
        </div>
        {isLogged?(<div className="flex justify-center py-12 bg-gray-200">
            <Link to="/adopciones/ofrecer" className="mx-auto" >
                <button className="btn btn-lg bg-thirty text-white border-fourty">
                    Ofrecer una mascota en adopción
                </button>
            </Link>
        </div>) : null}
        
    </div>
    )
}

export default Adopciones
