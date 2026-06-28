![Sum of Two Integers](/asset/images/SumofTwoIntegers.png)

---

## 1. Brute Force (Direct Addition)

### Intuition
In the brute force approach, we rely directly on the language’s built-in arithmetic addition operator. This is the most straightforward and intuitive solution because:
* Addition is a fundamental operation supported natively by all programming languages.
* The language runtime already handles all edge cases such as negative numbers, carry propagation, and integer representation.

This approach focuses purely on correctness and simplicity, without worrying about implementation details.

### Algorithm
1. Take the two input integers `a` and `b`.
2. Use the built-in addition operation to compute `a + b`.
3. Return the result.

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        return a + b

```

* **Time Complexity:** $O(1)$
* **Space Complexity:** $O(1)$

---

## 2. Bit Manipulation (Bit by Bit)

### Intuition

At the bit level, addition works using two simple ideas:

* **XOR (`^`)** gives the sum of two bits without considering the carry.
* **AND (`&`) + left shift** determines where a carry is generated.

For example (single bit):

* `0 + 0` $\$rightarrow sum = 0, carry = 0
* `1 + 0` $\$rightarrow sum = 1, carry = 0
* `1 + 1` $\$rightarrow sum = 0, carry = 1

By repeating this logic for all bit positions, we can simulate normal addition exactly as it happens in hardware. Because integers in Python have arbitrary precision, we use a 32-bit mask (`0xFFFFFFFF`) to simulate fixed-width 32-bit integers. We must correctly convert the result back if it represents a negative number in two's complement form.

### Algorithm

1. Initialize `res = 0` to store the final sum, `carry = 0`, and `mask = 0xFFFFFFFF` to keep numbers within 32 bits.
2. For each bit position `i` from `0` to `31`:
* Extract the `i`-th bit from both numbers using right shift and AND: `a_bit`, `b_bit`.
* Compute the current sum bit using XOR: `cur_bit = a_bit ^ b_bit ^ carry`.
* Update the carry: `carry = (a_bit + b_bit + carry) >= 2`.
* If `cur_bit` is `1`, set the `i`-th bit in `res` using `res |= (1 << i)`.


3. After processing all bits, check if `res` represents a negative number in 32-bit two's complement (`res > 0x7FFFFFFF`).
4. If so, convert it back to a signed integer using `~(res ^ mask)`.
5. Return the result.

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        carry = 0
        res = 0
        mask = 0xFFFFFFFF

        for i in range(32):
            a_bit = (a >> i) & 1
            b_bit = (b >> i) & 1
            cur_bit = a_bit ^ b_bit ^ carry
            carry = (a_bit + b_bit + carry) >= 2
            if cur_bit:
                res |= (1 << i)

        if res > 0x7FFFFFFF:
            res = ~(res ^ mask)

        return res

```

* **Time Complexity:** $O(1)$ because the loop iterates exactly 32 times.
* **Space Complexity:** $O(1)$

---

## 3. Bit Manipulation (Optimal)

### Intuition

Binary addition can be built elegantly from two operations operating on the entire number at once:

1. **Sum without carry:** `a ^ b` gives the bit-by-bit sum ignoring carry.
2. **Carry information:** `a & b` tells us where both bits are `1` (which creates a carry), and shifting left by 1 (`<< 1`) moves that carry to the next higher bit position.

We can repeatedly compute the carry, update the partial sum using XOR, and add the carry again (by setting `b = carry`). We keep doing this until there is no carry left (`b == 0`). Again, we must use a 32-bit mask to handle negative numbers correctly in Python.

### Algorithm

1. Define constants for 32-bit handling: `mask = 0xFFFFFFFF` and `max_int = 0x7FFFFFFF`.
2. While `b` is not zero:
* Compute carry: `carry = (a & b) << 1`.
* Compute sum without carry: `a = (a ^ b) & mask`.
* Move carry into `b` (also masked to 32 bits): `b = carry & mask`.


3. After the loop, `a` holds the 32-bit result.
4. If `a` is within the positive signed range (`<= max_int`), return it directly.
5. Otherwise, convert from unsigned 32-bit to a negative signed value: `~(a ^ mask)` and return it.

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        max_int = 0x7FFFFFFF

        while b != 0:
            carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask

        return a if a <= max_int else ~(a ^ mask)

```

* **Time Complexity:** $O(1)$ because the carry will propagate and eventually become 0 in at most 32 operations.
* **Space Complexity:** $O(1)$
