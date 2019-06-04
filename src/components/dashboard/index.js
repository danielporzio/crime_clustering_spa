import React from 'react';
import axios from 'axios'

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
    console.log('exito!');
    // axios.get('https://api.github.com/users/maecapozzi')
    //   .then(response => console.log(response))
    this.state.crimes = [];
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
