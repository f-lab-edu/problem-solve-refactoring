import _ from 'lodash';

const inputs = 'baekjoon'.trim().split('');

const map = new Map();

[...inputs].forEach((char) => {
  const value = map.get(char) ?? 0;

  map.set(char, value + 1);
});

const result = _.range(97, 123).map((i) => {
  const char = String.fromCharCode(i);
  const value = map.get(char);

  return value ?? 0;
});

console.log(result);
