![Number of 1 Bits](/asset/images/Numberof1Bits.png)
![Number of 1 Bits](/asset/images/Numberof1Bits2.png)

---

## 1. Bit Mask - I (Checking all 32 bits)

### Intuition

A straightforward way to do this is to check each bit position one by one to see whether that bit is set (`1`) or not (`0`). Since integers are typically represented using 32 bits, we can safely check all 32 bit positions.

At each position:

* Create a mask with a single `1` at that position using `1 << i`.

* Use bitwise AND (`&`) to test whether that bit is set in `n`.

### Algorithm

1. Initialize a counter `res = 0`.

2. For each bit position `i` from `0` to `31`:

   * Create a mask with only the `i`-th bit set: `mask = 1 << i`.

   * Check if this bit is set in `n`: If `(mask & n) != 0`, increment `res`.

3. After checking all 32 bits, return `res`.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        for i in range(32):
            if (1 << i) & n:
                res += 1
        return res


```

* **Time Complexity:** $O(1)$ because the loop always runs exactly 32 times, regardless of the size of `n`.
* **Space Complexity:** $O(1)$ as we only use a single variable for the result.

## 2. Bit Mask - II (Bit Shifting)

### Intuition

Instead of generating a new mask for every bit position, we can repeatedly look at the *least significant bit* (the rightmost bit) of `n` and then shift the number right to bring the next bit into that position.

At each step:

* `n & 1` tells us whether the current least significant bit is `1`.
* Shifting `n` right by one (`n >>= 1`) moves us to the next bit.
We repeat this until `n` becomes `0`.

### Algorithm

1. Initialize a counter `res = 0`.
2. While `n > 0`:
* If the least significant bit is `1` (`n & 1`), increment `res`.
* Shift `n` one bit to the right (`n >>= 1`).


3. When `n` becomes `0`, all bits have been processed. Return `res`.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            res += 1 if n & 1 else 0
            n >>= 1
        return res


```

* **Time Complexity:** $O(1)$. The loop runs at most 32 times (or 64 depending on the system architecture).
* **Space Complexity:** $O(1)$

## 3. Bit Mask (Optimal - Brian Kernighan's Algorithm)

### Intuition

A very efficient trick comes from this key observation in binary arithmetic: **Subtracting `1` from a number flips the rightmost `1` bit to `0` and turns all bits to its right into `1`s.**

Therefore, performing `n & (n - 1)` completely removes the rightmost `1` bit from `n`.
Every time we do `n = n & (n - 1)`, we eliminate exactly one `1` bit. This means the number of iterations equals the *exact number of `1` bits*, and we completely skip wasting time checking bits that are `0`.

### Algorithm

1. Initialize a counter `res = 0`.
2. While `n` is not zero:
* Update `n = n & (n - 1)` to remove the rightmost `1` bit.
* Increment `res` by `1`.


3. When `n` becomes `0`, all `1` bits have been removed. Return `res`.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            n &= n - 1
            res += 1
        return res


```

* **Time Complexity:** $O(1)$. In the worst-case scenario (all `1`s), it runs 32 times, but on average, it runs much faster because it only iterates as many times as there are `1` bits.
* **Space Complexity:** $O(1)$

## 4. Built-In Function

### Intuition

Most modern programming languages provide a way to convert a number into its binary form, or a built-in utility to count set bits directly (often optimized at the hardware level with `popcount` instructions). Instead of manually checking bits, we can rely on these features for a short, clear, and error-free solution.

### Algorithm

1. Convert the given number `n` into its binary string representation using `bin(n)`.
2. Use the built-in string `.count('1')` method to count the occurrences of the character `'1'`.
3. Return the count.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        return bin(n).count('1')


```

* **Time Complexity:** $O(1)$. The conversion to a binary string and counting characters takes time proportional to the number of bits (which is constant).
* **Space Complexity:** $O(1)$. The string created is at most 32 (or 64) characters long, requiring constant memory.
