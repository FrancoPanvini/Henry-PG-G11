import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#8a9bad",
  padding: "50px",
  zIndex: 1000,
  borderRadius: 25,
};

export default function Modal({ open, onClose, name, description }) {

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, [])

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div style={MODAL_STYLES} className="grid justify-items-center">
        <div>
          <form action="">
            <div>{description}</div>
            <div className="font-bold grid justify-items-center pb-10">
              ¡Hola {userName}!
            </div>
            <p className='text-white'>
              Agradecemos tu interes por{" "}
              <span className="font-bold text-gray-900">{name}</span>, para considerar tu
              solicitud de adopcion debemos conocerte un poco mas, por favor
              diligencia los campos a continuacion:
            </p>
            <br />
            <h1 className="font-bold grid justify-items-center pb-10">
              Formulario de Adopcion
            </h1>
            <label htmlFor="" className="font-bold">
              Tipo de Residencia:{" "}
            </label>
            <select type="text" className="rounded-xl bg-gray-200">
              <option name="residencia" value="casa">
                {" "}
                Casa{" "}
              </option>
              <option name="residencia" value="apto">
                {" "}
                Apartamento{" "}
              </option>
            </select>
            <br />
            <br />
            <label htmlFor="" className="font-bold">
              Cantidad de personas en la Residencia:{" "}
            </label>
            <select type="text" className="rounded-xl bg-gray-200">
              <option name="residentes" value="low">
                {" "}
                1 - 3{" "}
              </option>
              <option name="residentes" value="med">
                {" "}
                4 - 6{" "}
              </option>
              <option name="residentes" value="hight">
                {" "}
                mas de 6{" "}
              </option>
            </select>
            <br />
            <br />
            <label htmlFor="" className="font-bold">
              Eres mayor de edad:{" "}
            </label>
            <select type="text" className="rounded-xl bg-gray-200">
              <option name="adulto" value="si">
                {" "}
                Si{" "}
              </option>
              <option name="adulto" value="no">
                {" "}
                No{" "}
              </option>
            </select>
            <br />
            <br />
            <label htmlFor="" className="font-bold">
              Cuantas horas por dia puedes dedicar al cuidado de la mascota:{" "}
            </label>
            <select type="text" className="rounded-xl bg-gray-200">
              <option name="dedicacion" value="1">
                {" "}
                1{" "}
              </option>
              <option name="dedicacion" value="2">
                {" "}
                2{" "}
              </option>
              <option name="dedicacion" value="mas">
                {" "}
                Mas de 2{" "}
              </option>
            </select>
          </form>
        </div>
        <div>
          <br />
          <button
            className="btn btn-lg bg-primary text-white border-yellow-600 object-none object-right-top"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
