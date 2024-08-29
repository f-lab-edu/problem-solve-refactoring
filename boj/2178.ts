const fs = require('fs').readFileSync('/dev/stdin');
const inputs = fs.toString().trim().split('\n');
const [col, row] = inputs.shift().split(' ').map(Number);
const graph = inputs.map((row: string) => row.split('').map(Number));

// 숨어있는 지켜줘야하는 규칙
// const dy = [-1, 0, 1, 0];
// const dx = [0, 1, 0, -1];
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function bfs() {
  const queue = [[0, 0]];
  let distance = Array.from({ length: col }, () => new Array(row).fill(0));
  distance[0][0] = 1;

  // 맞긴한데, 스스로 맞다는걸 설득못하는 코드
  //   while (queue.length) {
  //     const [y, x] = queue.shift();
  while (true) {
    const d = queue.shift();
    if (!d) return;

    const [y, x] = d;

    if (y === col - 1 && x === row - 1) {
      console.log(distance[y][x]);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + direction[i][0];
      const nx = x + direction[i][1];

      if (nx < 0 || ny < 0 || ny >= col || nx >= row) continue;
      if (distance[ny][nx] === 0 && graph[ny][nx] !== 0) {
        distance[ny][nx] = distance[y][x] + 1;

        queue.push([ny, nx]);
      }
    }
  }
}

bfs();
