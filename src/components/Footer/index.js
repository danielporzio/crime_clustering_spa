import React from 'react';
import './styles.scss';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='footer'>
        <span className='footer__legend'>
          Proyecto de grado 2019 - Facultad de Ingeniería de la UdelaR
        </span>
      </div>
    );
  }
}

export default Footer;
