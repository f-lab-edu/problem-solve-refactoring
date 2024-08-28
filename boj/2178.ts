const fs = require('fs').readFileSync('/dev/stdin');
const inputs = fs.toString().trim().split('\n');
const [col, row] = inputs.shift().split(' ').map(Number);
const graph = inputs.map((row: string) => row.split('').map(Number));
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

  while (queue.length) {
    const [y, x] = queue.shift();

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
