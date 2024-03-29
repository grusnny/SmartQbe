import React, { Component } from 'react';
import firebase from 'firebase'
import "../NavBar/NavBar.css";
import Example from "../Pushbar/pushbar"

class NavBar extends Component {

  render() {

    var text = "Aún no has iniciado sesión";
    var usuario=JSON.parse(localStorage.getItem("data"));
    if (usuario != null) {
      text = usuario.user.displayName;
    }

    const onLogOut = () => {
      firebase.auth().signOut().then(function () {
        console.log("Log Out correcto");
        window.localStorage.clear()
        window.location.href = "/loginp";
      }).catch(function (error) {
        // An error happened.
      });
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">SmartQbe</a> 
        <div class="navbar-toggler" data-toggle="collapse" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <Example/>
        </div>
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/accountController">Mi Cuenta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pedidos">Mis SmartQbe</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/sensor">Simular sensor</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/loginp">Iniciar sesión</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/accountController">
            <h6> {text}</h6>
            </a>
            </li>
          </ul>

          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-info my-2 my-sm-0" onClick={onLogOut}>Cerrar sesión</button>
          </form>
        </div>
      </nav>


    );
  }

}

export default NavBar;