1. Swapping Two Number

Function swap(a , b) { -> No Bhav
    temp = a --> 1 Unit of Time
    a = b --> 1 Unit of Time
    b = temp --> 1 Unit of Time
}

Total 3 Unit Of Time

fn = O(3)

Rule: It There is a Constant in the fn, we can replcae it to 1

fn = O(3) = O(1)

2. Loop

for(i = 0; i<n; i++) { -> No Bhav
    // Focus On i = 0; i<n; i++
    Stamement; -> Statement is Getting Excuted n Times
}

fn = O(n)

3. 

for(i = 0; i<n; i++) { -> No Bhav
    Stamement; -> n times
}
for(j = 0; j<n; j++) { -> No Bhav
    Stamement; -> n times
}

fn = O(2n) = O(n)

4. 

for(i = 0; i<n; i++) { -> No Bhav
    for(j = 0; j<n; j++) { -> No Bhav
        Stamement; -> n times
    }
}

i = 1
j = n

i = 2
j = n

i = 3
j = n

i = n
j = n

fn = n.n = O(n^2)


5. 
for(j = n; j>=1; j=j/2) { -> No Bhav
    Stamement; -> n times
}

j Values

j -> n -> n/2 -> n/2^2 -> n/2^3 -> n/2^k

j < 1

n/2^k < 1 -> n/2^k = 1 -> n = 2^k -> k = log n base 2

fn = O(log n base 2)

6. 

Function evenOrOdd(n) { -> No Bhav
    if(n % 2 == 0){ -> No Bhav
        True -> 1 Time
    }
    else { -> No Bhav
        false -> 1 Time
    }
}

fn = O(1)