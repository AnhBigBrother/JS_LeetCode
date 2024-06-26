/*
16. 3Sum Closest
Solved
Medium
Companies
Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
Return the sum of the three integers.
You may assume that each input would have exactly one solution. 

Example 1:
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 
Constraints:
3 <= nums.length <= 500
-1000 <= nums[i] <= 1000
-104 <= target <= 104
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// ---> Three pointer
var threeSumClosest = function(nums, target) {
    const n = nums.length;
    nums.sort((a,b) => a-b);
    let ans = nums[0] + nums[1] + nums[2];
    for (let i=0; i<n; i++){
        let l = i+1;
        let r = n-1;
        while (l < r){
            let sum = nums[i] + nums[l] + nums[r] ;
            if (sum === target){
                return target;
            }
            else if (sum > target){
                r--;
            }
            else{
                l++;
            }
            if (Math.abs(sum - target) < Math.abs(ans - target)){
                ans = sum;
            }
        }
    }
    return ans;
};