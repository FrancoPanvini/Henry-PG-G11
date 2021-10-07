import React from 'react'
import {  useEffect } from 'react';
import { initialUser } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import DatosIndividuo from './DatosIndivuo';
import DatosRefugio from './DatosRefugio';



function DatosPersonales() {
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData)
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(initialUser(userId))
  }, [dispatch, userId]);
  
  return (
    <div>
      {user?.type === 'Individuo'? <DatosIndividuo /> : <DatosRefugio/>}
    </div>
    
  )
}

export default DatosPersonales
