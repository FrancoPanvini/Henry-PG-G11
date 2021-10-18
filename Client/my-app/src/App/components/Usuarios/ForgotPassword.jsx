import React, { useState } from "react";
import { useHistory } from "react-router";
import { forgotPassword } from "../../services/forgotPassword";

const Forgot = () => {
  const [input, setInput] = useState({ mail: "" });
  const history = useHistory();

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
    forgotPassword(input);
    history.push("/login/reset");
  };

  return (
    <div className="h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty">
      
      <form onSubmit={e => handleSubmit(e)} className='p-4 w-2/5 flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50' >
        <label className="w-2/5">Email: </label>
        <input
          type="text"
          id="mail"
          name="mail"
          // value={input.phone}
          onChange={handleOnChange}
          className="rounded-md px-1 mb-2 w-2/5"
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Forgot;
