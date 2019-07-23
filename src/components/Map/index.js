import React from 'react';
import MapGL, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import equal from 'fast-deep-equal';

import createRandomColor from '../../data/clusterColors.js';
import MapPin from '../MapPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVscG9yemlvIiwiYSI6ImNqdTcwcGx0azFwaHk0ZGxvcWxmYmU5eHIifQ.Bg7h34qDDBTzzGOvtfm6TQ';
const NOISE_COLOR = '#000';

class Map extends React.Component {
  constructor(props) {
    super();

    this.state = {
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      viewport: {
        latitude: 41.878113,
        longitude: -87.629799,
        zoom: 8,
      },
      colors: {},
      markers: props.crimes.map(this.renderMarker)
    };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.crimes, prevProps.crimes)) {
      this.setState({ markers: this.props.crimes.map(this.renderMarker) });
    }
  }

  _onViewportChange = viewport => this.setState({ viewport });

  renderMarker = (crime, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={crime.longitude}
        latitude={crime.latitude} >
        <MapPin size={5} color={this.colorizeCluster(crime.label)}/>
      </Marker>
    );
  }

  colorizeCluster = (clusterNumber) => {
    let colorsAvailable = this.state.colors;
    if (clusterNumber === -1) {
      return NOISE_COLOR;
    }
    if (!colorsAvailable[clusterNumber]) {
      colorsAvailable[clusterNumber] = createRandomColor();
    } else {
      return colorsAvailable[clusterNumber];
    }
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

          { this.state.markers }

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
