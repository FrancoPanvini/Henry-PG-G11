import React from "react";
import Card from "./Card";
//import './Card.module.css'

function ContenedorCard({title, className}) {
  return (
    <div className={`justify-center ${className} p-2`}>
      <div className='grid justify-items-center'>
        <h1>{title}</h1>
      </div>

      <div className="my-3 flex flex-wrap mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
    </div>
  );
}

export default ContenedorCard;
