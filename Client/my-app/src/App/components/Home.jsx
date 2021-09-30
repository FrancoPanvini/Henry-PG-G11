import React from 'react'
import ContenedorCard from './ContenedorCard'
import Onboarding from './Onboarding'
import Things from './Things'
//import './Card.module.css'

function Home() {
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