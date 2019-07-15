let colors = {};

const NOISE_COLOR = '#000';

function createRandomColor(cluster) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  colors[cluster] = color;
  return color;
}

function colorCluster(cluster) {
  if (!cluster){
    return NOISE_COLOR;
  }
  if (!colors[cluster]) {
    return createRandomColor();
  }
  else {
    return colors[cluster];
  }
}

export default colorCluster;
