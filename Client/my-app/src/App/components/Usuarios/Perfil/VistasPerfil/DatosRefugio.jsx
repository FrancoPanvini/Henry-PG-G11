import React from 'react'
import {  useEffect } from 'react';
import { initialUser } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaDonate } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrInstagram, GrFacebook } from "react-icons/gr"
import { BiWorld } from "react-icons/bi";

const DatosRefugio = () => {
const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(initialUser(userId))
  }, [dispatch, userId]);

    return(
        <div className="flex justify-between relative">
        <div className="flex flex-wrap ">
            <div className="my-4 p-2 text-xl w-1/4">Nombre completo :
            <div className="my-4 p-2 border-2 bg-gray-300 " >
              <h2 className="capitalize">{user?.name}</h2>
              </div>
            </div>
            <div className="my-4 p-2 text-xl w-1/4">Email :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2>{user?.mail}</h2>
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Telefono :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2>{user?.phone}</h2>
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Pais :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2 className="capitalize">{user?.country}</h2>
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Provincia :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2 className="capitalize">{user?.province}</h2>
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Ciudad :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2 className="capitalize">{user?.city}</h2>
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Responsable :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2 className="capitalize">{user?.responsable}</h2>
                
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-1/4" >Redes :
              <div className="my-4 p-2 border-2 bg-gray-300 ">
                <h2 className="capitalize">{user?.responsable}</h2>
                
              </div>
            </div>
            <div className="my-4 p-2  text-xl w-full " >Descripcion :
              <div className="my-4 p-2 border-2 bg-gray-300  ">
                <h2 className=" break-all overflow-y-auto h-24 ">{user?.description}</h2>
              </div>
            </div>
            
            
            <div className="my-4 p-2  text-xl w-1/2" >
                <button className="btn bg-primary text-white py-4 px-8 rounded-lg">Edit</button>
            </div>
            <div className="my-4 p-2  text-xl w-1/2" >
                <button className="btn bg-red-600 text-white py-4 px-8 rounded-lg">Borrar cuenta</button>
            </div>
        </div>
        <div className="absolute top-0 right-0">
            <img src={user?.photo} className="rounded-full ring-8 ring-gray-300 h-60 w-60" alt="asd"/>
          </div>
          <div className="flex flex-wrap h-96 " >
          <div >
            <a href={user?.link_donaciones}>
                <FaDonate />
            </a>
          </div>
          <div>
            <a href={user?.link_facebook}>
                <GrFacebook />
            </a>
          </div>
          <div>
            <a href={user?.link_instagram}>
                <GrInstagram />
            </a>
          </div>
          <div>
            <a href={user?.link_web}>
                <BiWorld />
            </a>
          </div>
          </div>
        </div>
    )
}

export default DatosRefugio