import React from 'react';

import './styles.scss';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar__title'>
          Chicago crime data
        </div>
        <div className='navbar__separator'></div>
      </div>
    );
  }
}

export default NavBar;
