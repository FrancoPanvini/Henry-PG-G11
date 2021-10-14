import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import swal from "sweetalert";

//? Components
import UploadImage from "./../cargue-fotos/UploadImage";
import MapPost from "../Maps/MapPost";

//? Icons
import { IoIosCloseCircle } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";

//? Services
import { postLostPet } from "../../services/postLostPet";

function FormularioPosteoPerdido({ onClose, onPostPet }) {
  const [mascota, setMascota] = useState({
    name: "",
    PetsTypeid: "",
    size: "",
    description: "",
    Userid: localStorage.getItem("userId"),
  });

  //* "url" es el array de fotos de la mascota
  const [url, setUrl] = useState([]);

  //* "location" es el estado que guarda la info del lugar de la mascota, el cuál en handlePublicar se postea en DB
  const [location, setLocation] = useState({
    city: "",
    province: "",
    country: "",
  });

  //* "errors" es el objeto que la función validate del input manipula
  const [errors, setErrors] = useState({});

  //* validate recibe el input, si encuentra errores le agrega propiedades al estado de errors, el cuál desactiva el botón "Publicar"
  const validate = ({ name }) => {
    let errors = {};
    if (!name) {
      errors.name =
        "Debes ingresar el nombre al que responde la mascota extraviada";
    }
    /* if (lat === '') {
      errors.coords = 'Debes seleccionar la ubicación donde está tu mascota';
    } */
    return errors;
  };

  //* input change handler
  const handleChange = (e) => {
    const newMascota = {
      ...mascota,
      [e.target.name]: e.target.value,
    };
    setMascota(newMascota);
    setErrors(validate(newMascota));
  };

  const handleLocation = () => {
    let city = document.getElementById(
      "administrative_area_level_2"
    )?.innerHTML;
    let province = document.getElementById(
      "administrative_area_level_1"
    )?.innerHTML;
    let country = document.getElementById("country")?.innerHTML;
    let lat = document.getElementById("lat")?.innerHTML;
    let lng = document.getElementById("lng")?.innerHTML;
    setLocation({
      city,
      province,
      country,
    });
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    setMascota((prevState) => {
      return {
        ...prevState,
        lat: lat,
        lng: lng,
      };
    });
  };

  //* función que desactiva el botón Publicar cuando no todos los datos están completados
  const handleDisabled = () => {
    if (mascota.name !== "" && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  //* Una vez que el usuario clickee en Publicar
  const handlePublicar = async (e) => {
    e.preventDefault();
    let city = await axios.post("/locations", location);
    let newMascota = {
      ...mascota,
      photo: url,
      Cityid: city.data.id,
    };
    swal({
      title: "Mascota Perdida",
      text: "Los datos ingresados son correctos?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((res) => {
      if (res) {
        swal({
          text: "La Mascota fue publicada como perdida",
          icon: "success",
          timer: "3000",
        }).then(postLostPet(newMascota), onPostPet());
      }
    });

    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <form className="panel flex flex-col w-4/5 min-w-max mx-auto bg-gradient-to-r from-primaryDark to-primary relative">
          {/* ↓ botón para cancelar y volver atrás */}
          <IoIosCloseCircle
            className="text-fourty absolute top-3 right-3 text-3xl hover:text-fourtyLight cursor-pointer transition-all"
            onClick={onClose}
          />
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              {/* ↓ Nombre de la mascota */}
              <label>
                Responde al nombre de:{" "}
                {errors.name && (
                  <FaExclamationCircle
                    title={errors.name}
                    className="inline text-fourtyLight align-baseline"
                  />
                )}
              </label>
              <input
                name="name"
                onChange={handleChange}
                className="rounded-md px-1 mb-4"
              />

              {/* ↓ Especie de la mascota */}
              <div className="flex mb-4">
                <div className="text-center w-1/2 rounded-2xl px-4 py-2">
                  <label>Especie:</label>
                  <div className="flex justify-evenly items-center">
                    <label htmlFor="gato">
                      <input
                        name="type"
                        type="radio"
                        id="gato"
                        value="g"
                        onChange={handleChange}
                      />
                      Gato
                    </label>{" "}
                    <label htmlFor="perro">
                      <input
                        name="type"
                        type="radio"
                        id="perro"
                        value="p"
                        onChange={handleChange}
                      />
                      Perro
                    </label>
                  </div>
                </div>

                {/* ↓ Tamaño de la mascota */}
                <div className="px-4 text-center border-l-2 border-primaryLight">
                  <label>Tamaño:</label>
                  <div className="flex justify-evenly items-center">
                    <label htmlFor="chico">
                      <input
                        name="size"
                        type="radio"
                        id="chico"
                        value="c"
                        onChange={handleChange}
                      />
                      Chico
                    </label>{" "}
                    <label htmlFor="mediano">
                      <input
                        name="size"
                        type="radio"
                        id="mediano"
                        value="m"
                        onChange={handleChange}
                      />
                      Mediano
                    </label>{" "}
                    <label htmlFor="grande">
                      <input
                        name="size"
                        type="radio"
                        id="grande"
                        value="g"
                        onChange={handleChange}
                      />
                      Grande
                    </label>
                  </div>
                </div>
              </div>

              {/* ↓ Descripción */}
              <label>Descripción:</label>
              <textarea
                name="description"
                placeholder="Ej.: Tiene collar color rojo con plaquita con mi número de teléfono, no sabe cruzar la calle, etc..."
                onChange={handleChange}
                className="rounded-md px-1 mb-4"
              />

              {/* ↓ Fotos */}
              <div className="flex justify-evenly items-center bg-gradient-to-r from-primary to-primaryLight px-4 py-2">
                <div>
                  <label>
                    Foto: (preferentemente la mascota al centro de la imagen)
                  </label>
                  <UploadImage setUrl={setUrl} />
                </div>
                <div className="w-32 h-32 bg-primaryDark border-2 border-primaryDark">
                  {url.length === 0 ? (
                    <div className="h-full flex justify-center items-center text-center text-primaryLight">
                      previsualización de imagen
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt="previsualización de imagen"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <br />
            </div>

            <div className="h-auto w-full flex flex-col justify-center ml-4">
              {/* ↓ Mapa de ubicación de la mascota */}
              <div>Ubicación de la Mascota:</div>
              <input
                disabled
                type="text"
                id="direction"
                name="direction"
                value={location.city}
                className="rounded-md px-1 mb-2 text-white"
              />
              <MapPost
                onLocationChange={handleLocation}
                onChange={handleChange}
                className="h-full"
              />
              {/* ↓ botón Publicar */}
              <div className="w-full text-center mt-4">
                <button
                  disabled={handleDisabled()}
                  onClick={handlePublicar}
                  className="btn btn-lg bg-thirty text-white border-fourty"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default FormularioPosteoPerdido;
