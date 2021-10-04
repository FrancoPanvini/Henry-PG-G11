import React from "react";
import Slider from "./Sliders/Slider";
import SliderRefugios from "./Sliders/SliderLost";
import SliderLost from './Sliders/SliderLost'

function ContenedorCard({ title, className }) {
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
      <h1 className="ml-4 text-xl font-bold">{title}</h1>
      {/* <div className="grid justify-items-center "></div> */}

      {title === "REFUGIOS" ? <SliderRefugios /> : title === "ADOPCION" ? <Slider /> : <SliderLost />}
    </div>
  );
}

export default ContenedorCard;
