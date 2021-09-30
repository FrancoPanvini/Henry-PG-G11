import React, { useState } from 'react';
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';

function Login() {
  const [usuario, setUsuario] = useState({
    email: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    contraseña: '',
  });

  const validate = ({ email, contraseña }) => {
    let errors = {};
    if (!email || !email.includes('@') || !email.includes('.')) {
      errors.email = 'Debe ser un email válido';
    }
    if (!contraseña || contraseña.length < 8) {
      errors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }
    return errors;
  };

  const handleUsuario = e => {
    let newUser = {
      ...usuario,
      [e.target.name]: e.target.value,
    };
    setUsuario(newUser);
    setErrors(validate(newUser));
  };

  // ↓ Desactivo el botón Sign-in si email o contraseña son inválidos
  const handleDisabled = () => {
    if (usuario.email.includes('@') && usuario.email.includes('.') && usuario.contraseña.length >= 8) {
      return false;
    }
    return true;
  };

  // ↓ Log in handler, completar !!!!!!!!!!!!!!!
  const handleLogIn = e => {
    console.log('Botón de Log-in activado y clickeado'); // ELIM ELIM ELIM !!!!!!!!!!!!
    e.preventDefault();
  };

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
        <form className="flex flex-col ml-12 mr-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50">
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
            name="email"
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
            name="contraseña"
            onChange={handleUsuario}
            className="rounded-md px-2"
          />
          <br />
          <button
            disabled={handleDisabled()}
            onClick={handleLogIn}
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
