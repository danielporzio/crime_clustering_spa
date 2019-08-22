import React from 'react';
import axios from 'axios';
import qs from 'qs';

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

  getCrimes = params => {
    this.setState({ clearClustersInfo: true });
    const crimesURL = `${Env.getCurrent().api.dataURL}/crimes`;
    axios
      .get(crimesURL, {
        headers: { 'Access-Control-Allow-Origin': '*' },
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
      .then(response => {
        this.setState({ crimes: response.data });
        this.setState({ clustersInfo: false });
      });
  };

  render() {
    return (
      <div className='dashboard-body'>
        <FilterMenu getCrimes={this.getCrimes}/>
        <Map crimes={this.state.crimes} clearClustersInfo={this.state.clearClustersInfo}/>
      </div>
    );
  }
}

export default Dashboard;
