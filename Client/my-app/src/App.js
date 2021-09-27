import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Normalize from 'react-normalize';

function App() {
  return (
    <Router>
      <Normalize/>
      <div className="bg-gray-200 text-center">
        <h1>A<span className="text-purple-400">dog</span>tame</h1>
      </div>
    </Router>
  );
}

export default App;
