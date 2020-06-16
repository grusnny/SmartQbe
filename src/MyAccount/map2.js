import React, { Component } from 'react';
import { Map as Map,TileLayer, Marker, Popup } from 'react-leaflet';
import "../MyAccount/map2.css";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
var subget=JSON.parse('{"lat": 6.26739785475676,"lng":-75.56881427764894}');;
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
class MapExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
        currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        var mqtt    = require('mqtt');
        var client  = mqtt.connect('wss://mqtt.flespi.io',{
        will: {
            topic: 'test',
            qos: 1,
            retain: true,
            properties: {
            willDelayInterval: 120 /* MQTT 5.0 property saying how many seconds to wait before publishing the LWT message */
            }
        },
        username: 'FlespiToken fmZr12yVuqMjLEBr3n2FLPINBPzRBmpGweVn4k7oAHybbXr38hyKW4nlKK3bXgFj'
        });
        console.log('mqtt client created, connecting...');

        client.on('connect', () => {
        console.log('connected, subscribing to "Dispositivo1/GPS" topic...');

        client.subscribe('Dispositivo1/GPS', {qos: 1}, (err) => {
            if (err) {
            console.log('failed to subscribe to topic "Dispositivo1/GPS":', err);
            return;
            }
        });
        });

        client.on('message', (topic, msg) => {
        subget=JSON.parse(msg.toString('utf8'));
        console.log(`received message in topic "${topic}": "${msg.toString('utf8')}"`);
        console.log('disconnecting...');
        client.end();
        });
        
        client.on('message', (topic, msg) => {
        subget=JSON.parse(msg.toString('utf8'));
        console.log(`received message in topic "${topic}": "${msg.toString('utf8')}"`);
        console.log('disconnecting...');
        client.end();
    });
        client.on('close', () => {
        console.log('disconnected');
        })
        
        client.on('error', (err) => {
        console.log('mqtt client error:', err);
        client.end(true) // force disconnect and stop the script
        });

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
                    <Marker
                            draggable='true'
                            icon={greenIcon}
                            position={[subget.lat, subget.lng]}

                        />
                </Map>
        </div>
        )
    }
}
export default MapExample;