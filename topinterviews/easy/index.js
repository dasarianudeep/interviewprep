function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (target < arr[mid]) {
        right = mid - 1;
      } else if (target > arr[mid]) {
        left = mid + 1;
      } else {
        return arr[mid];
      }
    }
    return -1;
  }

function twoSum (nums, target) {
    let out = [], hash = {};

    for (let i=0; i<nums.length;i++) {
        const diff = target - nums[i];
        if (hash.hasOwnProperty(diff)) {
            out[0] = hash[diff];
            out[1] = i;
            return out;
        }
        hash[nums[i]] = i;
    }
    return out;
}

console.log(twoSum([2,7,11,4], 9));

function romanIntoInt (s) {
    let out = 0, prev = 0, num;

    for (let i=s.length-1; i>=0; i--) {
        switch (s[i]) {
            case 'I': num = 1; break;
            case 'V': num =5; break;
            case 'X': num = 10; break;
            case 'L': num = 50; break;
        }
        if (num < prev) {
            out -= num;
        }else {
            out += num;
        }
        prev = num;
    }
    return out;
}

console.log(romanIntoInt('VXL'));

function longestCommonPrefix (str) {
    let prefix = str[0];

    for (let i=1; i<str.length; i++) {
        while (str[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length-1)
        }
    }
    return prefix;
}

console.log(longestCommonPrefix(['mint', 'mineral', 'minnesota']));

function isValidParanthesis (s) {
    const stack =[];
    const hash = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let i=0; i<s.length; i++) {
        if (hash.hasOwnProperty(s[i])) stack.push(hash[s[i]]);
        else {
            if (stack.pop() !== s[i]) return false
        }
    }

    return stack.length === 0;
}

console.log(isValidParanthesis('({{(})}})'));

var mergeTwoLinkedLists = function(list1, list2) {
    var out;
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    if (list1.val <= list2.val) {
        out = list1;
        out.next = mergeTwoLists(list1.next, list2);
    } else {
        out = list2;
        out.next = mergeTwoLists(list2.next, list1)
    }

    return out;
};

function removeDupsSortedArray(nums) {
    let k = 0;

    for (let i=0; i<nums.length; i++) {
        if (nums[i] !== nums[i+1]) {
            nums[k] = nums[i];
            k++
        }
    }
    nums[k++] = nums[nums.length - 1];
    return k;
}

var removeElement = function(nums, val) {
    var i = 0, len = nums.length;
    for(var j=0;j<len;j++) {
        if(nums[j] !== val) {
            nums[i] = nums[j];
            i++
        }
    }
    return i;
};

function indexOf (haystack, needle) {
    if (haystack === needle) return 0;
    let len1 = haystack.length, len2 = needle.length;
    if (len2 > len1) return -1;
    for (let i=0; i<= (len1 - len2); i++) {
        let k = 0;
        while (k < len2 && needle[k] === haystack[i+k]) k++;
        if (k === len2) return i;
    }
    return -1;
}

console.log(indexOf('anudeep', 'hey'));

function Sqrt(x) {
    if (x === 0) return 0;
    let low = 1, high = x;

    while (low <= high) {
        let mid = Math.floor((low+high)/2);
        if (mid*mid === x) return mid;
        if (x > mid*mid && x < (mid+1)*(mid+1)) return mid;
        if (x > mid*mid) low = mid + 1;
        else if (x < mid*mid) high = mid - 1
    }
}

console.log(Sqrt(8));

var plusOne = function(digits) {
    let end = digits.length - 1;
    for(let i = end; i >= 0; i--){
        if(digits[i] !== 9){
            digits[i] = digits[i] + 1;
            break;
        } else {
            digits[i] = 0;
        }
    }

    if(digits[0] === 0) digits.unshift(1);
    return digits;
};

function isPalindrome (s) {
    for (let i =0; i< Math.floor(s.length/2); i++) {
        if (s[i] !== s[s.length-i-1]) {
            return false;
        }
    }
    return true;
}

var mergeSortedArray = function(nums1, m, nums2, n) {
    var pos = m+n-1,
        i=m-1,
        j=n-1;
    while(i>= 0 && j>=0) {
        if(nums1[i] > nums2[j]) {
            nums1[pos] = nums1[i];
            pos = pos-1;
            i = i-1;
        } else {
            nums1[pos] = nums2[j];
            pos = pos-1;
            j = j-1;
        }
    }
    while(j>=0) {
         nums1[pos] = nums2[j];
            pos = pos-1;
            j = j-1;
    }
    return nums1;
};

var climbStairs = function(n) {
    if(n === 1) return 1;
    var steps = [];
    steps[1] = 1;
    steps[2] = 2;
    for(var i=3;i<=n;i++)
        steps[i] = steps[i-1] + steps[i-2];
    return steps[n];
};

var isSymmetric = function(root) {
    if (!root) return true;
    return dfs(root.left, root.right);
    
    function dfs (l ,r) {
        if (!l && !r) return true;
        if (!l || !r) return false;
        if (l.val !== r.val) return false;

        return dfs(l.left, r.right) && dfs(l.right,r.left);
    }
};

function containsDuplicate(nums) {
    let n = [...nums].sort((a, b) => a - b);

    for (let i=0 ;i<n.length - 1; i++) {
        if (n[i] === n[i+1]) {
            return true;
        }
    }
    return false;
}

var containsDuplicate = function(nums) {
    const s = new Set(nums); 
    return s.size !== nums.length
};

var containsNearbyDuplicate = function(nums, k) {
      let hash = {}, n = nums.length;
      for (let i = 0; i < n; i++) {
          if (hash.hasOwnProperty(nums[i]) && i - hash[nums[i]] <= k) {
              return true;
          }
          hash[nums[i]] = i;
      }
      return false;
  };
console.log(containsDuplicate([1,3,4,2]))

function findMissingNumber (nums) {
    let sum = 0;
    for (let i=0; i<nums.length;i++) {
        sum = sum+nums[i]-i;
    }
    return nums.length - sum;
}

function SingleNumber(n) {
    let out = n[0];

    for (let i=1; i<n.length; i++) {
        out = out^n[i];
    }
    return out;
}

console.log(SingleNumber([1,1,3,3,6]));

function moveZeroes(nums) {
    let pos = 0;

    for(let i=0; i<nums.length; i++) {
        if (nums[i] !== 0) {
            nums[pos] = nums[i];
            pos++;
        }
    }

    while (pos < nums.length) {
        nums[pos] = 0;
        pos++
    }

    return nums
}

console.log(moveZeroes([0,0,0,3,12]));


function firstUniqString (str) {
    const map = {};

    for (let i=0; i<str.length;i++) {
        if (!map[str[i]]) map[str[i]] = 1;
        else {
            map[str[i]]++;
        }
    }

    for (let i=0; i<str.length; i++) {
        if (map[str[i]] === 1) return i;
    }
    return -1;
}

console.log(firstUniqString('loveleetcode'))

function MajorityElement (n) {
    let arr = [...n];
    arr.sort((a,b) => a-b);

    return arr[Math.floor(n.length/2)];
}

console.log(MajorityElement([2,2,1,1,1,2,2]));

function PowerOfThree (n) {

    while (n>3 && n%3 === 0) {
        n = n/3;
    }

    return n===3 || n===1;
}

console.log(PowerOfThree(29))

var isSymmetric = function(root) {
    if (!root) return true;
    return dfs(root.left, root.right);
    
    function dfs (l ,r) {
        if (!l && !r) return true;
        if (!l || !r) return false;
        if (l.val !== r.val) return false;

        return dfs(l.left, r.right) && dfs(l.right,r.left);
    }
};

var hasCycle = function(head) {
    
    while (head) {
        if (head.visited) return true;
        head.visited = true;
        head = head.next;
    }

    return false;
};

let firstUniqChar = function(s) {
    let map=new Map();
    for(let x of s){
        if(map.has(x)){
            map.set(x,map.get(x)+1);
        }
        else{
            map.set(x,1);
        }
    }
    console.log(map,'map');
    for(let[k,v] of map){
        if(v===1){
            let val=s.indexOf(k);
            return val;
        }
    }    
};

var reverseString = function(s) {
    for (let i=0; i< Math.floor(s.length/2) ; i++) {
        [s[i], s[s.length-i-1]] = [s[s.length-i-1], s[i]];
    }

    return s;
};

var isPalindrome = function(head) {

    // Get midddle of the list by using a fast and slow pointer
	
    let slow = head
    let fast = head
    
    while(fast && fast.next){
        slow=slow.next
        fast=fast.next.next
    }
   
   // Reverse the end of the list
   
   let reversed = null
   let next = null
   let cur = slow
 
   while(cur){
  	    next = cur.next;
		cur.next = reversed;
		reversed = cur;
		cur = next;
   }
   
  // Then traverse both lists to compare values returning false if any of them aren't equal
  
  while(reversed){
      if(reversed.val !== head.val) return false
      reversed = reversed.next
      head=head.next
  }
    
    return true
};

var intersection = function(nums1, nums2) {
    let map = new Set()
    let result = new Set()
    
    for (let num of nums1) {
        map.add(num)
    }
    

    for (let num of nums2) {
        if (map.has(num)) {
            result.add(num)
        }
    }
    
    return Array.from(result)
};

let intersectII = function(nums1, nums2) {
    let final=[];
    for(let i=0;i<nums2.length;i++){
           let val=nums2[i];
           if(nums1.includes(val)){
               let spval=nums1.splice(nums1.indexOf(val),1);
               final.push(val);
           }
    }
    return final;
};

var lengthOfLongestSubstring = function(s) {
    var chars = new  Map(), start = 0,  len = 0;

    for (let i=0; i<s.length; i++) {
        if (chars.has(s[i])) {
            start = Math.max(chars.get(s[i])+1, start)
        }
        len = Math.max(len, i-start+1);
        chars.set(s[i], i);
    }
    return len;
};

var removeAdjacentDuplicates = function(S) {
    var stack = [];
    for (var i=0; i<S.length; i++) {
        if (stack.length) {
            if (S[i] === stack[stack.length - 1]) {
                stack.pop();
            } else {
                stack.push(S[i]);
            }
        } else {
            stack.push(S[i]);
        }
    }
    
    return stack.join('');
};

var topKFrequent = function(nums, k) {
    const map = {};
    
    nums.forEach((ele) =>{
        map[ele] = (map[ele] || 0) +1;
    })
    
    const countArr = [];
    
    Object.entries(map).forEach(([k, v]) =>{
     if(!countArr[v]){
        countArr[v] = [k];
        } else {
            countArr[v].push(k);        
        }
    });
    
    let i= countArr.length -1;
    
    const res = []
    
    while(k>0){
        if(!countArr[i] || countArr[i].length == 0) {
            i--;
        }else {
            res.push(countArr[i].pop());
            k--;
        }
    }
    
    return res;
};

var firstUniqChar = function(str){
    var freq = Array(26).fill(0);
    for(var s of str){
        const idx = s.charCodeAt()-97;
        freq[idx]+=1;
    }
    for(var i=0; i<str.length; i++){
        const idx = str[i].charCodeAt()-97;
        if(freq[idx] === 1) return i;
    }
    return -1;
}


var addStrings = function (num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let sum = [];
    let carry = 0;
	
    while (i >= 0 || j >= 0 || carry) {
        let n1 = num1[i] || 0;
        let n2 = num2[j] || 0;

        let curSum = parseInt(n1) + parseInt(n2) + carry;
        let reminder = curSum % 10;
        sum.unshift(reminder);
        carry = curSum >= 10 ? 1 : 0;
		
        j--;
        i--;
    }
    return sum.join("");
};

