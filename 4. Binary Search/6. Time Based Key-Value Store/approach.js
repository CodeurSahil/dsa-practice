// Output Limit Exceeded

var TimeMap = function() {
    this.dataMap = {};
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {

    if (!this.dataMap[key]) {
        this.dataMap[key] = {};
    }
    this.dataMap[key][timestamp] = value;
    console.log('this.dataMap', this.dataMap)
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    console.log('key', key, timestamp);
    if (!this.dataMap[key]) {
        return '';
    }

    if (this.dataMap[key][timestamp]) {
        return this.dataMap[key][timestamp];
    }

    const keyArray = Object.keys(this.dataMap[key]);
    let result = '';
    console.log('keyArray', keyArray)

    let l = 0, r = keyArray.length - 1;

    while (l <= r) {
        const MID = l + Math.floor((r - l) / 2);
        console.log('MID', MID, keyArray[MID], keyArray[MID] <= timestamp)

        if (keyArray[MID] <= timestamp) {
            result = this.dataMap[key][keyArray[MID]];
            l = MID + 1;
        } else {
            r = MID - 1;
        }
    }

    return result;
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */


 /**
 Design a time-based key-val Data Structure
    Can store multiple Values for the Same key
    At Different Time Stamp's
        Retrive the Key's Value at a Certain Time Stamp's

Implement TimeMap class;
    TimeMap() initilize the Object of Data Structure

    void set(string key, string val, int timestamp)
        Stores 'key' with 'value' at given 'timestamp'

    void get(string key, int timestamp)
        return 'value' with timestap_prev <= timestamp

        if there sre multiple 'values', then return value associated with largest timestap_prev

        if no values, return ""
  */