import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import Registration from './Registration/Registration'
import Hotel from './Hotel/Hotel';
import HotelContainer from './HotelContainer/HotelContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HotelContainer isLogin={true}></HotelContainer>
      </header>
    </div>
  );
}

export default App;
