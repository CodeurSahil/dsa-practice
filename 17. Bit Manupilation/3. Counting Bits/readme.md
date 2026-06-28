![Counting Bits](/asset/images/CountingBits.png)
![Counting Bits](/asset/images/CountingBits2.png)

---

## 1. Bit Manipulation - I (Checking all 32 bits)

### Intuition
For every number from `0` to `n`, we want to compute how many `1` bits appear in its binary representation. This bit manipulation approach checks each bit position individually. Since integers are typically represented using 32 bits, for each number, we test whether the bit at position `i` is set using a bit mask. Although this solution is not optimal, it clearly demonstrates how bitwise operations work at a low level.

### Algorithm
1. Initialize an empty list `res` to store results.
2. For every number `num` from `0` to `n`:
   * Initialize a counter `one = 0`.
   * For each bit position `i` from `0` to `31`:
     * Check if the `i`-th bit is set using `num & (1 << i)`.
     * If yes, increment `one`.
   * Append `one` to `res`.
3. Return the list `res`.

```python
from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        res = []
        for num in range(n + 1):
            one = 0
            for i in range(32):
                if num & (1 << i):
                    one += 1
            res.append(one)
        return res

```

* **Time Complexity:** $O(n \log n)$ (specifically $O(32n)$ which simplifies to $O(n)$ strictly speaking, but depends on the number of bits).
* **Space Complexity:** $O(1)$ extra space, $O(n)$ space for the output array.

---

## 2. Bit Manipulation - II (Brian Kernighan’s Algorithm)

### Intuition

To count the number of `1` bits efficiently, we can use Brian Kernighan’s Algorithm.
The key observation:

* The operation `n & (n - 1)` removes the lowest set bit from `n`.
* Repeating this until `n` becomes `0` counts exactly how many `1` bits are present.

This avoids checking all 32 bits for every number, saving time.

### Algorithm

1. Create an array `res` of size `n + 1` initialized with `0`.
2. For each number `i` from `1` to `n`:
* Set `num = i`.
* While `num != 0`:
* Increment `res[i]`.
* Remove the lowest set bit using `num &= (num - 1)`.




3. Return `res`.

```python
from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        res = [0] * (n + 1)
        for i in range(1, n + 1):
            num = i
            while num != 0:
                res[i] += 1
                num &= (num - 1)
        return res

```

* **Time Complexity:** $O(n \log n)$ bounded by the number of bits in the numbers.
* **Space Complexity:** $O(1)$ extra space, $O(n)$ space for the output array.

---

## 3. In-Built Function

### Intuition

Instead of manually counting bits using bit manipulation or dynamic programming, many programming languages provide built-in ways to convert numbers to binary strings or directly count set bits. Using these built-in features allows us to write a very concise and readable solution.

This approach is especially useful when `n` is small to moderate, clarity is more important than optimal performance, and we want a quick and reliable implementation.

### Algorithm

1. Initialize an empty result list (can be done via list comprehension).
2. For each number `i` from `0` to `n`:
* Convert `i` to its binary representation using a built-in utility (`bin(i)`).
* Count the number of `1` bits in that representation (`.count('1')`).


3. Return the generated list.

```python
from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        return [bin(i).count('1') for i in range(n + 1)]

```

* **Time Complexity:** $O(n \log n)$ because converting to a string and counting takes time proportional to the length of the binary string.
* **Space Complexity:** $O(1)$ extra space, $O(n)$ space for the output array.

---

## 4. Bit Manipulation (Dynamic Programming with Offsets)

### Intuition

A key observation from binary representations is that numbers repeat their bit patterns every time we reach a power of two. When a number is a power of two, it has exactly one `1` bit.

Any number `i` can be written as:
`i = highestPowerOfTwo <= i + remainder`

So, the number of set bits in `i` is:
`1` (for the highest power of two) + `number of set bits in the remainder`.

This allows us to build the solution incrementally using Dynamic Programming, reusing results we have already computed.

### Algorithm

1. Create a DP array `dp` of size `n + 1`, where `dp[i]` will store the number of set bits in `i`.
2. Initialize `dp[0] = 0` and `offset = 1` (tracks the most recent power of two).
3. For each number `i` from `1` to `n`:
* If `i` reaches the next power of two (`i == 2 * offset`), update `offset = i`.
* Compute: `dp[i] = 1 + dp[i - offset]`.


4. Return the DP array.

```python
from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        offset = 1

        for i in range(1, n + 1):
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp

```

* **Time Complexity:** $O(n)$ because each number up to `n` is calculated in $O(1)$ time.
* **Space Complexity:** $O(1)$ extra space, $O(n)$ space for the output array.

---

## 5. Bit Manipulation (Optimal Dynamic Programming)

### Intuition

A very important observation from binary representation is:

* Right-shifting a number by `1` (`i >> 1`) removes the least significant bit.
* `(i & 1)` tells us whether the last bit of `i` is `1` or `0`.

So, the number of set bits in `i` can be built entirely from a smaller number that we've already processed:
`setBits(i) = setBits(i >> 1) + (i & 1)`

This means each result depends only on a previously computed value, making it a perfect fit for an even simpler Dynamic Programming loop.

### Algorithm

1. Create a DP array `dp` of size `n + 1`, where `dp[i]` stores the number of set bits in `i`.
2. Initialize `dp[0] = 0`.
3. For every number `i` from `1` to `n`:
* Right shift `i` by `1` to get `i >> 1`.
* Check the last bit using `(i & 1)`.
* Compute: `dp[i] = dp[i >> 1] + (i & 1)`.


4. Return the DP array.

```python
from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1): # Start from 1 to avoid computing dp[0] twice
            dp[i] = dp[i >> 1] + (i & 1)
        return dp

```

* **Time Complexity:** $O(n)$ as each state is derived in $O(1)$ operations.
* **Space Complexity:** $O(1)$ extra space, $O(n)$ space for the output array.
