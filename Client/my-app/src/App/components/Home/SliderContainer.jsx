import React from 'react';
import Slider from './Slider';

function ContenedorCard({ title, className }) {
  return (
    <div className={`justify-center ${className} p-32 h-full text-left`}>
      <h1 className="ml-4 text-xl font-bold">{title}</h1>

      <Slider title={title} />
    </div>
  );
}

export default ContenedorCard;
