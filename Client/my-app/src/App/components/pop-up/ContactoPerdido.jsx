import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
//import swal from "sweetalert";
import { useSelector } from "react-redux";

//? Icons
import { IoIosCloseCircle } from "react-icons/io";
import { FaWhatsapp, FaMailBulk } from "react-icons/fa";

//? services
import { postAdoption } from "../../services/postAdoption";

function FormularioAdopcion({ onClose, name, petId }) {
  const [user, setUser] = useState({ id: "", name: "" });

  const [input, setInput] = useState({
    residence: "",
    residents: "",
    adult: false,
    dedication: "",
    otherPets: false,
    otherPetsDesc: "",
    oldPets: false,
    oldPetsDesc: "",
    Userid: localStorage.getItem("userId"),
    Petid: petId,
  });

  const owner = useSelector((state) => state.userData);

  console.log(owner.phone);

  //* Setear la información del usuario desde el localStorage
  useEffect(() => {
    setUser({
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
    });
  }, []);

  //* Handle submit onClick
  const handleClick = (e) => {
    e.preventDefault();
    /* swal({
      text: "¡Tu solicitud fue enviada con Exito!",
      icon: "success",
      timer: "3000",
    }); */
  };

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50">
        <div className="panel relative top-10 mx-auto w-9/12 bg-fourty grid justify-items-center">
          <div>
            <form>
              <IoIosCloseCircle
                className="text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all"
                onClick={onClose}
              />
              <div>
                <div className="font-bold text-primary grid justify-items-center pb-10 capitalize">
                  ¡Hola {user.name}!
                </div>
                <p className="text-white">
                  Gracias por reportar novedades sobre{" "}
                  <span className="font-bold text-primary capitalize">
                    {name}
                  </span>
                  , puedes contactarte con su dueño por los siguientes canales:
                </p>
                <br />
                <p className="text-white">A traves de WhatsApp Web</p>
                <div>
                  <h3 className="p-1 text-white font-bold">
                    WhatsApp:{" "}
                    <a href={`https://wa.me/${owner.phone}`}>
                      <FaWhatsapp className="inline text-white mx-1 text-xl" />
                      <span className="text-white ">{owner.phone}</span>
                    </a>
                  </h3>

                  <a
                    href={`https://wa.me/${owner.phone}`}
                    className="block shadow-buttonShadow btn-adogtame w-36 h-12 bg-primary text-fourtyDark font-semibold text-xl border-fourtyDark rounded-2xl"
                  >
                    <h2 className="p-2 flex items-center tracking-wide justify-center">
                      AD
                      <FaWhatsapp />
                      GTAME
                    </h2>
                  </a>
                </div>
                <br />
                <p className="text-white">Via Mail</p>
                <h3 className="p-1 text-white font-bold">
                  Mail:{" "}
                  <a href={`mailto:${owner.mail}`}>
                    <FaMailBulk className="inline text-white mx-1 text-xl" />
                    <span className="text-white ">{owner.mail}</span>
                  </a>
                </h3>

                <a
                  href={`mailto:${owner.mail}`}
                  className="block shadow-buttonShadow btn-adogtame w-36 h-12 bg-primary text-fourtyDark font-semibold text-xl border-fourtyDark rounded-2xl"
                >
                  <h2 className="p-2 flex items-center tracking-wide justify-center">
                    AD
                    <FaMailBulk />
                    GTAME
                  </h2>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default FormularioAdopcion;
