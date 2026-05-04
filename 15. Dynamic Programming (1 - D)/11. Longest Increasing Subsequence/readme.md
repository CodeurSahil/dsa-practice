![Longest Increasing Subsequence](/asset/images/LongestIncreasingSubsequence.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
At each element, we have a choice: include it in our increasing subsequence or skip it. We can only include it if it is strictly greater than the last element we added. We explore all valid combinations recursively to find the maximum length.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        def dfs(i, j):
            # Base case: reached the end of the array
            if i == len(nums):
                return 0

            # Option 1: Skip the current element
            LIS = dfs(i + 1, j)

            # Option 2: Include the current element (if valid)
            # Valid if it's the first element (j == -1) or strictly greater than the previous
            if j == -1 or nums[j] < nums[i]:
                LIS = max(LIS, 1 + dfs(i + 1, i))

            return LIS

        # Start at index 0, with no previously included element (-1)
        return dfs(0, -1)
```
* **Time Complexity**: $O(2^n)$. The recursion tree splits into two branches at nearly every step.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down Memoization - 2D)

**Intuition:**
The recursive solution recalculates the exact same `(current_index, last_included_index)` pairs multiple times. We can cache these results in a 2D array. Since the `last_included_index` `j` can be `-1`, we offset it by `+1` when accessing the cache.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        n = len(nums)
        # memo[i][j+1] caches the result for dfs(i, j)
        memo = [[-1] * (n + 1) for _ in range(n)]

        def dfs(i, j):
            if i == n:
                return 0
            if memo[i][j + 1] != -1:
                return memo[i][j + 1]

            # Not including nums[i]
            LIS = dfs(i + 1, j)

            # Including nums[i]
            if j == -1 or nums[j] < nums[i]:
                LIS = max(LIS, 1 + dfs(i + 1, i))

            memo[i][j + 1] = LIS
            return LIS

        return dfs(0, -1)
```
* **Time Complexity**: $O(n^2)$.
* **Space Complexity**: $O(n^2)$ for the 2D memoization table.

---

### 3. Dynamic Programming (Top-Down Memoization - 1D)

**Intuition:**
We can simplify our state. Instead of tracking the previously included index, we define `dfs(i)` simply as: *"What is the length of the longest increasing subsequence that strictly starts with `nums[i]`?"*

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        n = len(nums)
        memo = [-1] * n

        def dfs(i):
            if memo[i] != -1:
                return memo[i]

            LIS = 1
            # Look at all elements coming after i
            for j in range(i + 1, n):
                if nums[i] < nums[j]:
                    LIS = max(LIS, 1 + dfs(j))

            memo[i] = LIS
            return LIS

        # The overall LIS could start at any index
        return max(dfs(i) for i in range(n))
```
* **Time Complexity**: $O(n^2)$.
* **Space Complexity**: $O(n)$ for the 1D memo array.

---

### 4. Dynamic Programming (Bottom-Up - 2D)

**Intuition:**
This is the iterative equivalent of the 2D Top-Down approach. We build a table from right to left, simulating the decisions to either include or skip an element.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [[0] * (n + 1) for _ in range(n + 1)]

        # Iterate backward
        for i in range(n - 1, -1, -1):
            for j in range(i - 1, -2, -1):
                # Not including nums[i]
                LIS = dp[i + 1][j + 1]  

                # Including nums[i]
                if j == -1 or nums[j] < nums[i]:
                    LIS = max(LIS, 1 + dp[i + 1][i + 1])  

                dp[i][j + 1] = LIS

        return dp[0][0]
```
* **Time Complexity**: $O(n^2)$.
* **Space Complexity**: $O(n^2)$ for the DP table.

---

### 5. Dynamic Programming (Bottom-Up - 1D Standard)

**Intuition:**
This is the most common and standard dynamic programming approach. Let `LIS[i]` be the longest increasing subsequence ending/starting at index `i`. We iterate backwards, checking all elements `j > i`. If `nums[i] < nums[j]`, we can attach `nums[i]` to the front of the sequence starting at `j`.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        # Every single element is technically an increasing subsequence of length 1
        LIS = [1] * len(nums)

        # Work backwards through the array
        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[i] < nums[j]:
                    LIS[i] = max(LIS[i], 1 + LIS[j])
                    
        return max(LIS)
```
* **Time Complexity**: $O(n^2)$.
* **Space Complexity**: $O(n)$ for the `LIS` array.

---

### 6. Segment Tree (Advanced)

**Intuition:**
By compressing the values into coordinates, we can use a Segment Tree to query the "maximum LIS length found so far for any number strictly smaller than `nums[i]`" in logarithmic time, and then update the tree with our new length.

```python
from bisect import bisect_left

class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

    def query(self, l, r):
        if l > r:
            return 0
        res = float('-inf')
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        # Coordinate compression
        def compress(arr):
            sortedArr = sorted(set(arr))
            return [bisect_left(sortedArr, num) for num in arr]

        nums = compress(nums)
        n = len(nums)
        segTree = SegmentTree(n)

        LIS = 0
        for num in nums:
            # Find the max sequence length of all elements smaller than num
            curLIS = segTree.query(0, num - 1) + 1
            segTree.update(num, curLIS)
            LIS = max(LIS, curLIS)
            
        return LIS
```
* **Time Complexity**: $O(n \log n)$ due to the segment tree queries/updates.
* **Space Complexity**: $O(n)$ to store the tree and compressed array.

---

### 7. Dynamic Programming + Binary Search (Optimal)

**Intuition:**
Also known as **Patience Sorting**, this approach builds an array `dp` where `dp[i]` represents the *smallest* ending element of an active increasing subsequence of length `i + 1`. 

As we iterate through the numbers, if a number is larger than everything currently in `dp`, we append it (extending our max length). If it's smaller, we use binary search to find the correct spot to replace an existing element. Replacing elements keeps our subsequences ending with the smallest possible values, making it easier to attach numbers later on.

```python
from bisect import bisect_left

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        dp = [nums[0]]

        for i in range(1, len(nums)):
            # If the current number is strictly greater than the last element in dp,
            # it extends our longest increasing subsequence.
            if dp[-1] < nums[i]:
                dp.append(nums[i])
            else:
                # Find the first element in dp that is >= nums[i] and replace it.
                # This keeps the ending elements as small as possible.
                idx = bisect_left(dp, nums[i])
                dp[idx] = nums[i]

        # The length of the dp array represents the length of the LIS
        # Note: the elements inside 'dp' may NOT be the actual subsequence itself.
        return len(dp)
```
* **Time Complexity**: $O(n \log n)$. We iterate through the array once $O(n)$ and perform a binary search `bisect_left` $O(\log n)$ at each step.
* **Space Complexity**: $O(n)$ for the `dp` tracking array.