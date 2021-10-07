import React, { useState } from 'react';
import { logInUsers } from '../../redux/actions/index';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';
/* import axios from 'axios'
import jwt from "jsonwebtoken" */

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [usuario, setUsuario] = useState({
    mail: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    mail: '',
    password: '',
  });

  // ↓ deshabilito el botón LogIn si aún no pusieron info válida
  const handleDisabled = () => {
    if (
      usuario.mail.includes('@') &&
      usuario.mail.includes('.') &&
      usuario.password.length >= 8
    ) {
      return false;
    }
    return true;
  };

  // ↓ detecto e informo al usuario si detecto errorres.
  const validate = ({ mail, password }) => {
    let errors = {};
    if (!mail || !mail.includes('@') || !mail.includes('.')) {
      errors.mail = 'Debe ser un email válido';
    }
    if (!password || password.length < 8) {
      errors.password = 'Debe tener al menos 8 caracteres';
    }
    return errors;
  };

  // ↓ actualizo el input
  const handleUsuario = (e) => {
    let nuevoInput = {
      ...usuario,
      [e.target.name]: e.target.value,
    };
    setUsuario(nuevoInput);
    setErrors(validate(nuevoInput));
  };

  // ↓ log in handler
  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(logInUsers(usuario));
    history.push('/');
  };

  return (
    <div className='h-screen90 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className='flex justify-center items-center w-3/5 z-10'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col m-8 mr-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-sign shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full'>
            <FaPaw className='text-white text-3xl' />
          </div>

          <br />
          <label className='text-white'>
            E-mail:{' '}
            {errors.mail && (
              <span title={errors.mail}>
                <FaExclamationCircle className='inline text-primary align-baseline' />
              </span>
            )}
          </label>
          <input
            type='text'
            name='mail'
            value={usuario.mail}
            onChange={handleUsuario}
            className='rounded-md px-2'
          />
          <br />
          <label className='text-white'>
            Contraseña:{' '}
            {errors.password && (
              <span title={errors.password}>
                <FaExclamationCircle className='inline text-primary align-baseline' />
              </span>
            )}
          </label>
          <input
            type='password'
            name='password'
            value={usuario.password} // ← creo que esto es innecesario.
            onChange={handleUsuario}
            className='rounded-md px-2 mb-4'
          />
          <br />
          <button
            disabled={handleDisabled()}
            type='submit'
            className='btn btn-lg bg-primary text-white border-yellow-600'>
            Log in
          </button>
          <br />
          <span className='text-center text-white hover:underline'>
            <Link to='/registro'>¿No tienes una cuenta? Registrate</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
