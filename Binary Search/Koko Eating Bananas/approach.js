/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    const PILESLEN = piles.length;
    const MAXPILE = Math.max(...piles);

    if (PILESLEN === h) return MAXPILE;

    let l = 1, r = MAXPILE;

    let res = MAXPILE;

    while (l <= r) {
        const MID = Math.floor((l + r) / 2);

        let TOTALTIME = 0;

        for (const pile of piles) {
            TOTALTIME += Math.ceil(pile / MID);
            if (TOTALTIME > h) break;
        }

        if (TOTALTIME <= h) {
            res = MID;
            r = MID - 1;
        } else {
            l = MID + 1;
        }
    }
    
    return res;
};

/**
'n' piles of bananas
'ith' pile has 'piles[i]' bananas
The guards have gone and will come back in 'h' hours

Koko can decide her bananas-per-hour eating speed of 'k'
Each hour,
    she chooses some pile of bananas and eats 'k' bananas from that pile.
If the pile has less than 'k' bananas, she eats all of them instead and will not eat any more bananas during this hour.

Return the minimum integer 'k' such that she can eat all the bananas within 'h' hours.
 */