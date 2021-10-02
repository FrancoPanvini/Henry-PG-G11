import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Perfil() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [url, setUrl] = useState('');

  const initialUser = () => {
    axios
      .get(`users/${userId}`)
      .then(res => {
        console.log(res);
        setUser(res.data[0]);
        return res.data;
      })
      .then(res => setUrl(res.image))
      .catch(err => console.log(err));
  };
  useEffect(initialUser, [userId]);

  /* ↓ DELETE ↓ */
  if (user === undefined) {
    setUser({
      name: 'hardcodeado, comentar líneas 24-34',
      mail: 'mail@mail.com',
      phone: 123456789,
      direction: 'Calle falsa 123',
    });
  }
  if (url === undefined) {
    setUrl(
      'https://image.shutterstock.com/image-photo/closeup-young-beautiful-woman-taking-600w-402737050.jpg'
    );
  }
  /* ↑ DELETE ↑ */

  return (
    <div className="bg-gradient-to-r from-thirty to-fourty flex justify-center items-center h-screen85">
      <div className="text-center text-white text-lg p-8 w-2/5 min-w-max rounded-lg bg-gradient-to-l from-secondaryDark to-thirty border-2 border-white border-opacity-20">

        {/* ↓↓↓ DELETE ... o restructurar ↓↓↓ */}
        {user === undefined ? (
          <div> Loading... </div>
        ) : (
          <>
        {/* ↑↑↑ DELETE ... o restructurar ↑↑↑ */}

            <div className="flex gap-4 justify-center">
              <div className="bg-fourty h-32 w-32 rounded-lg overflow-hidden shadow-similBorderWhite">
                <img
                  src={url}
                  alt="foto"
                  className="z-0 h-full w-full object-cover"
                />
              </div>
              <div>
                <div>¡Hola {user.name}!</div>
                <div>Tu email es {user.mail}</div>
                <div>Tu teléfono es {user.phone}</div>
                <div>Tu dirección es {user.direction}</div>
              </div>
            </div>

            <br />

            {/* ↓ botones que para la primer demo estarán invisibles */}
            <div /* className="invisible" */ >
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark">Mis publicaciones</button>
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark">Cerrar sesión</button>
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark">Borrar mi cuenta</button>
            </div>

          {/* ↓ si se borra lo de la línea 41-45, borrar esto tmb  */}
          </>
          /* ↑ borrar */

        )}
      </div>
    </div>
  );
}

export default Perfil;
