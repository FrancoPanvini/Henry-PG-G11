import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

//? Components
import FormularioAdopcionSelect from "./FormularioAdopcionSelect";
import FormularioAdopcionText from "./FormularioAdopcionText";

//? Icons
import { IoIosCloseCircle } from "react-icons/io";
import { FaPaw } from "react-icons/fa";

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
    Userid:  localStorage.getItem("userId"),
    Petid: petId,
  });

  //* Setear la información del usuario desde el localStorage
  useEffect(() => {
    setUser({
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
    });
  }, []);

  //* Set UserId en Input
  /* useEffect(() => {
    setInput({ ...input, Userid: parseInt(user.id) });
  }, [user]); */

  //* Set estado Input cuando cambian los selects
  const handleSelectChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  //* Handle submit onClick
  const handleClick = e => {
    e.preventDefault();
    postAdoption(input);
    alert('se envio tu solicitud con éxito')
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50">
        <div className="relative top-10 mx-auto w-9/12 p-10 bg-fourty rounded-2xl grid justify-items-center">
          <div>
            <form>
              <IoIosCloseCircle className="text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all" onClick={onClose} />
              <div>
                <div className="font-bold text-primary grid justify-items-center pb-10 capitalize">¡Hola {user.name}!</div>
                <p className="text-white">
                  Agradecemos tu interes por <span className="font-bold text-primary capitalize">{name}</span>, para considerar tu solicitud de adopción necesitamos conocerte un poco mas, por favor contesta
                  nuestras preguntas
                </p>
              </div>
              <br /> <br />
              <FormularioAdopcionSelect label="Tipo de residencia: " name="residence" options={["Casa", "Apartamento"]} values={["house", "app"]} setInput={handleSelectChange} input={input} />
              <br />
              <FormularioAdopcionSelect label="Cantidad de niños en la residencia: " name="residents" options={["1-3", "4-6", "+6"]} values={["1-3", "4-6", "+6"]} setInput={handleSelectChange} />
              <br />
              <FormularioAdopcionSelect label="Eres mayor de edad: " name="adult" options={["SI", "NO"]} values={[true, false]} setInput={handleSelectChange} />
              <br />
              <FormularioAdopcionSelect
                label="¿Cuántas horas diarias puedes dedicarle al cuidado? "
                name="dedication"
                options={["0-2", "3-5", "+5"]}
                values={["0-2", "3-5", "+5"]}
                setInput={handleSelectChange}
              />
              <br />
              <div className="flex gap-5">
                <FormularioAdopcionSelect label="¿Tenes otras mascotas?: " name="otherPets" options={["SI", "NO"]} values={[true, false]} setInput={handleSelectChange} />
                {input.otherPets && <FormularioAdopcionText label="¿Cuáles?: " name="otherPetsDesc" setInput={handleSelectChange} />}
              </div>
              <br />
              <div className="flex gap-5">
                <FormularioAdopcionSelect label="¿Tuviste mascotas en los últimos 10 años?: " name="oldPets" options={["SI", "NO"]} values={[true, false]} setInput={handleSelectChange} />
                {input.oldPets && <FormularioAdopcionText label="¿Cuáles?: " name="oldPetsDesc" setInput={handleSelectChange} />}
              </div>
              <br />
              <div className="relative w-full text-center">
                <button onClick={handleClick} className="shadow-buttonShadow btn-adogtame w-36 h-12 bg-primary text-fourtyDark font-semibold text-xl border-fourtyDark rounded-2xl">
                  <h2 className="p-2 flex items-center tracking-wide justify-center">
                    AD
                    <FaPaw />
                    GTAME
                  </h2>
                </button>
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
