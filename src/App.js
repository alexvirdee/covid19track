import React from 'react';
import Axios from 'axios';
import './App.css';


export default class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const resApi = await Axios.get('https://covid19.mathdro.id/api');
    const resCountries = await Axios.get('https://covid19.mathdro.id/api/countries');
    const countries = Object.keys(resCountries.data.countries);

    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries
    });
  }

  renderCountryOptions() {
    return this.state.countries.map((country, i) => {
    return <option key={i}>{country}</option>
    });
  }

  render() {
    return (
      <div className="app">
      <div className="container">
        <div className="heading select-country">
        <h1>COVID-19 Stats</h1>
        <select>
          {this.renderCountryOptions()}
        </select>
        </div>
        <div className="row">
          <div className="flex">
            <div className="box confirmed">
              <h4>Confirmed Cases</h4>
              <h4>
                {this.state.confirmed
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h4>
            </div>
            <div className="box recovered">
              <h4>Recovered Cases</h4>
              <h4>
                {this.state.recovered
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h4>
            </div>
            <div className="box deaths">
              <h4>Deaths</h4>
              <h4>
                {this.state.deaths
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h4>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
