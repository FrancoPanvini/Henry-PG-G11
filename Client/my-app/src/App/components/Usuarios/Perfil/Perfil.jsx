import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPaw } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../redux/actions';
import SideBar from './SideBar';
import ContenedorVista from './VistasPerfil/ContenedorVista';

function Perfil() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);

  const initialUser = () => {
    axios
      .get(`users/${userId}`)
      .then((res) => {
        setUser(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };
  useEffect(initialUser, [userId]);

  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location = '/';
  };

  return(
    <div className="flex bg-gradient-to-r from-thirty to-fourty h-screen85">
      <SideBar className="w-1/4"/>
      <ContenedorVista className="w-3/4"/>
    </div>
  );
}

export default Perfil;
