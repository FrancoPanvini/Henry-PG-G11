import React from 'react'
import ContenedorCard from './ContenedorCard'
import Onboarding from './Onboarding'
//import './Card.module.css'

function Home() {
    return (
        <div>
            <Onboarding/>
            <ContenedorCard title='ADOPCION' className=""/>
            <ContenedorCard title='EXTRAVIADOS' className='bg-secondary'/>
            <ContenedorCard title='REFUGIOS'/>
        </div>
    )
}

export default Home
