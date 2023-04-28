
function largestNumber (nums) {
    nums.sort((n1, n2) => {
        const a = n1+""+n2;
        const b = n2+""+n1;
        return Number(b) - Number(a);
    });
    
    if (nums[0] === 0) return '0';
    return nums.join('');
}

console.log(largestNumber([3,30,34,5,9]));
console.log(largestNumber([0,0,0]));

function trailingFactorialZeroes (n) {
    let count= 0;
    for (let i=n; i>0; i = Math.floor(i / 5)) {
        count += Math.floor(i / 5);
    }
    return count;
}

function findPeakElement(nums) {
    let low = 0, high = nums.length - 1;

    while (low < high) {
        let mid = low + Math.floor((high-low)/2);

        if (nums[mid] > nums[mid+1]) {
            high = mid;
        } else if (nums[mid] < nums[mid+1]) {
            low = mid+1;
        }
    }

    return low;
}

function maxProductSubarray (nums) {
    let prevMax = nums[0],prevMin = nums[0], result = nums[0];

    for (let i=1; i<nums.length; i++) {
        let localMax = Math.max(nums[i], nums[i]*prevMax, nums[i]*prevMin);
        let localMin = Math.min(nums[i], nums[i]*prevMax, nums[i]*prevMin);

        prevMax = localMax;
        prevMin = localMin;

        result = Math.max(localMax, result);
    }

    return result;
}

console.log(maxProductSubarray([2,3,-2,4]));

function findLongestConsectiveSeq(nums) {
    if (nums.length === 0) return 0;

    let maxLen = 0, currLen = 1;

    for (let i=1; i<nums.length; i++) {
        if(nums[i] === nums[i-1]+1) currLen++;
        else if (nums[i] !== nums[i-1]) {
            maxLen = Math.max(currLen, maxLen);
            currLen = 1;
        }
    }

    maxLen = Math.max(currLen, maxLen);
    return maxLen;
}

function canJump (nums) {
    let maxJump = 0;

    for (let i=0 ;i<nums.length; i++) {
        if (i > maxJump) return false;
        maxJump = Math.max(maxJump, i+nums[i]);
    }
    return true;
}

function sortColors(nums) {
    let c0 = 0, c1 = 0, c2 = 0;

    for (let n of nums) {
        if (n === 0) c0++;
        else if (n === 1) c1++;
        else if (n === 2) c2++;
    }

    let k = 0;
    while (c0 > 0) {
        nums[k] = 0;
        c0--
        k++
    }
    while (c1 > 0) {
        nums[k] = 1;
        c1--
        k++
    }
    while (c2 > 0) {
        nums[k] = 2;
        c2--;
        k++
    }

    return nums;
}

console.log(sortColors([1,0,2,0,1,1,2]));

function Subsets(nums) {

    let result = [];
    dfs([], 0);


    function dfs(current, index) {
        result.push(current);
        for (let i=index; i<nums.length; i++) {
            dfs([...current, nums[i]], i+1);
        }
    }

    return result;
}

console.log(Subsets([1,2,3,4]));

function groupAnagrams (str) {
    let hash = {};

    for (let s of str) {
        const k = s.split('').sort().join('');
        if (hash[k]) {
            hash[k].push(s);
        } else {
            hash[k] = [s];
        }
    }

    return Object.values(hash);
}

function isStringRotated (s1, s2) {
    if (s1.length !== s2.length) return false;

    return (s1 + s2).includes(s1);
}

console.log(isStringRotated('vineetha', 'eethavin'));

function reverseInteger (x) {
    let reversed = 0;
    let negative = x < 0;
    x = Math.abs(x);
    while (x !== 0) {
        reversed = (reversed*10) + (x%10);
        x = Math.floor(x/10);
        if (reversed > Infinity || reversed < -Infinity) return 0;
    }

    return negative ? -reversed : reversed;
}

console.log(reverseInteger(-1123));

function rob(nums) {

    function robHouse(nums, i) {
        if (i < 0) return 0;

        return Math.max(robHouse(nums, i - 2) + nums[i], robHouse(nums, i - 1));
    }

    return robHouse(nums, nums.length - 1);
}

console.log(rob([1,2,3,1]));

function findKthLargest(nums) {
    // Or Use MaxPriority Queue
    nums.sort((a,b) => b-a);
    return nums[k-1];
}

function calculate (s) {
    if (!s) return 0;

    let st = [], num = 0, op = '+';

    for (let i=0; i<s.length;i++) {
        if (s[i] === ' ') continue;
        if (s[i] >= '0' && s[i] <= '9') {
            num = (num*10) + Number(s[i]);
            continue;
        }

        if (op === '+') st.push(num);
        else if (op === '-') st.push(-num);
        else if (op === '*') st.push(st.pop()*num);
        else if (op === '/') st.push(Math.trunc(st.pop()/num));
        op = s[i];
        num = 0;
    }

    st.reduce((a,b) => a+b);
}

//console.log(calculate(3+5/2));

var findMinRotatedSortedArray = function(nums) {
    let l = 0
    let r = nums.length - 1
    
    if(nums[r] > nums[l]){
        return nums[l]
    }
    
    if(nums.length === 1){
        return nums[0]
    }
    
    while(l <= r){
        let m = Math.floor((l+r)/2)
        
        if(nums[m] > nums[m+1]){
            return nums[m+1]    
        }else{
            if(nums[m] >= nums[l]){ //KEY
                l = m + 1
            }else{
               r = m - 1
            }
        }
        
    }     
};

var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [];
  let i=0; j=0;

  while(i < nums1.length && j < nums2.length){
    if(nums1[i] < nums2[j]){
      arr.push(nums1[i]);
      i++;
    }else{
      arr.push(nums2[j]);
      j++;
    }
  }
  
  arr = i < nums1.length ? arr.concat(nums1.slice(i)) :arr.concat(nums2.slice(j))

  const mid = Math.floor(arr.length/2);
  if(arr.length % 2 !== 0) return arr[mid];

  return (arr[mid]+arr[mid-1])/2;
};

function multiplyStrings(a, b) {
    // any zero
    if ([a, b].includes(`0`)) {
        return `0`
    }

    // get length of a, b
    const [lenA, lenB] = [a.length, b.length]

    // set nums for calculate
    let nums = Array(lenA + lenB).fill(0), index = nums.length - 1

    // reverse loop from a
    for (let i = lenB - 1; i >= 0; i--) {
        let key = index--

        // reverse loop from b
        for (let j = lenA - 1; j >= 0; j--) {
            const v = +a[j] * +b[i] + nums[key]

            // current
            nums[key] = v % 10
            // carry
            key--;
            nums[key] += Math.floor(v / 10)
        }
    }

    // remove `0` noneed
    return nums.join('').replace(/^0+/, '')
}