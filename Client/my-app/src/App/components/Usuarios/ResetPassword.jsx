import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { resetPassword } from '../../services/resetPassword';
import ErrorIconPulsing from '../ErrorIconPulsing';
import swal from 'sweetalert';

const Reset = () => {
  const [input, setInput] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const url = window.location.href;

  const validate = ({ password, confirmPassword }) => {
    let errors = {};
    if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!(confirmPassword === password)) {
      errors.confirmPassword = 'Las contraseñas deben coincidir';
    }
    return errors;
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
    setErrors(validate(newInput));
  };

  const handleDisabled = () => {
    if (input.password !== '' && Object.keys(errors).length === 0) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(input, url.slice(39).toString());
    swal({
      text: '¡Listo, tu contraseña fue actualizada! Ahora puedes iniciar sesión',
      icon: 'success',
      timer: 3000,
    })
    history.push('/login');
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='px-8 py-12 w-1/4 flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50'>
        <label className='text-white'>Nueva contraseña: <ErrorIconPulsing error={errors.password} color='primary' /></label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleOnChange}
          className='rounded-md px-1 mb-2'
        />
        <br />
        <label className='text-white'>
          Repetir contraseña: <ErrorIconPulsing error={errors.confirmPassword} color='primary' />
        </label>
        <input type='password' name='confirmPassword' onChange={handleOnChange} className='rounded-md px-1 mb-2' />
        <br />
        <button type='submit' disabled={handleDisabled()} className='btn btn-lg bg-primary text-white border-yellow-600 flex justify-center items-center'>
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default Reset;
