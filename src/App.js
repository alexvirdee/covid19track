import React from 'react';
import Axios from 'axios';
import './App.css';

export default class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = await Axios.get('https://covid19.mathdro.id/api');

    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value
    });
  }

  render() {
    return (
      <div className="container">
         <h1>COVID-19 Stats</h1>
        <div className="row">
        <div className="flex">
        <div className="box confirmed">
            <h4>Confirmed Cases</h4>
            <h4>{this.state.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          </div>
          <div className="box recovered">
          <h4>Recovered Cases</h4>
            <h4>{this.state.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          </div>
          <div className="box deaths">
          <h4>Deaths</h4>
            <h4>{this.state.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
