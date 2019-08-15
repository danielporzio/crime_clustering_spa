import React from 'react';
import './styles.scss';

function MapLegend({ clustersInfo }) {
  const clusterIds = Object.keys(clustersInfo);
  if (clusterIds.length == 0) {
    return null;
  }
  return (
    <div className='map-legend__wrapper'>
      {
        clusterIds.map(clusterId => {
          return (
            <div className='map-legend__cluster'>
              <div
                className='map-legend__cluster-color'
                style={{ backgroundColor: clustersInfo[clusterId].color }}>
              </div>
              <span className='map-legend__cluster-text' key={clusterId}>
                {clustersInfo[clusterId].criminality}
              </span>
            </div>
          );
        })
      }
    </div>
  );
}

export default MapLegend;
