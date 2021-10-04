import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

export default function Modal({ open, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-primary bg-opacity-70 z-40" />
      <div style={MODAL_STYLES} className="grid justify-items-center">
        <div>
          <form action="">
            <h1 className="font-bold grid justify-items-center pb-10">Formulario de adopcion</h1>
            <label htmlFor="">Nombre</label>
            <input type="text" className="border-green bg-gray-200" />
            <br />
            <br />
            <label htmlFor="">Pais</label>
            <select type="text" className="border-green bg-gray-200" />
            <br />
            <br />
            <label htmlFor="">Pais</label>
            <select type="text" className="border-green bg-gray-200" />
            <br />
            <br />
            <label htmlFor="">Ciudad</label>
            <input type="text" className="border-green bg-gray-200" />
          </form>
        </div>
        <div>
          <button className="object-none object-right-top" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
