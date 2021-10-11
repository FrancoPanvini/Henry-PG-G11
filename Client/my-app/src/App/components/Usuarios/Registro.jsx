import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPaw, FaExclamationCircle } from "react-icons/fa";
import axios from 'axios'
import {
  getCities,
  getCountries,
  getProvinces,
  postUsers,
} from "../../redux/actions/index";
import { useHistory } from "react-router-dom";
import MapPost from '../Maps/MapPost'

function Registro() {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.countries);
  const provincias = useSelector((state) => state.provinces);
  const ciudades = useSelector((state) => state.cities);
  const [countryId, setCountryId] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  // const [cityId, setCityId] = useState(null);
  const [location, setLocation] = useState({})
  const [direccion, setDireccion] = useState("")
  const history = useHistory();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

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
    UsersTypeid: "i", // ← hardcodeado, revisar !!!
  });
  const [errors, setErrors] = useState({});

  const validate = ({
    name,
    mail,
    phone,
    direction,
    password,
    confirmPassword
    //Cityid,
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
    if (!confirmPassword || !(confirmPassword === password)) {
      errors.confirmPassword = "Las contraseñas deben coincidir";
    }
    /* if (!UsersTypeid) {
      errors.UsersTypeid = "Selecciona un tipo de usuario";
    } */
    /*    if (!Cityid) {
      errors.Cityid = 'Selecciona tu ciudad';
    } */
    return errors;
  };





  const handleLocation = () => {
    let adress = document.getElementById("route")?.innerHTML + ' ' + document.getElementById("street_number")?.innerHTML
    let city = document.getElementById("administrative_area_level_2")?.innerHTML
    let province = document.getElementById("administrative_area_level_1")?.innerHTML
    let country = document.getElementById("country")?.innerHTML
    let lat = document.getElementById("lat")?.innerHTML
    let lng = document.getElementById("lng")?.innerHTML
    document.getElementById("direction").innerHTML = adress
    setLocation({
      city,
      province,
      country
    })

    setInput(prevState => {
      return {
        ...prevState,
        "direction": adress,
        "lat":lat,
        "lng":lng
      }})

      
    setDireccion(adress)
    setErrors(validate({...input,"direction": adress,"lat":lat,"lng":lng}))
  }






  const handleOnChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
    setErrors(validate(newInput));
  };

  //* Encuentro el id del país y provincia seleccionados por usuario
 /*  const handleUbicationChange = (e) => {
    if (e.target.id === "pais") {
      let ubicacion = paises.find((pais) => pais.name === e.target.value);
      ubicacion && setCountryId(ubicacion.id);
    }
    if (e.target.id === "provincia") {
      let ubicacion = provincias.find(
        (provincia) => provincia.name === e.target.value
      );
      ubicacion && setProvinceId(ubicacion.id);
    }
    if (e.target.id === "ciudad") {
      let ubicacion = ciudades.find((ciudad) => ciudad.name === e.target.value);
      let newInput = { ...input };
      ubicacion &&
        (newInput = {
          ...newInput,
          Cityid: ubicacion.id,
        });
      setInput(newInput);
      setErrors(validate(newInput));
    }
  }; */

  const handleDisabled = () => {
    if (input.name !== "" && Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(input)
    let city = await axios.post('/locations',location)
    let auxInput= {...input, Cityid:city.data.id}
    dispatch(postUsers(auxInput));
    
    
    // setInput({
      //   // ← esto está de más me parece, total al recargar la página se borra todo de todas formas...
    //   ...input,
    //   name: '',
    //   mail: '',
    //   phone: '',
    //   direction: '',
    //   password: '',
    // });
    
    alert("¡Registro exitoso! ahora puede iniciar sesión");
    history.push("/login");
  };

  return (
    <div className='h-screen82 flex items-center justify-around bg-gradient-to-r from-thirty to-fourty'>
      <div className='w-2/5'>
        <div className='bg-cachorroWeb bg-bottom bg-cover relative h-96 w-96 rounded-full mr-12 ml-auto shadow-similBorderWhite floorShadowCircle' />
      </div>
      <div className="flex justify-center items-center w-3/5 z-10 pl-60 h-60">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="h-auto p-4 pt-16 mr-auto bg-thirty rounded-lg w-2/5 min-w-min shadow-xl border-2 border-fourty border-opacity-50"
        >
          <div className="mx-auto flex justify-center items-center bg-fourty w-20 h-20 rounded-full">
            <FaPaw className="text-white text-3xl" />
          </div>
          <br />

          <div className="flex gap-8">
            <div className="flex flex-col w-64">
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
                // value={input.name}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

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
                // value={input.password}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

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
                // value={input.phone}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              {/* <label className='text-white'>
                Pais:{' '}
                {errors.paises && (
                  <span title={errors.paises}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <select
                autoComplete='on'
                onChange={(e) => setCountryId(e.target.value)}
                id='paises'
                className='rounded-md px-1 mb-2 capitalize'>
                {paises &&
                  paises.map((pais) => (
                    <option key={pais.id} name={pais.id} value={pais.id} className='capitalize'>
                      {pais.name}
                    </option>
                  ))}
              </select> */}

              {/*             <label className='text-white'>Pais:</label>
              <input type='text' id='pais' list='paises' onChange={handleUbicationChange} className='rounded-md px-1 mb-2' />
              <datalist id='paises'>{paises && paises.map((pais) => <option key={pais.id} value={pais.name} />)}</datalist> */}

              {/* <label className='text-white'>Provincia/Departamento: </label>
              <select onChange={(e) => setProvinceId(e.target.value)} className='rounded-md px-1 mb-2' id="provincias">
                {provincias &&
                  provincias
                    .filter((p) => parseInt(p.CountryId) === parseInt(countryId))
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
              </select> */}

              {/* <label className='text-white'>Provincia/Departamento: </label>
              <input
                type='text'
                id='provincia'
                list='provincias'
                onChange={handleUbicationChange}
                className='rounded-md px-1 mb-2'
              />
              <datalist className='rounded-md px-1 mb-2' id='provincias'>
                {provincias &&
                  provincias
                    .filter((provincia) => parseInt(provincia.CountryId) === parseInt(countryId))
                    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                    .map((provincia) => <option key={provincia.id} value={provincia.name} />)}
              </datalist> */}

              {/* <label className='text-white'>
                Ciudad:{' '}
                {errors.Cityid && (
                  <span title={errors.Cityid}>
                    <FaExclamationCircle className='inline text-primary align-baseline' />
                  </span>
                )}
              </label>
              <select onChange={handleOnChange} className='rounded-md px-1' id="provincias" name='Cityid'>
                {ciudad &&
                  ciudad
                    .filter((p) => parseInt(p.ProvinceId) === parseInt(provinceId))
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
              </select> */}

              {/* <label className='text-white'>Ciudad:</label>
              <input type='text' id='ciudad' list='ciudades' onChange={handleUbicationChange} className='rounded-md px-1 mb-2' />
              <datalist className='rounded-md px-1 mb-2' id='ciudades'>
                {ciudades &&
                  ciudades
                    .filter((ciudad) => parseInt(ciudad.ProvinceId) === parseInt(provinceId))
                    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                    .map((ciudad) => (
                      <option
                        key={ciudad.id}
                        value={ciudad.name.replace(/(^|[^A-Za-zÁÉÍÓÚÑáéíóúñ])([a-záéíóúñ])/g, (l) => l.toUpperCase())}
                      />
                    ))}
              </datalist> */}
            </div>

            <div className="flex flex-col w-64">
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
                // value={input.mail}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />

              <label className="text-white">
                Repetir contraseña:{" "}
                {errors.confirmPassword && (
                  <span title={errors.confirmPassword}>
                    <FaExclamationCircle className="inline text-primary align-baseline" />
                  </span>
                )}
              </label>
              <input
                type="password"
                // id='password'
                name="confirmPassword"
                // value={input.confirmPassword}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />




              
              <label className="text-white">
                Dirección:{" "}
                {errors.direction && (
                  <span title={errors.direction}>
                    <FaExclamationCircle className="inline text-primary align-baseline" />
                  </span>
                )}
              </label>
              <input
                disabled
                type="text"
                id="direction"
                name="direction"
                value={input.direction}
                onChange={handleOnChange}
                className="rounded-md px-1 mb-2"
              />
            </div>
          </div>

          <br />
          {/* <label>Ciudad</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          {/* <label>hOlaaa</label>
                  <input type='text' id='CityId' placeholder='CityId' value={input.CityId} onInput={(e) => handleOnChange(e)} /> */}
          
          <div>
            <MapPost onLocationChange={handleLocation} onChange={handleOnChange}/>
            {/* <button type="button" onClick={() => auxButtonClick()}>Confirm</button> */}
          </div>
          <br />
          <br />
          <br />
          
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={handleDisabled()}
              className="btn btn-lg bg-primary text-white border-yellow-600 -mt-5"
            >
              Registrate
            </button>
            <br />
            <span className="text-center text-white hover:underline">
              <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
