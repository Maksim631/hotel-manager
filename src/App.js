import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import Registration from './Registration/Registration'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Registration></Registration>
      </header>
    </div>
  );
}

export default App;
