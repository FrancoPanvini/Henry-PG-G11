import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './App/components/Navbar';
import Footer from './App/components/Footer';
import Home from './App/components/Home';
//import Normalize from 'react-normalize';

function App() {
  return (
    <Router>
      {/* <Normalize /> */}
      <Navbar/>
        <Home/>
      <Footer/>
    </Router>
  );
}

export default App;
