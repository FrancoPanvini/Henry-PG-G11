import React from "react";
import ReactDom from "react-dom";

//? Services
import { IoIosCloseCircle } from "react-icons/io";
import { deletePet } from "../../../../services/deletePet";
import { deletePetLost } from "../../../../services/deletePetLost";
//? Icons

function PopUpDelete({ onClose, petId, onPostPet, type}) {
  //* Seteamos en el estado los datos de la pet con su id
  const delPet = async  () => {
      type ? await deletePet(petId) :  await deletePetLost(petId);
      onPostPet();
      onClose();
  }
  //* Definir

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50 overflow-y-scroll ">
        <div className="relative top-10 mx-auto w-1/4 p-6 bg-fourty rounded-2xl grid justify-items-center  ">
          <div>
            <IoIosCloseCircle className="text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all" onClick={onClose} />
            <h3 className="font-bold text-xl py-3 px-6 text-center text-white">Estas seguro de eliminar esta publicacion?</h3>
          </div>
          <div className="flex justify-around">
            <button className="btn bg-gray-200 p-4 m-4 rounded-lg hover:bg-red-600 hover:text-secondary" onClick={delPet}>ELIMINAR</button>
            <button className="btn bg-gray-200 p-4 m-4 rounded-lg" onClick={onClose}>CANCELAR</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default PopUpDelete;