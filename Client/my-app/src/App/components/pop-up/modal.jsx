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

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-200 bg-opacity-70 z-40" />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close Modal</button>
        <form action="">
          <h1>Formulario de adopcion</h1>
          <label htmlFor="">Nombre</label>
          <input type="text" className="border-green bg-gray-200" />
          <br />
          <br />
          <label htmlFor="">Ciudad</label>
          <input type="text" className="border-green bg-gray-200"/>
          <br />
          <br />
          <label htmlFor="">Ciudad</label>
          <input type="text" className="border-green bg-gray-200"/>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}
