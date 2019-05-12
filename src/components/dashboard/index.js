import React from 'react';

import FilterMenu from '../FilterMenu';
import Map from '../Map';
import './styles.scss';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='dashboard-body'>
        <FilterMenu/>
        <Map/>
      </div>
    );
  }
}

export default Dashboard;
