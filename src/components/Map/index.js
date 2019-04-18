import React from 'react';
import MapGL from 'react-map-gl';
import './styles.scss';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVscG9yemlvIiwiYSI6ImNqdTcwcGx0azFwaHk0ZGxvcWxmYmU5eHIifQ.Bg7h34qDDBTzzGOvtfm6TQ';

class Map extends React.Component {
  state = {
    mapStyle: '',
    viewport: {
      latitude: 37.805,
      longitude: -122.447,
      zoom: 15.5,
      bearing: 0,
      pitch: 0,
    },
  }

  _onViewportChange = viewport => this.setState({ viewport });

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { viewport, mapStyle } = this.state;

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
