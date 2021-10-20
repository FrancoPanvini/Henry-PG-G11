import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/forgotPassword';
import { FaPaw } from 'react-icons/fa';
import swal from 'sweetalert';

const Forgot = () => {
  const [input, setInput] = useState({ mail: '' });
  const history = useHistory();

  const handleOnChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
  };

  const handleDisabled = () => {
    if (input.mail.includes('@') && input.mail.includes('.')) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(input);
    swal({
      text: 'Cambio solicitado. Revisa la bandeja de entrada de tu correo.',
      icon: 'success',
      timer: 4000,
    });
    history.push('/login');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='ml-auto mr-12 bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className='flex justify-center items-center w-3/5 z-10'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='px-8 py-12 w-2/5 ml-12 mr-auto flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full'>
            <FaPaw className='text-white text-3xl' />
          </div>
          <br />
          <label className='text-white'>Email: </label>
          <input
            type='text'
            id='mail'
            name='mail'
            // value={input.phone}
            onChange={handleOnChange}
            className='rounded-md px-1 mb-4'
          />
          <br />
          <button
            type='submit'
            disabled={handleDisabled()}
            className={`${
              handleDisabled() ? 'opacity-50 cursor-default border-b-2 border-transparent' : 'btn'
            } btn-lg bg-primary text-white border-yellow-600 flex justify-center items-center`}>
            Solicitar nueva contraseña
          </button>
          <br />
          <span className='text-center text-white hover:underline'>
            <Link to='/login'>Volver</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
