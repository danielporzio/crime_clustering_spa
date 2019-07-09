import React from 'react';
import axios from 'axios';

import { Environment as Env } from '../../config.js';
import FilterMenu from '../FilterMenu';
import Map from '../Map';

import './styles.scss';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      crimes: []
    };
  }

  getCrimes = () => {
    const crimesURL = `${Env.getCurrent().api.dataURL}/crimes`;
    axios.get(crimesURL,
      { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(response => {
        this.setState({ crimes: response.data });
      });
  };

  render() {
    return (
      <div className='dashboard-body'>
        <FilterMenu getCrimes={this.getCrimes}/>
        <Map crimes={this.state.crimes}/>
      </div>
    );
  }
}

export default Dashboard;
