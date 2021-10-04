import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPaw, FaExclamationCircle } from "react-icons/fa";
import { getCities, getCountries, getProvinces, postUsers } from "../../redux/actions/index";
import { useHistory } from "react-router-dom";

function Registro() {
  const dispatch = useDispatch();
  const pais = useSelector((state) => state.countries);
  const provincia = useSelector((state) => state.provinces);
  const ciudad = useSelector((state) => state.cities);
  const [countryId, setCountryId] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  // const [cityId, setCityId] = useState(null);
  const history = useHistory();

    useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces()); 
    dispatch(getCities());  
    }, [dispatch])

  const [input, setInput] = useState({
    name: "",
    mail: "",
    phone: "",
    direction: "",
    password: "",
    Cityid: "", // ← hardcodeado, revisar !!!
    UsersTypeid: "i", // ← hardcodeado, revisar !!!
  });
  const [errors, setErrors] = useState({});

  const validate = ({
    name,
    mail,
    phone,
    direction,
    password,
    Cityid,
    // UsersTypeid,
  }) => {
    let errors = {};
    if (!name) {
      errors.name = "Ingresa tu nombre y apellido";
    }
    if (!mail || !mail.includes("@") || !mail.includes(".")) {
      errors.mail = "Debe ser un email válido";
    }
    if (!phone) {
      errors.phone = "Ingresa tu número de contacto";
    }
    if (!direction) {
      errors.direction = "Ingresa tu domicilio";
    }
    if (!password || password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
    }
    /* if (!UsersTypeid) {
      errors.UsersTypeid = "Selecciona un tipo de usuario";
    } */
    if (!Cityid) {
      errors.Cityid = "Selecciona tu ciudad";
    } 
    return errors;
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
    setErrors(validate(newInput));
  };

  const handleDisabled = () => {
    if (input.name !== "" && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUsers(input));
    setInput({ // ← esto está de más me parece, total al recargar la página se borra todo de todas formas...
      ...input,
      name: "",
      mail: "",
      phone: "",
      direction: "",
      password: "",
    });
    alert("¡Registro exitoso! ahora puede iniciar sesión");
    history.push("/login");
  };

  return (
    <div className="h-full flex items-center justify-around bg-gradient-to-r from-thirty to-fourty">
      {/* DOS VERSIONES, para funcionar una debe estar comentada y la otra activada, porque una remplazaría a la otra  */}

      {/* ↓ Versión 1: "Coherente" con la foto de gatitos de Home ↓ */}
      {/* <div className="bg-cachorroWeb bg-center-bottomish bg-cover relative onboarding-transparency-right h-full w-1/4" />
      <div className="flex justify-center items-center w-3/4 z-10">
        <form className="flex flex-col mx-auto bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-min h-96 shadow-xl border-2 border-fourty border-opacity-50"> */}
      {/* ↑ FIN versión 1 */}

      {/* ↓ Versión 2: Foto dentro de un círculo ↓ */}
      <div className="w-1/2">
        <div className="bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-similBorderWhite floorShadowCircle" />
      </div>
      <div className="flex justify-center items-center w-1/2 z-10">
        <div className="flex justify-center items-center w-1/2 z-10"></div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col m-8 mr-48  bg-thirty py-12 px-8 rounded-lg w-2/5 min-w-sign shadow-xl border-2 border-fourty border-opacity-50"
        >
          <div className="mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full">
            <FaPaw className="text-white text-3xl" />
          </div>
          <br />

          <label className="text-white">
            Nombre y apellido:{" "}
            {errors.name && (
              <span title={errors.name}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            E-mail:{" "}
            {errors.mail && (
              <span title={errors.mail}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={input.mail}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Teléfono:{" "}
            {errors.phone && (
              <span title={errors.phone}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={input.phone}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Dirección:{" "}
            {errors.direction && (
              <span title={errors.direction}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="text"
            id="direction"
            name="direction"
            value={input.direction}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          <label className="text-white">
            Pais:{" "}
            {errors.pais && (
              <span title={errors.pais}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          {/*  <input
            type="datalist"
            id="pais"
            list='paises'
            name="pais"
            value={input.pais}
            onChange={handleOnChange}
            
          /> */}
          <select
            onChange={(e) => setCountryId(e.target.value)}
            /* id="paises" */ className="rounded-md px-1"
          >
            {pais &&
              pais.map((e) => (
                <option key={e.id} name={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
          <br />
          <label className="text-white">
            Provincia/Departamento:{" "}
            {errors.provinces && (
              <span title={errors.provinces}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          {/*   <input
            type="datalist"
            id="provincia"
            list='provincias'
            name="provinces"
            value={input.provinces}
            onChange={handleOnChange}
            className="rounded-md px-1"
          /> */}
          <select
            onChange={(e) => setProvinceId(e.target.value)}
            className="rounded-md px-1" /* id="provincias" */
          >
            {provincia &&
              provincia
                .filter((p) => parseInt(p.CountryId) === parseInt(countryId))
                .map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
          </select>
          <br />
          <label className="text-white">
            Ciudad:{" "}
            {errors.Cityid && (
              <span title={errors.Cityid}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <select
            onChange={handleOnChange}
            className="rounded-md px-1" /* id="provincias" */
            name="Cityid"
          >
            {ciudad &&
              ciudad
                .filter((p) => parseInt(p.ProvinceId) === parseInt(provinceId))
                .map((e) => (
                  <option key={e.id} value={e.id} >
                    {e.name}
                  </option>
                ))}
          </select>
          <br />
          <label className="text-white">
            Contraseña:{" "}
            {errors.password && (
              <span title={errors.password}>
                <FaExclamationCircle className="inline text-primary align-baseline" />
              </span>
            )}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleOnChange}
            className="rounded-md px-1"
          />
          <br />
          {/* <label>Ciudad</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          {/* <label>hOlaaa</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          <button
            type="submit"
            disabled={handleDisabled()}
            className="btn btn-lg bg-primary text-white border-yellow-600"
          >
            Registrate
          </button>
          <br />
          <span className="text-center text-white hover:underline">
            <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Registro;
