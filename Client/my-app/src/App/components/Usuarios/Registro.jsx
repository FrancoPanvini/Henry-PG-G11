import React, { useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

//? Components
import MapPost from "../Maps/MapPost";
import PhoneCodes from "./phoneRegionInput";
import RadioSelectButtons from "../RadioSelectButtons";
import ErrorIconPulsing from "../ErrorIconPulsing";

//? Services
import { postUsers, logInUsers } from "../../redux/actions/index";

//? Icons
import { FaPaw, FaHome } from "react-icons/fa";

function Registro() {
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState("");
  const [location, setLocation] = useState({});
  const [displayDirection, setDisplayDirection] = useState("");
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    mail: "",
    phone: "",
    direction: "",
    password: "",
    confirmPassword: "",
    lat: "",
    lng: "",
    Cityid: "",
    UsersTypeid: "i",
  });
  const [errors, setErrors] = useState({});

  //* Validaciones de formulario y function para maneja de errores
  const validate = ({
    name,
    mail,
    phone,
    direction,
    password,
    confirmPassword,
  }) => {
    let errors = {};
    if (!name) {
      errors.name = "Ingresa tu nombre y apellido";
    }
    if (!mail || !mail.includes("@") || !mail.includes(".")) {
      errors.mail = "Debe ser un email válido";
    }
    if (!phone) {
      errors.phone = "Ingresa un número telefónico de contacto";
    }
    if (!direction) {
      errors.direction = "Ingresa tu ubicación";
    }
    if (!password || password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
    }
    if (
      !confirmPassword ||
      confirmPassword.length < 8 ||
      !(confirmPassword === password)
    ) {
      errors.confirmPassword = "Las contraseñas deben coincidir";
    }
    return errors;
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.name === "phone") {
      if (e.target?.value) {
        setErrors(validate(input));

        const phoneNumber = parsePhoneNumber(e.target.value, phoneCode);
        if (phoneNumber?.isValid()) {
          const newInput = {
            ...input,
            [e.target.name]: phoneNumber.number.substring(1),
          };
          setInput(newInput);
          setErrors(validate(newInput));
        }
      }
    } else {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      setInput(newInput);
      setErrors(validate(newInput));
    }
  };
  const handleDisabled = () => {
    if (input.name !== "" && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  //* function maneja los parametros del mapa para cargar en input
  const handleLocation = () => {
    let adress =
      document.getElementById("route")?.innerHTML +
      " " +
      document.getElementById("street_number")?.innerHTML;
    let city = document.getElementById(
      "administrative_area_level_2"
    )?.innerHTML;
    let province = document.getElementById(
      "administrative_area_level_1"
    )?.innerHTML;
    let country = document.getElementById("country")?.innerHTML;
    let lat = document.getElementById("lat")?.innerHTML;
    let lng = document.getElementById("lng")?.innerHTML;
    document.getElementById("direction").innerHTML = adress;
    setDisplayDirection(`${adress}, ${province}, ${country}`);
    setLocation({
      city,
      province,
      country,
    });
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    setInput((prevState) => {
      return {
        ...prevState,
        direction: adress,
        lat: lat,
        lng: lng,
      };
    });

    setErrors(validate({ ...input, direction: adress, lat: lat, lng: lng }));
  };

  //* Maneja el codigo de area del telefono
  const handlePhoneCodeChange = (e) => {
    setPhoneCode(e.target.value);
  };

  //* Maneja el submit del form registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    let city = await axios.post("/locations", location);
    let auxInput = { ...input, Cityid: city.data.id };
    dispatch(postUsers(auxInput));

    swal({
      title: "Registro Exitoso!",
      text: "Ahora puede iniciar sesión",
      icon: "success",
    });
    try {
      axios.post("/sendmail/postregister", {
        name: input.name,
        mail: input.mail,
      });
      console.log("correo enviado");
    } catch (err) {
      console.log(err);
    }
    history.push("/login");
  };

  return (
    <div className="h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty">
      <div className="w-2/5">
        <div className="ml-auto mr-12 bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full shadow-similBorderWhite floorShadowCircle" />
      </div>
      <div className="flex justify-center items-center w-3/5 z-1 h-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 w-11/12 flex flex-col bg-thirty rounded-lg min-w-min shadow-xl border-2 border-fourty border-opacity-50"
        >
          <div className="pb-4 border-b-2 border-thirtyDark border-opacity-50">
            <a
              href="http://localhost:3001/auth/google"
              className="btn btn-lg bg-white text-gray-600 border-gray-400 flex justify-center items-center"
            >
              <img
                src="https://freesvg.org/img/1534129544.png"
                alt="Log in con Google"
                className="h-7 w-7 inline mr-4"
              />
              Registra tu cuenta usando Google
            </a>
          </div>

          <div className="flex gap-8 overflow-auto my-4">
            <div className="flex flex-col w-2/5 relative">
              <label className="text-white">Tipo de cuenta:</label>
              <div className="flex justify-start mb-2">
                <RadioSelectButtons
                  state={input}
                  name="UsersTypeid"
                  options={["Personal", "Refugios"]}
                  values={["i", "r"]}
                  onSelection={handleOnChange}
                  colorsOn="bg-thirtyDark mx-2"
                  colorsOff="bg-thirtyLight border-thirtyDark mx-2"
                />
                <div className="mx-auto flex justify-center items-center bg-fourty w-16 h-16 rounded-full absolute top-0 right-0">
                  {input.UsersTypeid === "i" ? (
                    <FaPaw className="text-white text-3xl" />
                  ) : (
                    <FaHome className="text-white text-3xl" />
                  )}
                </div>
              </div>

              <label className="text-white">
                {input.UsersTypeid === "r"
                  ? "Nombre del refugio"
                  : "Nombre y apellido"}
                : <ErrorIconPulsing error={errors.name} color="primary" />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              <label className="text-white">
                E-mail: <ErrorIconPulsing error={errors.mail} color="primary" />
              </label>
              <input
                type="text"
                id="mail"
                name="mail"
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              <label className="text-white">
                Contraseña:{" "}
                <ErrorIconPulsing error={errors.password} color="primary" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              <label className="text-white">
                Repetir contraseña:{" "}
                <ErrorIconPulsing
                  error={errors.confirmPassword}
                  color="primary"
                />
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              <div className="flex gap-2">
                <div className="w-1/4">
                  <label className="text-white">
                    Código:
                    <PhoneCodes
                      onCodeChange={handlePhoneCodeChange}
                      className="rounded-md"
                    />
                  </label>
                </div>
                <div className="w-3/4 flex flex-col">
                  <label className="text-white">
                    Teléfono:{" "}
                    <ErrorIconPulsing error={errors.phone} color="primary" />
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    onChange={handleOnChange}
                    className="rounded-md px-1 mb-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-3/5 ">
              <label className="text-white">
                Dirección: (Seleccionar en el mapa){" "}
                <ErrorIconPulsing error={errors.direction} color="primary" />
              </label>
              <input
                disabled
                type="text"
                id="direction"
                name="direction"
                value={displayDirection}
                onChange={handleOnChange}
                className="rounded-md px-1 text-white"
              />
              <div className="h-full pt-2">
                <MapPost
                  onLocationChange={handleLocation}
                  onChange={handleOnChange}
                  className=""
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              disabled={handleDisabled()}
              className="mt-2 btn btn-lg bg-primary text-white border-yellow-600 flex justify-center items-center"
            >
              {input.UsersTypeid === "i" ? (
                <FaPaw className="text-white text-3xl inline mr-4" />
              ) : (
                <FaHome className="text-white text-3xl inline mr-4" />
              )}{" "}
              Registrate
            </button>
            <span className="mt-2 text-center text-white hover:underline">
              <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
