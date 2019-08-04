import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import equal from 'fast-deep-equal';

import { groupBy, createRandomColor } from '../../utilities/helpers.js';
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
      markers: this.displayCrimes(props.crimes),
      colors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.crimes, prevProps.crimes)) {
      this.setState({ markers: this.displayCrimes(this.props.crimes) });
    }
  }

  displayCrimes = crimes => {
    const groupedCrimes = groupBy(crimes, 'label');
    return Object.keys(groupedCrimes).map( clusterId => {
      return this.renderLayer(clusterId, groupedCrimes[clusterId]);
    });
  }

  renderLayer = (label, crimes) => {
    return (
      <Layer
        key={label}
        type="circle"
        paint= {{
          'circle-radius': {
            'base': 1,
            'stops': [[9, 1], [13, 2]]
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
        coordinates={[crime.longitude, crime.latitude]}
        key={`marker-${index}`}
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
    const mapParams = {
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      latitude: 41.791832,
      longitude: -87.623177,
      zoom: [9]
    };

    return (
      <MapBox
        container= 'map'
        style= {mapParams.mapStyle}
        zoom= {mapParams.zoom}
        center= {[mapParams.longitude, mapParams.latitude]}
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
