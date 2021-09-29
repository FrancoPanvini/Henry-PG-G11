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
            <ContenedorCard title='ADOPCION' className="bg-gradient-to-r from-thirty to-fourty path text-white"/>
            <ContenedorCard title='EXTRAVIADOS' className="path"/>
            <ContenedorCard title='REFUGIOS' className="bg-gradient-to-r from-thirty to-fourty path2 text-white"/>
        </div>
    )
}

export default Home