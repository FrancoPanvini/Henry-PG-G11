import React from 'react'
import ContenedorCard from './ContenedorCard'
import Onboarding from './Onboarding'
//import './Card.module.css'

function Home() {
    return (
        <div>
            <Onboarding/>
            <br />
            <ContenedorCard title='ADOPCION'/>
            <br />
            <ContenedorCard title='EXTRAVIADOS'/>
            <br />
            <ContenedorCard title='REFUGIOS'/>
        </div>
    )
}

export default Home
