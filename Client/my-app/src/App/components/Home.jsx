import React from 'react'
import ContenedorCard from './ContenedorCard'
//import './Card.module.css'

function Home() {
    return (
        <div>
            <ContenedorCard title='ADOPCION'/>
            <br />
            <ContenedorCard title='EXTRAVIADOS'/>
            <br />
            <ContenedorCard title='REFUGIOS'/>
        </div>
    )
}

export default Home
