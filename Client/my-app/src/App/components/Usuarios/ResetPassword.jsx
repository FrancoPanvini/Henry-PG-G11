import React, { useState } from 'react'
import { useHistory } from "react-router";
import { resetPassword } from '../../services/resetPassword';

const Reset = () => {
const [input, setInput] = useState({password: ''})
const history = useHistory()
const url = window.location.href
console.log(url.slice(34).toString())

const handleOnChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
  };

  const handleSubmit = (e) => {
      e.preventDefault()
    resetPassword(input, url.slice(34).toString());
    history.push("/login/reset");
  };

  return(
      <div className="h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty">
      
      <form onSubmit={e => handleSubmit(e)} className='p-4 w-2/5 flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50' >
        <label className="w-2/5">Nueva contraseña: </label>
        <input
          type="password"
          id="password"
          name="password"
          // value={input.phone}
          onChange={handleOnChange}
          className="rounded-md px-1 mb-2 w-2/5"
        />
        <button type='submit'>Submit</button>
      </form>

      </div>
  )
}



export default Reset