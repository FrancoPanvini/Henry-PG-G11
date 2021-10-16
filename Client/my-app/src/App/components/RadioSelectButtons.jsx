import React from 'react';

function RadioSelectButtons({ state, name, options, values, colorsOn, colorsOff, onSelection }) {
  return (
    <>
      {options.map((option, index) => (
        <button
          name={name}
          key={index}
          value={values[index]}
          className={`px-4 mx-1 btn-nav text-white ${state[name] === values[index] ? `border-b-2 border-opacity-0 ${colorsOn}` : `btn ${colorsOff}`}`}
          onClick={onSelection}>
          {option}
        </button>
      ))}
    </>
  );
}

export default RadioSelectButtons;
