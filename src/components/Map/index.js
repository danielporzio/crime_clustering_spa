import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import equal from 'fast-deep-equal';

import createRandomColor from '../../data/clusterColors.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVscG9yemlvIiwiYSI6ImNqdTcwcGx0azFwaHk0ZGxvcWxmYmU5eHIifQ.Bg7h34qDDBTzzGOvtfm6TQ';
const NOISE_COLOR = '#000';

const MapBox = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

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
      markers: this.displayCrimes(props.crimes),
      colors: {}
    };

    this.map = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.crimes, prevProps.crimes)) {
      console.log('update y crimes distintos')
      this.setState({ markers: this.displayCrimes(this.props.crimes) });
    }
  }

  _onViewportChange = viewport => this.setState({ viewport });

  groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  displayCrimes = crimes => {
    const groupedCrimes = this.groupBy(crimes, 'label');
    const res = Object.keys(groupedCrimes).map( clusterId => {
      return this.renderLayer(clusterId, groupedCrimes[clusterId]);
    });
    return res;
  }

  generateLayers = crimes => {

  }

  renderLayer = (label, crimes) => {
    return (
      <Layer
        id= {label}
        key={label}
        type="circle"
        paint= {{
          // make circles larger as the user zooms from z12 to z22
          'circle-radius': {
            'base': 1.75,
            'stops': [[12, 2], [22, 180]]
          },
          'circle-color': this.colorizeCluster(label)
        }}
      >
        {
          crimes.map(crime => {
            return this.renderMarker(crime);
          })
        }
      </Layer>
    );
  }

  renderMarker = (crime, index) => {
    return (
      <Feature
        id={index}
        coordinates={[crime.longitude, crime.latitude]}
        key={`marker-${index}`}
        properties= {{
          color: '#e55e5e'
        }}
      />
    );
  }

  colorizeCluster = clusterNumber => {
    const colorsAvailable = this.state.colors;
    if (clusterNumber === -1) {
      return NOISE_COLOR;
    }
    if (!colorsAvailable[clusterNumber]) {
      colorsAvailable[clusterNumber] = createRandomColor();
    }
    return colorsAvailable[clusterNumber];
  }

  render() {
    const { mapStyle, viewport } = this.state;

    // <div className='map-wrapper'>
    //   <MapGL
    //     {...viewport}
    //     width='100%'
    //     height='100%'
    //     mapStyle={mapStyle}
    //     onViewportChange={this._onViewportChange}
    //     mapboxApiAccessToken={MAPBOX_TOKEN} >
    //
    //     { this.state.markers }
    //
    //     <div className="fullscreen-control__wrapper">
    //       <FullscreenControl />
    //     </div>
    //     <div className="nav-control__wrapper">
    //       <NavigationControl onViewportChange={this._onViewportChange} />
    //     </div>
    //   </MapGL>
    // </div>

    // <Layer
    //   id= 'population'
    //   type="circle"
    //   source-layer= 'sf2010'
    //   source= {{
    //     type: 'vector',
    //     url: 'mapbox://examples.8fgz4egr'
    //   }}
    //   paint= {{
    //     // make circles larger as the user zooms from z12 to z22
    //     'circle-radius': {
    //       'base': 1.75,
    //       'stops': [[12, 2], [22, 180]]
    //     },
    //     // color circles by ethnicity, using a match expression
    //     // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
    //     'circle-color': '#e55e5e'
    //   }}
    // >
    // </Layer>
    return (
      <MapBox
        ref={this.map}
        container= 'map'
        style= 'mapbox://styles/mapbox/light-v10'
        zoom= {[9]}
        center= {[-87.629799, 41.878113]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        { this.state.markers }
      </MapBox>
    );
  }
}

export default Map;
