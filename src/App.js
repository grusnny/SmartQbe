import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Categories from './Home/Categories'
import Home from './Home/Home';
import Albanil from './Home/Albanil';
import Plomero from './Home/Plomero';
import Loginp from './Login/Loginp';
import MyAccount from './MyAccount/MyAccount';
import AccountController from './MyAccount/AccountController';
import LoginForm from "./Login/LoginForm";
import PageError from './PageError/PageError';
import './App.css';
import Pedidos from './List/pedidos';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
           <Route exact path="/" 
           component={Categories}/>
           <Route
              exact
              path="/categorias"
              render={() => <Categories name="Categorias" />} />
            <Route
              exact
              path="/loginp"
              render={() => <Loginp name="Iniciar Sesión" />} />
            <Route
              exact
              path="/MyAccount"
              render={() => <MyAccount />} />
            <Route
              exact
              path="/home"
              render={() => <Home />} />
            <Route
              exact
              path="/logincorreo"
              render={() => <LoginForm />} />
              <Route
              exact
              path="/albanil"
              render={() => <Albanil />} />
              <Route
              exact
              path="/plomero"
              render={() => <Plomero />} />
              <Route
              exact
              path="/pedidos"
              render={() => <Pedidos />} />
              <Route
              exact
              path="/accountController"
              render={() => <AccountController />} />
            <Route component={PageError} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;