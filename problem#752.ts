/*
752. Open the Lock
Solved
Medium
Topics
Companies
Hint
You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

 

Example 1:

Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".
Example 2:

Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".
Example 3:

Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.
 

Constraints:

1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
target will not be in the list deadends.
target and deadends[i] consist of digits only.
*/

function openLock(deadends: string[], target: string): number {
  const isDeadEnds: { [key: string]: boolean } = {};
  for (let x of deadends) isDeadEnds[x] = true;

  // -------------
  if (isDeadEnds['0000']) return -1;

  // -------------
  const neighborChar: { [key: string]: string[] } = {};
  for (let i = 1; i < 9; i++) {
    neighborChar[String(i)] = [String(i - 1), String(i + 1)];
  }
  neighborChar['0'] = ['1', '9'];
  neighborChar['9'] = ['0', '8'];

  // --------------
  const strArr: string[] = [];
  strArr.push('0000');
  for (let i = 1; i < 10000; i++) {
    if (i < 10) strArr.push('000' + i);
    else if (i < 100) strArr.push('00' + i);
    else if (i < 1000) strArr.push('0' + i);
    else strArr.push(String(i));
  }

  // ----------------
  const neighborStr: { [key: string]: string[] } = {};
  for (let x of strArr) {
    const neighbor: string[] = [];
    for (let i = 0; i < 4; i++) {
      const arr = x.split('');
      const c = arr[i];
      arr[i] = neighborChar[c][0];
      const str1 = arr.join('');
      arr[i] = neighborChar[c][1];
      const str2 = arr.join('');
      neighbor.push(str1, str2);
    }
    neighborStr[x] = neighbor;
  }

  // ----------------
  const distanceFromRoot: { [key: string]: number } = {};
  distanceFromRoot['0000'] = 0;

  // -----------------
  BFS(isDeadEnds, neighborStr, distanceFromRoot, ['0000'], target);

  // -----------------
  if (distanceFromRoot[target] === undefined) return -1;
  return distanceFromRoot[target];
}

const BFS = (isDeadEnds: { [key: string]: boolean }, neighborStr: { [key: string]: string[] }, distanceFromRoot: { [key: string]: number }, arrStr: string[], target: string) => {
  if (arrStr.length === 0) return;
  const newArrStr = [];

  for (let x of arrStr) {
    for (let k of neighborStr[x]) {
      if (!isDeadEnds[k] && distanceFromRoot[k] === undefined) {
        distanceFromRoot[k] = distanceFromRoot[x] + 1;
        if (k === target) return;
        newArrStr.push(k);
      }
    }
  }
  BFS(isDeadEnds, neighborStr, distanceFromRoot, newArrStr, target);
};

const deadends = ['8888'],
  target = '0009';
console.log(openLock(deadends, target));
