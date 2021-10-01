import React from "react";
import Slider from "./Slider";


function ContenedorCard({ title, className }) {
  
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
      <h1 className="ml-4 text-xl font-bold">{title}</h1>
      <div className="grid justify-items-center "></div>

      
      <Slider />
      {/*  <div className="my-3 flex flex-wrap items-center mx-2">
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
      </div> */}
    </div>
  );
}

export default ContenedorCard;
