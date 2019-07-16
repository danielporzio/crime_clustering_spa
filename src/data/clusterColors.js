let colors = {};

const NOISE_COLOR = '#000';

const COLORS = [
  '#ffdeed',
  '#e37e19',
  '#ffff00',
  '#00ffb0',
  '#138808',
  '#00a0e5',
  '#0675f3',
  '#792473'
];

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
  if (cluster === -1) {
    return NOISE_COLOR;
  }
  if (cluster > COLORS.length) {
    return '#ee192d';
  } else {
    return COLORS[cluster];
  }
  if (!colors[cluster]) {
    return createRandomColor();
  }
  else {
    return colors[cluster];
  }
}

export default colorCluster;
