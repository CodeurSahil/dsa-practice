![Reverse Bits](/asset/images/ReverseBits.png)
![Reverse Bits](/asset/images/ReverseBits2.png)

---

## 1. Brute Force

### Intuition
We are given a 32-bit unsigned integer, and we need to reverse its bits. The most straightforward way to think about this problem is:
* Read the bits of the number from right to left.
* Build a new number by placing those bits from left to right.

In simpler terms: Extract each bit one by one, reverse their order, and reconstruct the number from the reversed bits. This brute force approach closely follows how humans would solve the problem manually, making it easy to understand, though not the most optimal.

### Algorithm
1. Initialize an empty sequence `binary` to store bits.
2. For each position `i` from `0` to `31` (since the number is 32-bit):
   * Check if the bit at that position is `1` or `0` using `n & (1 << i)`.
   * Append the corresponding string `"1"` or `"0"` to the sequence.
3. Initialize a result number `res = 0`.
4. For each bit in the reversed sequence `binary[::-1]`:
   * If the bit is `"1"`, set the corresponding bit in `res` using bit shifting: `res |= (1 << i)`.
5. Return the result `res`.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        binary = ""
        for i in range(32):
            if n & (1 << i):
                binary += "1"
            else:
                binary += "0"

        res = 0
        for i, bit in enumerate(binary[::-1]):
            if bit == "1":
                res |= (1 << i)

        return res

```

* **Time Complexity:** $O(1)$
* **Space Complexity:** $O(1)$

---

## 2. Bit Manipulation

### Intuition

Instead of storing bits in a string or array, we can do this directly using bit manipulation:

* Extract each bit from the original number starting from the least significant bit.
* Place that bit into the correct reversed position in the result.
* Repeat this for all 32 bits.

This approach avoids extra memory and works directly at the bit level, making it both clean and efficient.

### Algorithm

1. Initialize a variable `res = 0` to store the reversed number.
2. For each bit position `i` from `0` to `31`:
* Extract the `i`-th bit of `n` using `(n >> i) & 1`.
* Shift this bit to its reversed position `(31 - i)`.
* Add it to `res`.


3. After processing all 32 bits, return `res`.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for i in range(32):
            bit = (n >> i) & 1
            res += (bit << (31 - i))
        return res

```

* **Time Complexity:** $O(1)$
* **Space Complexity:** $O(1)$

---

## 3. Bit Manipulation (Optimal - Divide and Conquer)

### Intuition

Instead of reversing bits one-by-one, we can do this much faster by using a classic bit-manipulation trick called **bitwise divide and conquer**.

The key idea is:

* Reverse bits in large blocks first.
* Then gradually reverse smaller and smaller blocks.
* Until all individual bits are reversed.

This works because reversing bits is equivalent to swapping the left half with the right half, then swapping bytes (8 bits), then nibbles (4 bits), then pairs (2 bits), and finally single bits. Each step rearranges bits closer to their final reversed positions.

### Algorithm

1. Start with the original number `n` stored in `res`.
2. Swap the left 16 bits with the right 16 bits.
3. Swap bits in blocks of:
* 8 bits (bytes)
* 4 bits (nibbles)
* 2 bits (pairs)
* 1 bit (individual bits)


4. After each step, use bit masks (like `0xff00ff00`, `0xf0f0f0f0`, etc.) to isolate groups of bits and shift them to their new positions.
5. Ensure the final result stays within 32 bits by applying a mask `& 0xFFFFFFFF`.
6. Return the reversed number.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = n
        res = (res >> 16) | (res << 16) & 0xFFFFFFFF
        res = ((res & 0xff00ff00) >> 8) | ((res & 0x00ff00ff) << 8)
        res = ((res & 0xf0f0f0f0) >> 4) | ((res & 0x0f0f0f0f) << 4)
        res = ((res & 0xcccccccc) >> 2) | ((res & 0x33333333) << 2)
        res = ((res & 0xaaaaaaaa) >> 1) | ((res & 0x55555555) << 1)
        return res & 0xFFFFFFFF

```

* **Time Complexity:** $O(1)$
* **Space Complexity:** $O(1)$
