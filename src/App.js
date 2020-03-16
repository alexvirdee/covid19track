import React from 'react';
import Axios from 'axios';

export default class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = await Axios.get('https://covid19.mathdro.id/api');

    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
    });

  }

  render() {
    return (<div>App</div>)
  }
}