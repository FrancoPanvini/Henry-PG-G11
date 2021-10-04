import React from "react";
import Slider from "./Slider";
import SliderRefugios from "./SliderRefugios";

function ContenedorCard({ title, className }) {
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
      <h1 className="ml-4 text-xl font-bold">{title}</h1>
      <div className="grid justify-items-center "></div>

      {title === "REFUGIOS" ? <SliderRefugios /> : <Slider />}
    </div>
  );
}

export default ContenedorCard;
