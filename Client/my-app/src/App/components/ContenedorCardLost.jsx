import React from "react";
import SliderLost from "./SliderLost";


function ContenedorCard({ title, className }) {
  
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
      <h1 className="ml-4 text-xl font-bold">{title}</h1>
      <div className="grid justify-items-center "></div>

      
      <SliderLost />

    </div>
  );
}

export default ContenedorCard;