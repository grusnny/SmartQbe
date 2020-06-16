import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase'
import {
  Card, CardImg, CardText, CardBody, Input,
  CardTitle, CardSubtitle, Container,
} from 'reactstrap';
import "../MyAccount/MyAccount.css";
import MapExample from './sensor_map';
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

    window.localStorage.setItem("userLatDoc", 0);
    window.localStorage.setItem("userLngDoc", 0);

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
                  <MapExample />
            </CardBody>
          </Card>
        </Container>
        {/* <WorkerElectricist/> */}
      </div>

    );
  }
}

export default withRouter(MyAccount);
