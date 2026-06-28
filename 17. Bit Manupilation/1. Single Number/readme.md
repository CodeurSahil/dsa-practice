![Single Number](/asset/images/SingleNumber.png)
![Single Number](/asset/images/SingleNumber2.png)

---

## 1. Brute Force Search

### Intuition
The brute force idea is straightforward: for each element in the array, check whether it appears anywhere else. If it does not match with any other element, then it must be the single number. This approach is simple and easy to understand because it directly follows the problem statement without using extra data structures or clever tricks.

### Algorithm
1. Loop through each index `i` in the array.
2. Assume the current element `nums[i]` is unique (`flag = True`).
3. Loop through the array again with index `j`:
   * If `i != j` and `nums[i] == nums[j]`: the element is not unique.
   * Set `flag = False` and stop checking (break).
4. After the inner loop: If `flag` is still true, return `nums[i]`.
5. Since the problem guarantees exactly one unique element, the function will always return an answer.

```python
from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        for i in range(len(nums)):
            flag = True
            for j in range(len(nums)):
                if i != j and nums[i] == nums[j]:
                    flag = False
                    break
            if flag:
                return nums[i]

```

* **Time Complexity:** $O(n^2)$ where $n$ is the length of the array. For every element, we might scan the entire array again.
* **Space Complexity:** $O(1)$ as we only use a few variables.

---

## 2. Hash Set

### Intuition

A convenient way to solve this is by using a hash set to track numbers as we iterate:

* When we see a number for the first time, we add it to the set.
* When we see the same number again, we remove it from the set.

Because duplicates are added once and removed once, only the number that appears exactly once will remain in the set. At the end, the set will contain only one element, which is the answer.

### Algorithm

1. Initialize an empty set `seen`.
2. Traverse each number `num` in the array:
* If `num` is already in `seen`: remove it from the set.
* Otherwise: add it to the set.


3. After processing all numbers, the set contains exactly one element.
4. Return the only element from the set.

```python
from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        seen = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return list(seen)[0]

```

* **Time Complexity:** $O(n)$. We iterate through the array once. Adding and removing from a hash set takes $O(1)$ time on average.
* **Space Complexity:** $O(n)$ to store elements in the hash set.

---

## 3. Sorting

### Intuition

Sorting helps simplify the problem: after sorting, duplicate numbers appear next to each other. The single number will be the only element that does not have an identical neighbor.

So we can scan the array in steps of two. If `nums[i] == nums[i + 1]`, they form a valid pair and we skip both. If they are not equal, then `nums[i]` must be the unique element. This avoids extra space allocation and relies entirely on the sorted structure.

### Algorithm

1. Sort the array `nums`.
2. Initialize an index `i = 0`.
3. While `i < len(nums) - 1`:
* If `nums[i] == nums[i + 1]`: move to the next pair by setting `i += 2`.
* Else: return `nums[i]` (this is the single number).


4. If the loop ends without returning, the unique element must be the very last element: return `nums[i]`.

```python
from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        nums.sort()
        i = 0
        while i < len(nums) - 1:
            if nums[i] == nums[i + 1]:
                i += 2
            else:
                return nums[i]
        return nums[i]

```

* **Time Complexity:** $O(n \log n)$ due to the sorting step.
* **Space Complexity:** $O(1)$ or $O(n)$ depending on the sorting algorithm implementation used by the language (Python's Timsort uses $O(n)$ space).

---

## 4. Bit Manipulation (Optimal)

### Intuition

This problem is a perfect fit for bit manipulation, specifically the XOR (`^`) operation.
Key properties of XOR:

* `a ^ a = 0` (a number XORed with itself cancels out to 0).
* `a ^ 0 = a` (a number XORed with 0 keeps the number unchanged).
* XOR is commutative and associative, so the order of operations does not matter.

Because every number except one appears exactly twice, all the duplicates will XOR each other out to `0`. The only remaining value will be the single number XORed with `0`, leaving just the single number.

### Algorithm

1. Initialize a result variable `res = 0`.
2. Iterate through each number `num` in the array.
3. Update `res = res ^ num`.
4. After processing all numbers, `res` will hold the single number.
5. Return `res`.

```python
from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res = num ^ res
        return res

```

* **Time Complexity:** $O(n)$ because we iterate through the array exactly once.
* **Space Complexity:** $O(1)$ as we only use one variable `res` to keep track of the result.
