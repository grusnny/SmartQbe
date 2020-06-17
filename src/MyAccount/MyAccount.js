import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MapExample from "../MyAccount/map2"
import firebase from 'firebase'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
import {
  Card, CardImg, CardText, CardBody, Input,
  CardTitle, CardSubtitle, Container,
} from 'reactstrap';
import "../MyAccount/MyAccount.css";
import Error from '../Components/error';
import Pedidos from '../List/pedidos'
var latitud=6.267417;
var longitud=-75.568389;
const db = firebase.firestore()
var greenIcon = L.icon({
    iconUrl: icon,
    //shadowUrl: shadow,

    iconSize: [80, 80], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const axios = require('axios');
function MyAccount() {
  


    const db = firebase.firestore();

    var usuario = JSON.parse(localStorage.getItem("data"));
    console.log(usuario.user.uid);
    let userRef = db.collection('user').doc(usuario.user.uid);
    let query1 = userRef.get()
      .then(doc => {
        if (!doc.exists) {
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

    const [Dispositivos, setDispositivos] = React.useState([])
    const [activeDisp, setActiveDisp] = React.useState(null);
    var idDisp = window.localStorage.getItem("IDDispositivo");

    let citiesRef = db.collection('dispositivos');
    let query = citiesRef.where('id', '==', window.localStorage.getItem("IDDispositivo")).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      if(doc.data().lat!=undefined && doc.data().lon!=undefined){
          latitud=doc.data().lat;
          longitud=doc.data().lon;
      }
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('dispositivos').where("id", "==", window.localStorage.getItem("IDDispositivo")).get()
            

            setDispositivos(data.docs.map(doc => ({ ...doc.data(), Id: doc.id })))
        }
        fetchData()
    }, [])

    const onDelete = () => {

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
                      <Pedidos/>
                    </CardBody>
                  </Card>
                  <Card style={{ width: '100%', height: '10rem' }}>
                    <CardBody className='text-left'>
                      <CardTitle><h6>Dispositivos</h6></CardTitle>
                      <CardText></CardText>
                      <CardText></CardText>
                      <CardText>  Eliminar dispositivo </CardText>
                      <button type="button" class="btn btn-outline-primary" onClick={onDelete} >Eliminar dispositivo</button>
                      <div id="loading" style={{ display: "none" }} >Cargando...</div>
                    </CardBody>
                  </Card>
                </div>
                <div class="col-xs-6 col-md-8">
                  <div className="App">
                    <Container className='text-left'> 
   
                        <Map center={[latitud, longitud]} zoom={15}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                              {Dispositivos.map(element =>
                                <Marker
                                    key={element.id}
                                    icon={greenIcon}
                                    position={[element.lat, element.lon]}
                                    onDblclick={() => {
                                        setActiveDisp(element);
                                    }}
                                />
                                )}
                            {activeDisp && (
                                <Popup
                                    position={[
                                        activeDisp.lat,
                                        activeDisp.lon
                                    ]}
                                    onClose={() => {
                                        setActiveDisp(null);
                                    }}
                                >
                                    <div>
                                        <Card style={{ width: '12rem' }}>
                                            <CardBody>
                                              <CardTitle>Id: {activeDisp.id}</CardTitle>  
                                              <CardTitle>Peso de carga: {activeDisp.Carga}</CardTitle>
                                              <CardTitle>Temperatura: {activeDisp.temp}</CardTitle>                                        
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Popup>
                            )}
                        </Map>
                    </Container>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
        {/* <WorkerElectricist/> */}
      </div>

    );
}

export default MyAccount;
