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
            <ContenedorCard title='ADOPCION' className=" bg-thirty text-white"/>
            <ContenedorCard title='EXTRAVIADOS' className=" bg-secondary text-primary"/>
            <ContenedorCard title='REFUGIOS' className=" bg-thirty text-white"/>
        </div>
    )
}

export default Home