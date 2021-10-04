import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCities, getCountries, getLostPetsHome, getPetsAdopHome, getProvinces, getShelters } from '../redux/actions'
import ContenedorCard from './ContenedorCard'
import Onboarding from './Onboarding'
import Things from './Things'


function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces()); 
    dispatch(getCities());  
    dispatch(getPetsAdopHome());
    dispatch(getLostPetsHome());
    dispatch(getShelters())
    }, [dispatch])

    return (
        <div className="">
            <Onboarding/>
            <Things/>
            <ContenedorCard title='ADOPCION' className=" bg-gradient-to-r from-thirty to-fourty text-white"/>
            <ContenedorCard title='EXTRAVIADOS' className=" bg-gray-200 text-primary"/>
            <ContenedorCard title='REFUGIOS' className=" bg-gradient-to-r from-thirty to-fourty text-white"/>
        </div>
    )
}

export default Home