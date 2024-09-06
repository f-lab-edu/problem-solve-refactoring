import _ from 'lodash';

const inputs = 'baekjoon'.trim().split('');

const map = new Map();

[...inputs].forEach((char) => {
  if (map.has(char)) {
    map.set(char, map.get(char) + 1);
  } else {
    map.set(char, 1);
  }
});

const result = _.range(97, 123).map((i) => {
  const char = String.fromCharCode(i);
  return map.has(char) ? map.get(char) : 0;
});

console.log(result);
