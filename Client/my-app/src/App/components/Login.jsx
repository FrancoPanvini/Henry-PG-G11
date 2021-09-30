import React, { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState({
    email: '',
    contraseña: '',
  });

  const handleDisabled = () => {
    // controlo si e-mail es válido y contraseña es mayor de ¿8? caracteres, en cuyo caso devuelvo false
    if (usuario.email.includes('@' && '.') && usuario.contraseña.length >= 8) {
      return false;
    }
    // caso contrario:
    return true;
  };

  const handleUsuario = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = e => {
    console.log('a ver si funciona'); // ELIM ELIM ELIM
    e.preventDefault();
  };

  return (
    <div className="h-screen85 flex items-center justify-between bg-gradient-to-r from-thirty to-fourty">
      {/* DOS VERSIONES, para funcionar una debe estar comentada y la otra activada, porque una remplazaría a la otra  */}

      {/* ↓ Versión 1: "Coherente" con la foto de gatitos de Home ↓ */}
      <div className="bg-cachorroWeb bg-center-bottomish bg-cover relative onboarding-transparency-right h-full w-1/4" />
      <div className="flex justify-center items-center w-3/4 z-10">
        <form className="flex flex-col mx-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50">
      {/* ↑ FIN versión 1 */}

      {/* ↓ Versión 2: Foto dentro de un círculo ↓ */}
      {/* <div className="w-1/2">
        <div className="bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-xl border-2 border-opacity-25 border-white" />
      </div>
      <div className="flex justify-center items-center w-1/2 z-10">
        <form className="flex flex-col ml-12 mr-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50"> */}
          {/* ↑ FIN versión 2 */}

          <img
            src=""
            alt="logo"
            className="mx-auto bg-fourty rounded-full w-20 h-20"
          />
          <br />
          <label className="text-white">E-mail:</label>
          <input
            type="text"
            name="email"
            onChange={handleUsuario}
            className="rounded-md px-2"
          />
          <br />
          <label className="text-white">Contraseña:</label>
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
