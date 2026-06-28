![Missing Number](/asset/images/MissingNumber.png)
![Missing Number](/asset/images/MissingNumber2.png)
![Missing Number](/asset/images/MissingNumber3.png)

---

## 1. Sorting

### Intuition
If the array were complete and sorted, the number at index `i` should be exactly `i`. As soon as this condition breaks, that index represents the missing number. Sorting the array puts the numbers in order, making this comparison straightforward and beginner-friendly.

### Algorithm
1. Sort the array in ascending order.
2. Traverse the array from index `0` to `n - 1`:
   * If `nums[i] != i`, then `i` is the missing number $\rightarrow$ return `i`.
3. If all indices match their values:
   * The missing number must be `n` $\rightarrow$ return `n` as the result.

```python
from typing import List

class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        nums.sort()
        for i in range(n):
            if nums[i] != i:
                return i
        return n

```

* **Time Complexity:** $O(n \log n)$ due to the sorting step.
* **Space Complexity:** $O(1)$ or $O(n)$ depending on the sorting algorithm used by the programming language.

---

## 2. Hash Set

### Intuition

A natural way to approach this is to ask: *"Can we quickly check whether a number exists in the array?"* Using a hash-based data structure (like a hash set) allows us to store all given numbers and check the presence of any number in constant time. Once all numbers are stored, we simply look for the number in the range `[0, n]` that does not appear in the set. This approach trades a little extra space for very clear and simple logic.

### Algorithm

1. Insert all elements of the array into a hash set `num_set`.
2. Iterate through all numbers `i` from `0` to `n`:
* If a number is not present in the set (`i not in num_set`), return it as the missing number.


3. Since exactly one number is missing, this process will always find the answer.

```python
from typing import List

class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        num_set = set(nums)
        n = len(nums)
        for i in range(n + 1):
            if i not in num_set:
                return i

```

* **Time Complexity:** $O(n)$ to populate the set and iterate through the range.
* **Space Complexity:** $O(n)$ to store the numbers in the hash set.

---

## 3. Bitwise XOR (Optimal)

### Intuition

A very powerful observation comes from the properties of XOR (`^`):

* `a ^ a = 0` (a number XORed with itself cancels out to 0)
* `a ^ 0 = a`
* XOR is commutative and associative (order does not matter).

If we XOR all numbers from `0` to `n` AND all numbers present in the array, every number that appears in both places will cancel out. This leaves only the missing number! This allows us to find the answer in linear time and constant space without sorting or extra data structures.

### Algorithm

1. Let `n` be the length of the array.
2. Initialize a variable `xorr = n`.
3. For each index `i` from `0` to `n - 1`:
* XOR `xorr` with `i`.
* XOR `xorr` with `nums[i]`.


4. After the loop, `xorr` will contain the missing number. Return `xorr`.

```python
from typing import List

class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        xorr = n
        for i in range(n):
            xorr ^= i ^ nums[i]
        return xorr

```

* **Time Complexity:** $O(n)$ as we iterate through the array exactly once.
* **Space Complexity:** $O(1)$ since we only use one variable `xorr`.

---

## 4. Math (Optimal)

### Intuition

A simple mathematical observation helps here: we know what the expected sum of numbers from `0` to `n` should be (using the formula `n * (n + 1) / 2`).

If we subtract the actual sum of the given array from this expected sum, the result must be the missing number. Instead of computing two separate sums (which could potentially cause integer overflow in some languages), we can combine both ideas into a single running calculation.

### Algorithm

1. Let `n` be the length of the array.
2. Initialize a variable `res = n`.
3. For each index `i` from `0` to `n - 1`:
* Add `i` to `res`.
* Subtract `nums[i]` from `res`.


4. After the loop, `res` will hold the missing number. Return `res`.

```python
from typing import List

class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = len(nums)
        
        for i in range(len(nums)):
            res += i - nums[i]
            
        return res

```

* **Time Complexity:** $O(n)$ to iterate through the array once.
* **Space Complexity:** $O(1)$ as we only maintain a single running total `res`.
