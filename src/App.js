import React from 'react';
import Axios from 'axios';
import './App.css';

import Virus from './img/coronavirus.jpg';
import Moment from 'react-moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getCountryData = this.getCountryData.bind(this);
  }

  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: [],
    lastUpdate: ''
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const resApi = await Axios.get('https://covid19.mathdro.id/api');
    const resCountries = await Axios.get(
      'https://covid19.mathdro.id/api/countries'
    );
    const countries = Object.keys(resCountries.data.countries);
    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries,
      lastUpdate: resApi.data.lastUpdate
    });
  }

  async getCountryData(e) {
    if (e.target.value === 'Worldwide') {
      return this.getData();
    }
    try {
      const res = await Axios.get(
        `https://covid19.mathdro.id/api/countries/${e.target.value}`
      );
      this.setState({
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value
      });
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({
          confirmed: 'No data available',
          recovered: 'No data avilable',
          deaths: 'No data available'
        });
      }
    }
  }

  renderCountryOptions() {
    return this.state.countries.map((country, i) => {
      return <option key={i}>{country}</option>;
    });
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="heading select-country">
            <h1>COVID-19 Stats</h1>
            <select onChange={this.getCountryData}>
              <option>Worldwide</option>
              {this.renderCountryOptions()}
            </select>
          </div>
          <div className="box infection-info">
            <h4>Incubation Period: 2-14 days after exposure 🦠</h4>
            <img alt="virus" src={Virus}></img>
            <h5 className="virus-heading">
              Type: Zoonotic - Transmitted between animals and peoples
            </h5>
            <h6 className="last-update">
              Last Update:{' '}
              <Moment format={this.state.lastUpdate.fromNow}>ago</Moment>{' '}
            </h6>
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
