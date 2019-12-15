import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import Login from './Login/Login';
import Registration from './Registration/Registration'
import Header from './Header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HotelContainer from './HotelContainer/HotelContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Header
              isLogin={this.state.isLogin}
              onLogout={() => {
                document.cookie = "token=''";
                this.setState({ isLogin: false });
              }}
            ></Header>
          </header>
          <div className="App-body">
            <Switch>
              <Route path="/login">
                <Login onLogin={() =>                
                  this.setState({ isLogin: true })
                }></Login>
              </Route>
              <Route path="/registration">
                <Registration>
                </Registration>
              </Route>
              <Route path="/">
                <HotelContainer isLogin={this.state.isLogin}></HotelContainer>
              </Route>
            </Switch>

          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
