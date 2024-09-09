import _ from 'lodash';

const inputs = 'baekjoon'.trim().split('');

const map = new Map();

[...inputs].forEach((char) => {
  const value = map.get(char);

  if (value) {
    map.set(char, value + 1);
  } else {
    map.set(char, 1);
  }
});

const result = _.range(97, 123).map((i) => {
  const char = String.fromCharCode(i);
  return map.has(char) ? map.get(char) : 0;
});

console.log(result);
