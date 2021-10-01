import React, { useState } from 'react';
<<<<<<< HEAD
import { FaPaw } from "react-icons/fa"
/* import axios from 'axios'
import jwt from "jsonwebtoken" */
import { logInUsers } from '../redux/actions/index';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
=======
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';
>>>>>>> 887a9723ef08a52173111e06c88df08023c2b665

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [usuario, setUsuario] = useState({
    mail: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    contraseña: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault(e)
    dispatch(logInUsers(usuario))
    history.push("/")
  }

  /* const handleDisabled = () => {
    // controlo si e-mail es válido y contraseña es mayor de ¿8? caracteres, en cuyo caso devuelvo false
    if (usuario.mail.includes('@' && '.') && usuario.contraseña.length >= 8) {
      return false;
    }
    // caso contrario:
    return true;
  }; */

  const handleUsuario = e => {
    let newUser = {
      ...usuario,
      [e.target.name]: e.target.value,
    };
    setUsuario(newUser);
    setErrors(validate(newUser));
  };

  /* const handleLogIn = e => {
    console.log('a ver si funciona'); // ELIM ELIM ELIM
    e.preventDefault();
  }; */

  return (
    <div className="h-screen flex items-center justify-between bg-gradient-to-r from-thirty to-fourty">
      {/* DOS VERSIONES, para funcionar una debe estar comentada y la otra activada, porque una remplazaría a la otra  */}

      {/* ↓ Versión 1: "Coherente" con la foto de gatitos de Home ↓ */}
      {/* <div className="bg-cachorroWeb bg-center-bottomish bg-cover relative onboarding-transparency-right h-full w-1/4" />
      <div className="flex justify-center items-center w-3/4 z-10">
        <form className="flex flex-col mx-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50"> */}
      {/* ↑ FIN versión 1 */}

      {/* ↓ Versión 2: Foto dentro de un círculo ↓ */}
      <div className="w-1/2">
        <div className="bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-similBorderWhite floorShadowCircle" />
      </div>
      <div className="flex justify-center items-center w-1/2 z-10">
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col ml-12 mr-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50">
          {/* ↑ FIN versión 2 */}

          {/* <img
              src={process.env.PUBLIC_URL + '/cachorro.png'}
              alt="logo"
              className="mx-auto bg-fourty rounded-full w-20 h-20"
            /> */}

          <div className="mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full">
            <FaPaw className="text-white text-3xl" />
          </div>

          <br />
          <label className="text-white">
            E-mail:{' '}
            {errors.email && (
              <span title={errors.email}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            name="mail"
            value={usuario.mail}
            onChange={handleUsuario}
            className="rounded-md px-2"
          />
          <br />
          <label className="text-white">
            Contraseña:{' '}
            {errors.contraseña && (
              <span title={errors.contraseña}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleUsuario}
            className="rounded-md px-2"
          />
          <br />
          <button
            /* disabled={handleDisabled()} */
            type = 'submit'
            className="btn btn-nav bg-primary text-white border-yellow-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
