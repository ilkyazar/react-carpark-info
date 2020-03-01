import React, { Component } from 'react';
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class App extends Component {
  state = {
    data: '',
    district: '',
    ParkID: 0
  };

  async componentDidMount() {
    const response = await fetch('/api/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const body = await response.json();

    this.setState({ data: body });
  }

  createDistrictOptions() {
    let districtList = [];

    for (var i in this.state.data) {
      districtList.push(this.state.data[i].Ilce);
    }

    districtList = [...new Set(districtList)];

    let uniqueDistrictOptions = [];

    for (var j in districtList) {
      uniqueDistrictOptions.push(<option key={j} value={districtList[j]}>{districtList[j]}</option>)
    }

    return uniqueDistrictOptions;
  }

  createCarParkOptions() {
    let carParkList = [];

    for (var i in this.state.data) {
      if (this.state.data[i].Ilce === this.state.district)
        carParkList.push(<option key={i} value={this.state.data[i].ParkID}>{this.state.data[i].ParkAdi}</option>)
    }

    return carParkList;
  }

  getFreeParkingSpaces() {
    let capacity = 0;

    for (var i in this.state.data) {
      if (Number(this.state.data[i].ParkID) === Number(this.state.ParkID)) {
        capacity = this.state.data[i].BosKapasite;
      }
    }

    return capacity;
  }

  getUsedParkingSpaces() {
    let capacity = 0;
    let freeCapacity = 0;

    for (var i in this.state.data) {

      if (Number(this.state.data[i].ParkID) === Number(this.state.ParkID)) {
        freeCapacity = this.state.data[i].BosKapasite;
        capacity = this.state.data[i].Kapasitesi;
      }
    }

    return capacity - freeCapacity;
  }

  getLatitude() {
    let lat = 40.96;

    for (var i in this.state.data) {

      if (Number(this.state.data[i].ParkID) === Number(this.state.ParkID)) {
        lat = this.state.data[i].Latitude;
      }
    }

    return lat;
  }

  getLongitude() {
    let lon = 29.10;

    for (var i in this.state.data) {

      if (Number(this.state.data[i].ParkID) === Number(this.state.ParkID)) {
        lon = this.state.data[i].Longitude;
      }
    }

    return lon;

  }

  render() {
    const CarParkLocation = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={ 15 }
        defaultCenter={{ lat: props.lat, lng: props.lon }}
      >
        { props.showMarker && 
          <Marker position={{ lat: props.lat, lng: props.lon }} />
        }
      </GoogleMap>
    ))

    const DistrictSelectionForm = () =>
        <form>
            <p>
              <strong>Districts of Car Parks:</strong>
            </p>
            <select
              value={this.state.district}
              onChange={e => this.setState({ district: e.target.value })}>
                  <option value="">Select a district</option>
                  {this.createDistrictOptions()}
            </select>
            
        </form>

    const CarParkSelectionForm = () => 
        <form>
            <p>
              <strong>Car Parks:</strong>
            </p>
            <select
              value={this.state.ParkID}
              onChange={e => this.setState({ ParkID: e.target.value })}>
                  {!this.state.district && <option value="">Please select a district first</option>}
                  {this.state.district && <option value="">Select a car park</option>}
                  {this.createCarParkOptions()}
            </select>
            
        </form>

    return (
      <div className="App">
        <header className="App-header">
          Ispark Car Parks
        </header>

        <DistrictSelectionForm/>

        <CarParkSelectionForm/>

        <p>
          <strong>Free Parking Spaces:</strong>
        </p>

        {this.getFreeParkingSpaces()} ({this.getUsedParkingSpaces()} used)

        <p>
          <strong>Location of the Car Park:</strong>
        </p>

        <CarParkLocation
          showMarker="true"
          lon={Number(this.getLongitude())}
          lat={Number(this.getLatitude())}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '500px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      
      </div>
    );
  }
}

export default App;
