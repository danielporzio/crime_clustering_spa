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

const NOISE_COLOR = '#000';

function colorCluster(cluster) {
  if (!cluster){
    return NOISE_COLOR;
  }
  if (cluster > COLORS.length) {
    return '#ee192d';
  } else {
    return COLORS[cluster];
  }
}

export default colorCluster;
