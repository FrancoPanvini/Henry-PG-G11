import React from 'react';

function FormularioAdopcionSelect({ label, name, setInput }) {
  const handleOnChange = e => {
    let value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value;
    setInput(e.target.name, value);
  };

  return (
    <div>
      <label htmlFor="" className=" text-white">
        {label}
      </label>
      <input type="text" name={name} onChange={handleOnChange} className="rounded-md bg-primary text-left text-sm w-80 px-2" />
    </div>
  );
}

export default FormularioAdopcionSelect;
