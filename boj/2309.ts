import _ from 'lodash';
const inputs = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

/* 
순열을 이용한 코드
**/
type Permutation = {
  heights: number[];
  n: number;
  r: number;
  dep: number;
};

function compareSum(heights: number[]) {
  if (_.sum(heights.slice(0, 7)) === 100) {
    console.log(heights.slice(0, 7).join('\n'));
    process.exit();
  }
}

function permutation({ heights, n, r, dep }: Permutation) {
  if (r === dep) {
    compareSum(heights);
    return;
  }

  for (let i = dep; i < n; i++) {
    [heights[dep], heights[i]] = [heights[i], heights[dep]];
    permutation({ heights, n, r, dep: dep + 1 });
    [heights[dep], heights[i]] = [heights[i], heights[dep]];
  }
}

const heights = _.sortBy(inputs.map(Number));
permutation({ heights, n: heights.length, r: 7, dep: 0 });

/* 
조합을 이용한 코드
**/
type Combination = {
  start: number;
  curArr: number[];
};

function combi({ start, curArr }: Combination) {
  if (curArr.length === 7 && _.sum(curArr) === 100) {
    console.log(curArr.join('\n'));
    process.exit();
  }

  for (let i = start + 1; i < 9; i++) {
    curArr.push(heights2[i]);
    combi({ start: i, curArr });
    curArr.pop();
  }
}

const heights2 = _.sortBy(inputs.map(Number));
combi({ start: -1, curArr: [] });
