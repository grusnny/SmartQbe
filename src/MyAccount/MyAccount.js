import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import MapExample from "../MyAccount/map2"
import firebase from 'firebase'
import {
  Card, CardImg, CardText, CardBody, Input,
  CardTitle, CardSubtitle, Container,
} from 'reactstrap';
import "../MyAccount/MyAccount.css";
import Error from '../Components/error';

const axios = require('axios');
class MyAccount extends Component {
  state = { error: false }
  constructor() {
    super();
    this.state = {
      workerProfession: ''
    }
    this.commonChange = this.commonChange.bind(this);
  }

  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { error } = this.state
    console.log('historia', this.props.history);
    console.log('locación', this.props.location);
    console.log('match', this.props.match);

    const db = firebase.firestore();

    var usuario=JSON.parse(localStorage.getItem("data"));
  
    var currentUser = usuario.user.uid;
    window.localStorage.setItem("UID", currentUser);

    var getuid = window.localStorage.getItem("UID")

    let workerRef
    while(workerRef==null){
      workerRef = db.collection('worker').doc(getuid);
    }
    let query = workerRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return
        }
        window.localStorage.setItem("workerNameDoc", doc.data().name);
        window.localStorage.setItem("workerMailDoc", doc.data().mail);
        window.localStorage.setItem("workerMailAltDoc", doc.data().mailAlt);
        window.localStorage.setItem("workerPhotoDoc", doc.data().photo);
        window.localStorage.setItem("workerTelephoneDoc", doc.data().telephone);
        window.localStorage.setItem("workerProfessionDoc", doc.data().profession);
        window.localStorage.setItem("workerLatDoc", doc.data().latitude);
        window.localStorage.setItem("workerLonDoc", doc.data().length);

      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    let userRef = db.collection('user').doc(getuid);
    let query1 = userRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return
        }
        window.localStorage.setItem("userNameDoc", doc.data().name);
        window.localStorage.setItem("userMailDoc", doc.data().mail);
        window.localStorage.setItem("userMailAltDoc", doc.data().mailAlt);
        window.localStorage.setItem("userPhotoDoc", doc.data().photo);
        window.localStorage.setItem("userTelephoneDoc", doc.data().telephone);
        window.localStorage.setItem("userLatDoc", 0);
        window.localStorage.setItem("userLngDoc", 0);

      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    var userNameDoc = window.localStorage.getItem("userNameDoc");
    var userMailDoc = window.localStorage.getItem("userMailDoc");
    var userMailAltDoc = window.localStorage.getItem("userMailAltDoc");
    var userPhotoDoc = window.localStorage.getItem("userPhotoDoc");
    var userTelephoneDoc = window.localStorage.getItem("userTelephoneDoc");
    var userlatitud = window.localStorage.getItem("userLatDoc");
    var userlongitud = window.localStorage.getItem("userLngDoc");

    var workerProfessionDoc = window.localStorage.getItem("workerProfessionDoc");

    const onSearch = () => {
      
    }
    const onDelete = () => {
      
    }

    // Cargar un componente condicionalmente

    let componente;
    if (this.state.error) {
      // Hay un error, mostrar componente
      componente = <Error mensaje='Debe seleccionar una posición en el mapa primero' />
    } else {
      // Mostrar 
      componente = null;
    }
    return (
      <div className="page">
        <Container className='text-center'>
          <Card>
            <CardBody>
              <div class="row">
                <div class="col-xs-6 col-md-4">
                  <Card style={{ width: '100%' }}>
                    <CardImg top width="100%" src={userPhotoDoc} />
                  </Card>
                </div>
                <div class="col-xs-6 col-md-8">
                  <div class="contenedor center-h center-v others">
                    <h1>
                      <CardTitle top width="100%"> {userNameDoc} </CardTitle>
                    </h1>

                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 col-md-4">
                  <Card style={{ width: '100%', height: '13rem' }}>
                    <CardBody className='text-left'>
                      <CardText></CardText>
                      <CardText></CardText>
                      <CardTitle><h6>Información de contacto</h6></CardTitle>
                      <CardText>Correo: {userMailDoc} </CardText>
                      <CardText></CardText>
                      <CardText></CardText>
                      <CardText>Correo alternativo: {userMailAltDoc} </CardText>
                      <CardText></CardText>
                      <CardText></CardText>
                      <CardText>Telefono: {userTelephoneDoc} </CardText>
                    </CardBody>
                  </Card>
                  <Card style={{ width: '100%', height: '16rem' }}>
                    <CardBody className='text-left'>
                      <CardTitle><h6>Buscar dispositivo</h6></CardTitle>
                      <CardText>  Ingrese el identificador
                        <Input name="workerProfession" onChange={this.commonChange} />
                      </CardText>
                      <button type="button" class="btn btn-outline-primary" onClick={onSearch} >Buscar</button>
                      <CardBody className='text-center'>
                        {componente}
                      </CardBody>
                    </CardBody>
                  </Card>
                  <Card style={{ width: '100%', height: '10rem' }}>
                    <CardBody className='text-left'>
                      <CardTitle><h6>Dispositivos</h6></CardTitle>
                      <CardText></CardText>
                      <CardText></CardText>
                      <CardSubtitle>Profesión: {workerProfessionDoc} </CardSubtitle>
                      <CardText>  Eliminar dispositivo </CardText>
                      <button type="button" class="btn btn-outline-primary" onClick={onDelete} >Eliminar dispositivo</button>
                      <div id="loading" style={{ display: "none" }} >Cargando...</div>
                    </CardBody>
                  </Card>
                </div>
                <div class="col-xs-6 col-md-8">
                    <MapExample id="feedback-bg-info"/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
        {/* <WorkerElectricist/> */}
      </div>

    );
  }
}

export default withRouter(MyAccount);
