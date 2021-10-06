import React from 'react';

function FormularioAdopcionSelect({ label, name, options, values, setInput, input }) {
  const handleOnChange = e => {
    setInput(e.target.name, e.target.value);
  };

  return (
    <div>
      <label htmlFor="" className=" text-white">
        {label}
      </label>
      <select type="text" name={name} defaultValue="default" onChange={handleOnChange} className="rounded-md bg-primary text-center text-sm w-28">
        <option value="default" disabled />
        {options.map((option, index) => {
          return (
            <option key={option} value={values[index]}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormularioAdopcionSelect;
