/*
974. Subarray Sums Divisible by K
Solved
Medium
Topics
Companies
Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Example 2:

Input: nums = [5], k = 9
Output: 0
 

Constraints:

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
2 <= k <= 104
*/

function subarraysDivByK(nums: number[], k: number): number {
  const n = nums.length;
  const Rmap = new Map<number, number>();
  let ans = 0;
  let sum = 0;
  Rmap.set(sum, 0);

  for (let i = 0; i < n; i++) {
    sum += nums[i];
    sum %= k;
    if (sum < 0) sum += k;
    if (Rmap.get(sum) === undefined) Rmap.set(sum, 0);
    else {
      const x = Rmap.get(sum)! + 1;
      Rmap.set(sum, x);
      ans += x;
    }
  }

  return ans;
}

console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5));
