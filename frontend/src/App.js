import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: '',
    district: '',
    carpark: '',
    districtResponse: '',
    carparkResponse: ''
  };

  async componentDidMount() {
    const url = "https://api.ibb.gov.tr/ispark/Park";
    const response = await fetch(url);

    const data = await response.json();

    this.setState({ data: data} )
  }

  handleDistrictSelection = async e => {

    e.preventDefault();

    const response = await fetch('/district', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.district }),
    });

    const body = await response.text();
    
    this.setState({ districtResponse: body });

  };

  handleCarParkSelection = async e => {

    e.preventDefault();

    const response = await fetch('/carpark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.carpark })
    });

    const body = await response.text();

    this.setState({ carparkResponse: body });

  }

  createDistrictOptions() {
    let districtList = [];

    for (var i in this.state.data) {
      districtList.push(<option key={i} value={this.state.data[i].Ilce}>{this.state.data[i].Ilce}</option>)
    }
    return districtList;
  }

  createCarParkOptions() {
    let carParkList = [];

    for (var i in this.state.data) {

      if (this.state.data[i].Ilce === this.state.district)
        carParkList.push(<option key={i} value={this.state.data[i].ParkAdi}>{this.state.data[i].ParkAdi}</option>)
    }

    return carParkList;
  }

  getFreeParkingSpaces() {
    let capacity = 0;

    for (var i in this.state.data) {

      if (this.state.data[i].ParkAdi === this.state.carpark)
        capacity = this.state.data[i].BosKapasite;
    }

    return capacity;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Ispark Car Parks
        </header>

        <form onSubmit={this.handleDistrictSelection}>
            <p>
              <strong>Districts of Car Parks:</strong>
            </p>
            <select value={this.state.district} onChange={e => this.setState({ district: e.target.value })}>
              {this.createDistrictOptions()}
            </select>
            <button type="submit">Select District</button>
        </form>

        <p>{this.state.districtResponse}</p>

        <form onSubmit={this.handleCarParkSelection}>
            <p>
              <strong>Car Parks:</strong>
            </p>
            <select value={this.state.carpark} onChange={e => this.setState({ carpark: e.target.value })}>
              {this.createCarParkOptions()}
            </select>
            <button type="submit">Select Car Park</button>
        </form>

        <p>{this.state.carparkResponse}</p>

        <p>
          <strong>Free Parking Spaces:</strong>
        </p>
        {this.getFreeParkingSpaces()}

      </div>
    );
  }
}

export default App;
