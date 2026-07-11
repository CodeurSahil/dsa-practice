![Plus One](/asset/images/PlusOne.png)

---

## 1. Recursion

### Intuition
We are given a number represented as an array of digits, and we need to add one to this number. The challenge comes from handling the carry:
* If the last digit is less than 9, we can simply increment it.
* If the last digit is 9, it becomes 0 and we need to carry +1 to the remaining digits.

This recursive solution mirrors how addition works by hand: handle the last digit, if there is a carry, recursively solve the smaller subproblem (all digits except the last), and build the final result while returning from recursion.

### Algorithm
1. If the digit list is empty: it means we had a carry beyond the most significant digit, so return `[1]`.
2. If the last digit is less than `9`:
   * Increment the last digit by `1`.
   * Return the updated list.
3. Otherwise (last digit is `9`):
   * The last digit becomes `0`.
   * Recursively call `plusOne` on all digits except the last (`digits[:-1]`).
   * Append `0` to the result and return the final list of digits.

```python
from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        if not digits:
            return [1]

        if digits[-1] < 9:
            digits[-1] += 1
            return digits
        else:
            return self.plusOne(digits[:-1]) + [0]

```

* **Time Complexity:** $O(n)$ where $n$ is the number of digits.
* **Space Complexity:** $O(n)$ due to the recursion stack and slicing creating new arrays.

---

## 2. Iteration - I (Array Reversal)

### Intuition

The main idea is to simulate manual addition starting from the least significant digit. Since addition naturally moves from right to left, this solution reverses the array so we can process digits from left to right. We keep a variable `one` to represent the carry (initially 1) and continue updating digits until the carry becomes 0. This avoids recursion and handles all carry cases, including when the number consists entirely of 9s (like `[9, 9, 9]`).

### Algorithm

1. Initialize `one = 1` (represents the `+1` we want to add) and `i = 0` (index to traverse digits).
2. Reverse the digits array so the least significant digit comes first.
3. While there is still a carry (`one == 1`):
* If `i` is within the array:
* If `digits[i] == 9`: set `digits[i] = 0` (carry continues).
* Else: increment `digits[i]` by 1 and set `one = 0` (carry resolved).


* Else (we ran out of digits):
* Append `1` to the array and set `one = 0`.


* Increment `i`.


4. Reverse the array back to its original order.
5. Return the updated digits.

```python
from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        one = 1
        i = 0
        digits.reverse()

        while one:
            if i < len(digits):
                if digits[i] == 9:
                    digits[i] = 0
                else:
                    digits[i] += 1
                    one = 0
            else:
                digits.append(one)
                one = 0
            i += 1

        digits.reverse()
        return digits

```

* **Time Complexity:** $O(n)$ where $n$ is the number of digits (reversing and single pass).
* **Space Complexity:** $O(1)$ auxiliary space as we modify the array in-place.

---

## 3. Iteration - II (Optimal Right-to-Left)

### Intuition

The simplest way to do this is to simulate how addition works from right to left directly on the array, without reversing it.

* Start from the least significant digit.
* If the digit is less than 9, we can increment it and stop immediately.
* If the digit is 9, it becomes 0 and we carry +1 to the next digit on the left.
* If we finish processing all digits and still have a carry, it means the number was something like `[9, 9, 9]`, and we need to add a new leading 1.

### Algorithm

1. Let `n` be the number of digits.
2. Traverse the digits from right to left (from index `n - 1` down to `0`):
* If `digits[i] < 9`: increment `digits[i]` by `1` and return the updated list immediately (no further carry).
* Otherwise (`digits[i] == 9`): set `digits[i] = 0` and continue to the next digit on the left.


3. If the loop ends, it means all digits were `9`.
4. Return `[1] + digits` to handle the overflow.

```python
from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        n = len(digits)
        for i in range(n - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0

        return [1] + digits

```

* **Time Complexity:** $O(n)$ where $n$ is the number of digits.
* **Space Complexity:** $O(n)$ to create the new array `[1] + digits` in the worst case (e.g., `999` $\rightarrow$ `1000`), otherwise $O(1)$ auxiliary space.
