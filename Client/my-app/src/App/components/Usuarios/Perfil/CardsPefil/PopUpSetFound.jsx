import React from "react";
import ReactDom from "react-dom";

//? Services
import { IoIosCloseCircle } from "react-icons/io";
import { setFoundPetLost,  } from "../../../../services/setFoundPetLost";
//? Icons

function PopUpSetFound({ onClose, petId, onPostPet}) {
  //* Seteamos en el estado los datos de la pet con su id
  const delPet = async  () => {
      await setFoundPetLost(petId);
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
            <h3 className="font-bold text-xl py-3 px-6 text-center text-white">Encontraste a tu mascota? Avisale a todos!!!</h3>
          </div>
          <div className="flex justify-around">
            <button className="btn bg-gray-200 p-4 m-4 rounded-lg hover:bg-green-600 hover:text-secondary" onClick={delPet}>LO ENCONTRE!!!</button>
            <button className="btn bg-gray-200 p-4 m-4 rounded-lg" onClick={onClose}>CANCELAR</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default PopUpSetFound;