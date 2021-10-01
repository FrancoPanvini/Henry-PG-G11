import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function ContenedorCard({className , title}) {
  const pets = useSelector(state => state.petsAdop);
  
  return (
    <div className={`justify-center ${className} p-32 h-full text-left w-full`}>
       
       <div className='mb-20 bg-gradient-to-r from-thirty to-fourty items-center text-white w-full'>
          <h1 className='text-white text-6xl font-bold grid justify-items-center'>{title}</h1> 
       </div>

      <div className='grid grid-cols-3 gap-4 items-center  justify-center w-full'>
      { pets && pets.map( p => {
        return (
          <div key={p.id} className="" >
          <Card 
          photo="https://picsum.photos/id/237/300/200"
          name={p.name}
          size={p.size}
          sex={p.sex}
          country={p.country}
          province={p.province}
          city={p.city}
          />
        </div>
        )
      })}
       </div>

     {/*  <div className="my-3 flex flex-wrap items-center mx-2">
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
      </div> */}
    </div>
  );
}

export default ContenedorCard;
