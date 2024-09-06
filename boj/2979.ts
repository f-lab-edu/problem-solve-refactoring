import _ from 'lodash';

const inputs = require('node:fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [A, B, C] = inputs.shift().split(' ').map(Number);
const parkingTimes = inputs.map((e: string) => e.split(' ').map(Number));
const time = _.times(100, () => 0);
let answer = 0;

_.forEach(parkingTimes, ([start, end]) => {
  _.forEach(_.range(start, end), (i) => {
    time[i] += 1;
  });
});

_.forEach(time, (e) => {
  if (e === 1) {
    answer += A;
    return;
  }

  if (e === 2) {
    answer += B * 2;
    return;
  }

  if (e === 3) {
    answer += C * 3;
    return;
  }
});

console.log(answer);
