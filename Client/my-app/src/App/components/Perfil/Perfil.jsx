import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPaw } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import {logOutUser} from '../../redux/actions/index'

function Perfil() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);

  const initialUser = () => {
    axios
      .get(`users/${userId}`)
      .then(res => {
        setUser(res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  };
  useEffect(initialUser, [userId]);

  const handleLogOut = () => {
    dispatch(logOutUser())
    window.location = '/'
  }

  return (
    <div className="bg-gradient-to-r from-thirty to-fourty flex justify-center items-center h-screen85">
      <div className="text-center text-white text-lg p-8 w-2/5 min-w-max rounded-lg bg-gradient-to-l from-secondaryDark to-thirty border-2 border-white border-opacity-20">
        {/* ↓↓↓ DELETE ... o restructurar ↓↓↓ */}
        {user === null ? (
          <> Loading... </>
        ) : (
          <>
        {/* ↑↑↑ DELETE ... o restructurar ↑↑↑ */}

            <div className="flex justify-center items-center">
              {user.photo === null ? (
                <div className="bg-fourty w-20 h-20 rounded-full mr-8 flex justify-center items-center ">
                  <FaPaw className="text-white text-3xl" />
                </div>
              ) : (
                <div className="bg-fourty h-32 w-32 rounded-lg mr-8 overflow-hidden shadow-similBorderWhite">
                  <img
                    src={user.photo}
                    alt="foto"
                    className="z-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <div>
                <div>¡Hola {user.name}!</div>
                <div>Tu email es {user.mail}</div>
                <div>Tu teléfono es {user.phone}</div>
                <div>Tu dirección es {user.direction}</div>
              </div>
            </div>

            <br />

            {/* ↓ botones que para la primer demo estarán invisibles */}
            <div /* className="invisible" */>
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark">
                Mis publicaciones
              </button>
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark" onClick={handleLogOut}>
                Cerrar sesión
              </button>
              <button className="btn btn-nav mx-2 px-4 bg-primaryDark">
                Borrar mi cuenta
              </button>
            </div>

        {/* ↓ si se borra lo de la línea 26-31, borrar esto tmb  */}
          </>
        )}
        {/* ↑ borrar */}

      </div>
    </div>
  );
}

export default Perfil;
