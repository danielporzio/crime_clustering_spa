import React from 'react';
import axios from 'axios';

import FilterMenu from '../FilterMenu';
import Map from '../Map';

import './styles.scss';

const CRIMES_ENDPOINT_URL = 'https://crime-clustering-staging.herokuapp.com/crimes/';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      crimes: []
    };
  }

  getCrimes = () => {
    axios.get(CRIMES_ENDPOINT_URL,
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
