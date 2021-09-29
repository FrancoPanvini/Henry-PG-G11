import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './App/components/Navbar';
import Footer from './App/components/Footer';
import Home from './App/components/Home';
import Login from './App/components/Login';
import Registro from './App/components/Registro';
import Adopciones from './App/components/Adopciones';
import Perdidos from './App/components/Perdidos';
import Refugios from './App/components/Refugios';
import Perfil from './App/components/Perfil';
import Nosotros from './App/components/Nosotros';
import FAQ from './App/components/FAQ';
//import Normalize from 'react-normalize';

function App() {
  return (
    <Router>
      {/* <Normalize /> */}
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/registro" exact component={Registro}/>
        <Route path="/adopciones" exact component={Adopciones}/>
        <Route path="/perdidos" exact component={Perdidos}/>
        <Route path="/refugios" exact component={Refugios}/>
        <Route path="/perfil" exact component={Perfil}/>
        <Route path="/nosotros" exact component={Nosotros}/>
        <Route path="/faq" exact component={FAQ}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
