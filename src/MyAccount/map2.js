import React, { Component } from 'react';
import { Map as Map,TileLayer, Marker, Popup } from 'react-leaflet';
import "../MyAccount/map2.css";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
import firebase from 'firebase'

const db = firebase.firestore();
var subget=JSON.parse('{"lat": 6.26739785475676,"lng":-75.56881427764894}');
var greenIcon = L.icon({
    iconUrl: icon,
    //shadowUrl: shadow,

    iconSize: [80, 80], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const styles = {
    wrapper: { 
      height: '100%', 
      width: '100%', 
      margin: '0 auto', 
      display: 'flex' 
    },
    map: {
      flex: 1
    } 
  };

let Ref = db.collection('devices').doc('dispositivo1');
let getDoc = Ref.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      subget=doc.data();
      console.log('esta es la latitud: ', subget.lat);
      console.log('esta es la longitud: ', subget.lng);
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
});


class MapExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
        currentPos: null,
        subget: JSON.parse('{"lat": 6.26739785475676,"lng":-75.56881427764894}')
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){

    }
    componentDidMount() {
      this.interval = window.setInterval(() => this.setState({ subget: JSON.parse('{"lat": 6.26739785475676,"lng":-75.56881427764894}') }), 10);
    }
    componentWillUnmount() {
      window.clearInterval(this.interval);
    }
    render() {
        return (
        <div style={styles.wrapper}>
                <Map    style={styles.map}
                        center={[subget.lat,subget.lng]}
                        zoom={16}
                        maxZoom={20}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                        onClick={this.handleClick}>
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    while (true) {
                    <Marker 
                            draggable='true'
                            icon={greenIcon}
                            position={[subget.lat, subget.lng]}

                        />
                      }
                </Map>
        </div>
        )
    }
}
export default MapExample;