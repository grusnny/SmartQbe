import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import firebase from "../firebase";
import { CardPedidos } from './MapaDispositivo'
const db = firebase.firestore();

function Pedidos() {


  var usuario = JSON.parse(localStorage.getItem("data"));
  const [IDDispositivo, setIDDispositivo] = React.useState();

  const onSearch = () => {
    window.localStorage.setItem("IDDispositivo", IDDispositivo);   
    console.log(window.localStorage.getItem("IDDispositivo")); 
    window.location.href = "/mapadispositivo";
    //window.location.reload();
  }


  return (
    <div className="App">
      <Container className='text-center'>
        <p>Revisa tus SmartQbe : </p>
        <Input name="IDDispositivo" id="exampleIDDispositivo"
                value={IDDispositivo} onChange={(e) => setIDDispositivo(e.target.value)} />
                <div></div>
                <button type="button" class="btn btn-outline-primary" onClick={onSearch} >Buscar</button>
 
      </Container>
    </div>
  );

}

export default Pedidos; 