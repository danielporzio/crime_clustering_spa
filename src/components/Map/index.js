import React from 'react';
import MapGL from 'react-map-gl';
import './styles.scss';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVscG9yemlvIiwiYSI6ImNqdTcwcGx0azFwaHk0ZGxvcWxmYmU5eHIifQ.Bg7h34qDDBTzzGOvtfm6TQ';

class Map extends React.Component {
  _onViewportChange = viewport => this.setState({ viewport });

  constructor() {
    super();

    this.state = {
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      viewport: {
        latitude: 41.878113,
        longitude: -87.629799,
        zoom: 8,
      },
    };
  }

  render() {
    const { mapStyle, viewport } = this.state;

    return (
      <div className='map-wrapper'>
        <MapGL
          {...viewport}
          width='100%'
          height='100%'
          mapStyle={mapStyle}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </div>
    );
  }
}

export default Map;
