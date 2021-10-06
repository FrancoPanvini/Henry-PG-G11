import React from 'react'
import {  useEffect } from 'react';
import { initialUser } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';



function DatosPersonales() {
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(initialUser(userId))
  }, [dispatch, userId]);

  return (
    <div className="flex justify-between">
    <div className="flex flex-wrap">
        <div className="my-4 p-2 text-3xl w-1/2">Nombre completo :
        <div className="my-4 p-2 border-2 bg-gray-300 " >
          <h2>{user?.name}</h2>
          </div>
        </div>
        <div className="my-4 p-2 text-3xl w-1/2">Email :
          <div className="my-4 p-2 border-2 bg-gray-300 ">
            <h2>{user?.mail}</h2>
          </div>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >Telefono :
          <div className="my-4 p-2 border-2 bg-gray-300 ">
            <h2>{user?.phone}</h2>
          </div>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >Pais :
          <div className="my-4 p-2 border-2 bg-gray-300 ">
            <h2>{user?.country}</h2>
          </div>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >Provincia :
          <div className="my-4 p-2 border-2 bg-gray-300 ">
            <h2>{user?.province}</h2>
          </div>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >Ciudad :
          <div className="my-4 p-2 border-2 bg-gray-300 ">
            <h2>{user?.city}</h2>
          </div>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >
            <button className="btn bg-primary text-white py-4 px-8 rounded-lg">Edit</button>
        </div>
        <div className="my-4 p-2  text-3xl w-1/2" >
            <button className="btn bg-red-600 text-white py-4 px-8 rounded-lg">Borrar cuenta</button>
        </div>
    </div>
    <div className="m-6">
        <img src={user?.photo} className="rounded-full ring-4 ring-gray-300 h-80 w-80" alt="asd"/>
      </div>
    </div>
  )
}

export default DatosPersonales
