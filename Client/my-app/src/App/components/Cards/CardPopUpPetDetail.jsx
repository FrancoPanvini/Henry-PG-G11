import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

//? Services
import { getPetDetail } from "../../services/getPetDetail";

//? Icons
import { IoIosCloseCircle } from "react-icons/io";

function CardPopUpPetDetail({ onClose, petId }) {
  const [pet, setPet] = useState({});

  //* Seteamos en el estado los datos de la pet con su id
  useEffect(() => {
    const getPet = async id => {
      const pet = await getPetDetail(id);
      setPet(pet.data);
      console.log(pet.data)
    };
    getPet(petId);
  }, [petId]);

  //* Definir

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50 overflow-y-scroll ">
        <div className="relative top-10 mx-auto w-9/12 p-6 bg-fourty rounded-2xl grid justify-items-center  ">
          <div>
            <IoIosCloseCircle className="text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all" onClick={onClose} />
            <h3 className="font-bold text-xl py-3 px-6 text-center text-white capitalize">{pet?.name}</h3>
            <p className=" text-lg py-1 px-6 text-justify text-white italic">{pet?.description}</p>
            <p className=" text-lg py-1 px-6 text-justify text-white italic">
              {pet?.sex === "m" ? "Es un macho " : "Es una hembra "}
              {pet?.size === "p" ? "de tamaño pequeño " : pet?.size === "m" ? "de tamaño mediano " : "grande "}
              {pet?.age === 0 ? "de menos de un año" : pet?.age === 1 ? `de ${pet?.age} año` : `de ${pet?.age} años`}
              <span className="not-italic"> &#128512;</span>
            </p>
            <p className=" text-lg py-1 px-6 text-justify text-white italic">
              Vive en <span className="capitalize">{`${pet?.city}, ${pet?.province}, ${pet?.country} `}</span>
              <span className="not-italic">&#127758;</span>
            </p>
            {pet?.petPics?.length > 0 && (
              <p className=" text-lg py-1 px-6 text-justify text-white italic">
                Mira q lind{pet?.sex === "m" ? "o" : "a"} que es <span className="not-italic">&#128525;</span>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3 justify-items-center mt-3">
              {pet?.petPics?.map((pic, index) => (
                <img key={index} src={pic} alt="not available" className="h-96 object-cover rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CardPopUpPetDetail;
