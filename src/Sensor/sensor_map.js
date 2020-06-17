import React, { Component } from 'react';
import { Map as Map,TileLayer, Marker, Popup } from 'react-leaflet';
import "../MyAccount/map2.css";
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {
  Card, CardImg, CardText, CardBody, Input,
  CardTitle, CardSubtitle, Container,
} from 'reactstrap';
var Slider1=30;
var Slider2=30;
var id="default";
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
  function valuetext1(value) {
    Slider1=value;
    return `${value}°C`;
  }
  function valuetext2(value) {
    Slider2=value;
    return `${value}°C`;
  }
class SensorMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.commonChange = this.commonChange.bind(this);
    }
  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    id=event.target.value;

  }  
handleClick(e){
    this.setState({ currentPos: e.latlng });
    const { lat, lng } = e.latlng;
    console.log(lat, lng);
    console.log(Slider1);
    console.log(Slider2);
    console.log(id);
    window.localStorage.setItem("userLatDoc", lat);
    window.localStorage.setItem("userLngDoc", lng);
    var subget = null;
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
        console.log('subscribed to "Dispositivo1/GPS" topic, publishing message...');
        client.publish('Dispositivo1/GPS', '{"lat": '+lat+',"lng": '+lng+'}', {qos: 1});
      });
    });

    client.on('message', (topic, msg) => {
      console.log(`received message in topic "${topic}": "${msg.toString('utf8')}"`);
      console.log('disconnecting...');
      client.end();
    });

    client.on('message', (topic, msg) => {
      subget=JSON.parse(msg.toString('utf8'));
      console.log(`received message in topic "${topic}": "${msg.toString('utf8')}"`);
      console.log('disconnecting...');

      const db = firebase.firestore();

      let data = {
        Carga:Slider2,
        id:id,
        lat: subget.lat,
        lon: subget.lng,
        temp: Slider1,     
       
      };
    
      // Add a new document in collection "cities" with ID 'LA'
      let setDoc = db.collection('dispositivos').doc().set(data);

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
        <div>
        <div style={styles.wrapper}>
                <Map    style={styles.map}
                        center={[6.26739785475676,-75.56881427764894]}
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
                    { this.state.currentPos && <Marker position={this.state.currentPos} draggable={true}>
                    <Popup position={this.state.currentPos}>
                        Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                    </Popup>
                    </Marker>}
                </Map>
        </div>
        <div class="row">
          <div class="col-xs-6 col-md-4">
          <Typography id="discrete-slider" gutterBottom>
            Temperatura
          </Typography>
          <Slider
            defaultValue={30}
            getAriaValueText={valuetext1}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
          </div>
          <div class="col-xs-6 col-md-4">
          <Typography id="discrete-slider" gutterBottom>
            Carga
          </Typography>
          <Slider
            defaultValue={30}
            getAriaValueText={valuetext2}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
          </div>
          <div class="col-xs-6 col-md-4">
          <Typography id="discrete-slider" gutterBottom>
            Identificador
          </Typography>
          <Input name="workerProfession" onChange={this.commonChange} />
          </div>
        </div>
        </div>
        )
    }
}
export default SensorMap;