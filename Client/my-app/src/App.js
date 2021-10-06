import React, {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./App/components/Navbar";
import Footer from "./App/components/info/Footer";
import Home from "./App/components/Home/Home";
import Login from "./App/components/Usuarios/Login";
import Registro from "./App/components/Usuarios/Registro";
import Adopciones from "./App/components/Mascotas/Adopciones";
import Perdidos from "./App/components/Mascotas/Perdidos";
import Refugios from "./App/components/Refugios/Refugios";
import Perfil from "./App/components/Usuarios/Perfil";
import Nosotros from "./App/components/info/Nosotros";
import FAQ from "./App/components/info/FAQ";
import FormularioPosteo from "./App/components/Mascotas/FormularioPosteo";
import {useDispatch} from 'react-redux'
import jwt from "jsonwebtoken"
import { setUser } from "./App/redux/actions/index";
import axios from 'axios'
import MapsB from './App/components/Maps/V_beta/Maps'
import MapsC from './App/components/Maps/V_beta/MapsFunction'
import ContainerMaps from "./App/components/Maps/V_alpha/ContainerMaps";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user.mail) {
        dispatch(setUser(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <div className="sticky top-0 z-40">
          <Navbar />
        </div>
        <div className="z-0">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/registro" exact component={Registro} />
            <Route path="/adopciones" exact component={Adopciones} />
            <Route path="/perdidos" exact component={Perdidos} />
            <Route path="/refugios" exact component={Refugios} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/nosotros" exact component={Nosotros} />
            <Route path="/faq" exact component={FAQ} />
            <Route path="/mapsA" exact component={ContainerMaps}/>
            <Route path="/mapsB" exact component={MapsB}/>
            <Route path="/mapsC" exact component={MapsC}/>
            <Route
              path="/adopciones/ofrecer"
              exact
              component={FormularioPosteo}
            />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
