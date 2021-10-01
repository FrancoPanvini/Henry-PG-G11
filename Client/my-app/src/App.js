import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./App/components/Navbar";
import Footer from "./App/components/Footer";
import Home from "./App/components/Home";
import Login from "./App/components/Login";
import Registro from "./App/components/Registro";
import Adopciones from "./App/components/Adopciones";
import Perdidos from "./App/components/Perdidos";
import Refugios from "./App/components/Refugios";
import Perfil from "./App/components/Perfil";
import Nosotros from "./App/components/Nosotros";
import FAQ from "./App/components/FAQ";
import FormularioPosteo from "./App/components/FormularioPosteo";


function App() {
  return (
    <Router>
      <div>
        <div className="sticky top-0 z-40">
          <Navbar />
        </div>
        <div className='z-0'>
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
          <Route path="/adopciones/ofrecer" exact component={FormularioPosteo} />
        </Switch>
        <Footer />
        </div>
        
      </div>
    </Router>
  );
}

export default App;
