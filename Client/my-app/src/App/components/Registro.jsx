import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPaw, FaExclamationCircle } from 'react-icons/fa';
import { postUsers } from '../redux/actions/index';
/* import { useHistory } from "react-router-dom"; */

function Registro() {
  const dispatch = useDispatch();
  /* const history = useHistory(); */
  const [input, setInput] = useState({
    name: '',
    mail: '',
    phone: '',
    direction: '',
    password: '',
    /* CityId: '', */
  });
  const [errors, setErrors] = useState({});

  const validate = input => {
    let errors = {};
    if (!input.name) {
      errors.name = 'Ingresa tu nombre y apellido';
    }
    if (!input.mail || !input.mail.includes('@') || !input.mail.includes('.')) {
      errors.mail = 'Debe ser un email válido';
    }
    if (!input.phone) {
      errors.phone = 'Ingresa tu número de contacto';
    }
    if (!input.direction) {
      errors.direction = 'Ingresa tu domicilio';
    }
    if (!input.password) {
      errors.password = 'Debes ingresar una contraseña';
    }
    return errors;
  };

  const handleOnChange = e => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
    setErrors(validate(newInput));
  };

  const handleDisabled = () => {
    if (input.name !== '' && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  }

  const handleSubmit = e => {
    console.log(input); // DELETE DELETE DELETE
    e.preventDefault();
    dispatch(postUsers(input));
    setInput({
      name: '',
      mail: '',
      phone: '',
      direction: '',
      password: '',
    });
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
        <form
          onSubmit={e => handleSubmit(e)}
          className="flex flex-col ml-12 mr-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-sign shadow-xl border-2 border-fourty border-opacity-50"
        >
          <div className="mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full">
            <FaPaw className="text-white text-3xl" />
          </div>
          <br />

          <label className="text-white">
            Nombre y apellido:{' '}
            {errors.name && (
              <span title={errors.name}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            E-mail:{' '}
            {errors.mail && (
              <span title={errors.mail}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={input.mail}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Teléfono:{' '}
            {errors.phone && (
              <span title={errors.phone}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={input.phone}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Dirección:{' '}
            {errors.direction && (
              <span title={errors.direction}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="direction"
            name="direction"
            value={input.direction}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Contraseña:{' '}
            {errors.password && (
              <span title={errors.password}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          {/* <label>Ciudad</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          {/* <label>hOlaaa</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          <button
            type="submit"
            disabled={handleDisabled()}
            className="btn btn-lg bg-primary text-white border-yellow-600"
          >
            Registrate
          </button>
          <br />
          <span className="text-center text-white hover:underline">
            <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Registro;
