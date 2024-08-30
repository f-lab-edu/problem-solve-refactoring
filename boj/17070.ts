const input = require('node:fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const N = Number(input.shift());

//초기화
const graph = [];
for (let i = 0; i < N; i++) {
  graph.push(input[i].split(' ').map(Number));
}
const dp = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => Array(3).fill(0))
);
const wallArr: [number, number][] = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1) {
      wallArr.push([j, i]);
    }
  }
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

  //메모이제이션
  if (dp[x][y][type] !== 0) {
    return dp[x][y][type];
  }
  /*
    type에 따라 갈 수 있는 방향이 다르다
    0: 가로 / 1: 세로 / 2: 대각선
    **/
  switch (type) {
    case 0:
      dp[x][y][0] = go(x, y + 1, 0) + go(x + 1, y + 1, 2);
      break;
    case 1:
      dp[x][y][1] = go(x + 1, y, 1) + go(x + 1, y + 1, 2);
      break;
    case 2:
      dp[x][y][2] = go(x, y + 1, 0) + go(x + 1, y, 1) + go(x + 1, y + 1, 2);
      break;
  }
  return dp[x][y][type];
}
go(0, 1, 0);
console.log(dp[0][1][0]);
