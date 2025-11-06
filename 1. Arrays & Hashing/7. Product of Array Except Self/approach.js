var productExceptSelf = function(nums) {
    const totalItems = nums.length;
    const product2 = new Array(totalItems).fill(1);

    for(let i = 1; i < totalItems; i++) {
        product2[i] = product2[i - 1] * nums[i - 1];
    }
    console.log('🎻 ~ approach.js:6 -> product: ', product2);

    let postProduct = 1;
    for(let i = totalItems - 1; i >= 0; i--) {
        product2[i] *= postProduct;
        console.log('🏝️ ~ approach.js:12 -> product[i]: ', product2[i]);
        postProduct *= nums[i];
        console.log('🧐 ~ approach.js:13 -> postProduct: ', postProduct);
    }
    
    return product2;
};

console.log(productExceptSelf([1,2,3,4]))