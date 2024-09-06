import _ from 'lodash';
const input = require('node:fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const N = Number(input.shift());

//초기화
const graph = _.map(input, (line: string) => _.map(_.split(line, ' '), Number));
const dp = _.times(N, () => _.times(N, () => _.fill(Array(3), 0)));

const wallArr = _.range(N)
  .flatMap((j) => _.range(N).map((i) => [i, j]))
  .filter(([i, j]) => graph[j][i] === 1);

const getDPVal = memoize((x: number, y: number, type: number) => {
  switch (type) {
    case 0:
      dp[x][y][type] = go(x, y + 1, 0) + go(x + 1, y + 1, 2);
      break;
    case 1:
      dp[x][y][type] = go(x + 1, y, 1) + go(x + 1, y + 1, 2);
      break;
    case 2:
      dp[x][y][type] = go(x, y + 1, 0) + go(x + 1, y, 1) + go(x + 1, y + 1, 2);
      break;
  }

  return dp[x][y][type];
});

function memoize(f: (...args: number[]) => number) {
  const map = new Map();

  return (...args: number[]) => {
    const key = JSON.stringify(args);

    if (map.has(key)) {
      return map.get(key);
    }

    const result = f(...args);
    map.set(key, result);
    return result;
  };
}

function go(x: number, y: number, type: number) {
  //경계선을 벗어나는지 체크
  if (x === N || y === N) {
    return 0;
  }

  //벽과 겹치는지 체크
  for (const w of wallArr) {
    const [wy, wx] = w;
    if (type === 2) {
      if (
        (wx === x && wy === y) ||
        (wx === x - 1 && wy === y) ||
        (wx === x && wy === y - 1)
      )
        return 0;
    } else {
      if (wx === x && wy === y) return 0;
    }
  }

  //원하는 지점에 도달햇는지 체크
  if (x === N - 1 && y === N - 1) {
    return 1;
  }

  return getDPVal(x, y, type);
}
go(0, 1, 0);
console.log(dp[0][1][0]);
