import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

function Perfil() {
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({})
    const [url, setUrl] = useState('')

    const initialUser = () => {
        axios.get(`users/${userId}`).then(res =>  {
            console.log(res.data)
            setUser(res.data[0])
            return res.data
        })
        .then(res => setUrl(res.image))
        .catch(err => console.log(err))
    }
    useEffect( initialUser, [userId] )

    return (
        <div>
            <h1>hola {user.mail}</h1>
        </div>
    )
}

export default Perfil
