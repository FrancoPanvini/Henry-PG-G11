import React from "react";
import Card from "./Card";
//import './Card.module.css'

function ContenedorCard({className}) {
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
       
       <div className='mb-20'>
          <h1 className='text-primary text-6xl font-bold grid justify-items-center'>DISPONIBLES PARA ADOPCION</h1> 
       </div>
       
       <div>FILTROS</div>

      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>

      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
      
      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
    </div>
  );
}

export default ContenedorCard;
