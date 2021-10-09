import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip";

//? Components
import FormularioAdopcion from "../pop-up/FormularioAdopcion";
import CardPopUpPetDetail from "./CardPopUpPetDetail";

//? Icons
import { FaPaw } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

function CardAdopcion({ selected, refProp, photo, name, age, size, country, province, city, sex, id}) {
  const isLogged = useSelector(state => state.isLogged);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (selected)
  refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="w-80 h-5/6 m-0 p-0">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="">
        <div onClick={handleClick} className="w-80 h-96 grid justify-items-center cursor-pointer bg-primaryDark rounded-2xl overflow-hidden">
          <img src={photo} alt="" className="w-full h-80 object-cover " />
          <h3 className="font-bold text-white text-2xl  p-4 w-full grid justify-items-center capitalize">{name}</h3>
        </div>

        <div className="h-96 w-80 bg-primary rounded-2xl ">
          <div onClick={handleClick} className="flex flex-col h-full items-center w-full  cursor-pointer">
            <div className="font-bold text-2xl p-6 text-fourty capitalize flex items-start gap-3 ">
              {name}
              {/* Button & PopUp card for detail */}
              <div className="">
                <IoMdAddCircle
                  title="Ver más detalles"
                  onClick={() => setIsOpenDetail(true)}
                  className="text-fourty absolute text-3xl hover:text-fourtyLight cursor-pointer transition-all bg-white rounded-full"
                />
                {isOpenDetail && <CardPopUpPetDetail onClose={() => setIsOpenDetail(false)} petId={id} />}
              </div>
            </div>

            <div className="text-center">
              <h3 className="p-1 text-white font-bold text-xl">
                Edad: <span className="text-fourty text-xl">{age}</span>
              </h3>
              
              <h3 className="p-1 text-white font-bold text-xl">
                Tamaño: <span className="text-fourty capitalize text-xl">{size === "c" ? "pequeño" : size === "m" ? "mediano" : "grande"}</span>
              </h3>
              
              <h3 className="p-1 text-white font-bold text-xl">
                Sexo <span className="text-fourty capitalize text-xl">: {sex === "h" ? "hembra" : "macho"}</span>
              </h3>
              
              <h3 className="p-1 text-white font-bold text-xl">
                Pais: <span className="text-fourty capitalize text-xl">{country}</span>
              </h3>
              
              <h3 className="p-1 text-white font-bold text-xl">
                Provincia:
                <span className="text-fourty capitalize text-xl"> {province}</span>
              </h3>
              
              <h3 className="pt-1 pb-4 text-white font-bold text-xl">
                Ciudad: <span className="text-fourty capitalize text-xl">{city}</span>
              </h3>
            </div>

            {/* Button & PopUp form for adoptions */}
            {isLogged && (
              <div className="mt-auto mb-4">
                <button className="shadow-buttonShadow btn-adogtame bg-fourty text-white border-fourtyDark rounded-2xl" onClick={() => setIsOpen(true)}>
                  <h2 className="p-2 flex items-center tracking-wide">
                    AD
                    <FaPaw />
                    GTAME
                  </h2>
                </button>

                {isOpen && <FormularioAdopcion name={name} onClose={() => setIsOpen(false)} petId={id} />}
              </div>
            )}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardAdopcion;
