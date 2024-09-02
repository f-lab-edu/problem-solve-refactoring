import _ from 'lodash';
const fs = require('node:fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
const graph = input.map((v: string) => {
  return v.split(' ').map(Number);
});

const dp = _.times(N, () => _.times(1 << N, () => 0));

function dfs(x: number, visited: number) {
  //종료조건: 모두 방문했고 경로가 있다면 현재지점에서 출발점으로의 비용 반환
  if (visited === (1 << N) - 1) {
    if (graph[x][0] === 0) {
      return Number.POSITIVE_INFINITY;
    }
    return graph[x][0];
  }
  //메모이제이션: 현재 지점과 방문한 지점을 기록
  if (dp[x][visited] !== 0) {
    return dp[x][visited];
  }
  dp[x][visited] = Number.POSITIVE_INFINITY;

  //메인로직: 현재 지점에서 가능한 모든 경로순회
  _.forEach(_.range(1, N), (i) => {
    // 경로가 없거나 이미 방문한 지점이라면
    if (graph[x][i] === 0 || visited & (1 << i)) return;

    //메모이제이션된 값과 비교
    dp[x][visited] = Math.min(
      dp[x][visited],
      //현재지점과 방문지점을 갱신 + 이후 만들어질 하위트리의 최적값에 현재지점까지의 비용 더하기
      dfs(i, visited | (1 << i)) + graph[x][i]
    );
  });

  return dp[x][visited];
}

console.log(dfs(0, 1));
