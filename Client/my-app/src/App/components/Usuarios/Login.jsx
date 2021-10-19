import React, { useState } from 'react';
import { logInUsers } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPaw } from 'react-icons/fa';
import ErrorIconPulsing from '../ErrorIconPulsing';

function Login() {
  const dispatch = useDispatch();
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
    if (usuario.mail.includes('@') && usuario.mail.includes('.') && usuario.password.length >= 8) {
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
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='ml-auto mr-12 bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className='flex justify-center items-center w-3/5 z-10'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col ml-12 mr-auto bg-thirty xl:py-8 2xl:py-12 px-8 rounded-lg w-2/5 min-w-sign shadow-xl border-2 border-fourty border-opacity-50'>
          <div className='mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full'>
            <FaPaw className='text-white text-3xl' />
          </div>
          <br />

          <a
            href='http://adogtameapi.herokuapp.com/auth/google'
            title='Inicia sesión usando tu cuenta de Google'
            className='btn btn-lg bg-white text-gray-600 border-gray-400 flex justify-center items-center'>
            <img src='https://freesvg.org/img/1534129544.png' alt='Log in con Google' className='h-7 w-7 inline mr-4' />
            Log in
          </a>
          <br className='' />
          <label className='pt-4 text-white border-t-2 border-thirtyDark border-opacity-50'>
            E-mail: <ErrorIconPulsing error={errors.mail} color='primary' />
          </label>
          <input type='text' name='mail' value={usuario.mail} onChange={handleUsuario} className='rounded-md px-2' />
          <br />
          <label className='text-white'>
            Contraseña: <ErrorIconPulsing error={errors.password} color='primary' />
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
            className='btn btn-lg bg-primary text-white border-yellow-600 flex justify-center items-center'>
            <FaPaw className='text-3xl inline mr-4' /> Log in
          </button>
          <br />
          <span className='text-center mb-2 text-white hover:underline'>
            <Link to='/registro'>¿No tienes una cuenta? Registrate</Link>
          </span>
          <span className='text-center text-white hover:underline'>
            <Link to='/login/forgot'>¿Olvidaste tu contraseña?</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
