import React from 'react';
import MapGL, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';

import colorCluster from '../../data/ClusterColors.js';
import MapPin from '../MapPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVscG9yemlvIiwiYSI6ImNqdTcwcGx0azFwaHk0ZGxvcWxmYmU5eHIifQ.Bg7h34qDDBTzzGOvtfm6TQ';

class Map extends React.Component {
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

  _onViewportChange = viewport => this.setState({ viewport });

  _renderMarker = (crime, index) => {

    return (
      <Marker
        key={`marker-${index}`}
        longitude={crime.longitude}
        latitude={crime.latitude} >
        <MapPin size={5} color={colorCluster(crime.cluster)}/>
      </Marker>
    );
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
          mapboxApiAccessToken={MAPBOX_TOKEN} >

          { this.props.crimes.map(this._renderMarker) }

          <div className="fullscreen-control__wrapper">
            <FullscreenControl />
          </div>
          <div className="nav-control__wrapper">
            <NavigationControl onViewportChange={this._onViewportChange} />
          </div>
        </MapGL>
      </div>
    );
  }
}

export default Map;
