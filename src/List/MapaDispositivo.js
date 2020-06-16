import React, { useState } from 'react';
import "../Home/Albanil.css";
import { Container } from 'reactstrap';
import firebase from "../firebase";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
import {
    Card, CardText, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';
var name;
var profession;
var mail;
var wid;
var foto;
var tel;
const axios = require('axios');
var greenIcon = L.icon({
    iconUrl: icon,
    //shadowUrl: shadow,

    iconSize: [80, 80], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const onE = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(profession);
    var user = firebase.auth().currentUser;
    const querystring = require('querystring');
    axios.post('https://microservicio-dominio.herokuapp.com/Solicitud', querystring.stringify({
        uid: user.uid,
        wname: name,
        wprofession: profession,
        wmail: mail,
        wphoto: foto,
        wid: wid,
        wtel: tel
    }))
        .then(function (res) {
            if (res.status == 200) {
                //mensaje.innerHTML = 'El nuevo Post ha sido almacenado con id: ' + res;
                window.location.href = "/pedidos";
                console.log(res.status);
            }
        }).catch(function (err) {
            console.log(err);
        })
        .then(function () {

        });

}
function MapExample() {

    const [Dispositivos, setDispositivos] = React.useState([])
    const [activeDisp, setActiveDisp] = React.useState(null);
    var idDisp = window.localStorage.getItem("IDDispositivo");


    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('dispositivos').where("id", "==", window.localStorage.getItem("IDDispositivo")).get()
            setDispositivos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])
    

    return (
        <div className="App">
            <Container className='text-left'>                
                <Map center={[6.267417, -75.568389]} zoom={15}>
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
                                        <CardTitle>Carga: {activeDisp.Carga}</CardTitle>                                        
                                    </CardBody>
                                </Card>
                            </div>
                        </Popup>
                    )}
                </Map>
            </Container>
        </div>
    );
}

export default MapExample; 