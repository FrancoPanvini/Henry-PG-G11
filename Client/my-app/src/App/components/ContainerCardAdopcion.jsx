import React from "react";
import Card from "./Card";

function ContenedorCard({className , title}) {
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
       
       <div className='mb-20 bg-gradient-to-r from-thirty to-fourty items-center text-white'>
          <h1 className='text-white text-6xl font-bold grid justify-items-center'>{title}</h1> 
       </div>

      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
       
      </div>

      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
      
      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
    </div>
  );
}

export default ContenedorCard;
