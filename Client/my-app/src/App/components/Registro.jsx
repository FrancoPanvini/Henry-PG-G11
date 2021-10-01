import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { postUsers } from '../redux/actions/index'
/* import { useHistory } from "react-router-dom"; */

function Registro() {

    const dispatch = useDispatch()
    /* const history = useHistory(); */
    const [input, setInput] = useState({
        name: '',
        mail: '',
        phone: '',
        direction: '',
        password: '',
        /* CityId: '', */

    })
    const handleOnChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log(input)
        e.preventDefault()
        dispatch(postUsers(input))
        setInput({
            name: '',
        mail: '',
        phone: '',
        direction: '',
        password: '',
        })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Nombre y apellido</label>
                <input type='text'  id='name' placeholder='Name' name='name' value={input.name} onChange={(e) => handleOnChange(e)} />
                <label>mail</label>
                <input type='text'  id='mail' placeholder='mail' name='mail' value={input.mail} onChange={(e) => handleOnChange(e)} />
                <label>phone</label>
                <input type='text'  id='phone' placeholder='phone' name='phone' value={input.phone} onChange={(e) => handleOnChange(e)} />
                <label>direction</label>
                <input type='text'  id='direction' placeholder='direction' name='direction' value={input.direction} onChange={(e) => handleOnChange(e)} />
                <label>password</label>
                <input type='password'  id='password' placeholder='password' name='password' value={input.password} onChange={(e) => handleOnChange(e)} />
                {/* <label>Ciudad</label>
                <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
                {/* <label>hOlaaa</label>
                <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
                <button type = 'submit'>Registrate</button>
            </form>
        </div>
    )
}

export default Registro
