
var reverseWords = function(s) {
    let words = s.split(" "), result = "";

    function reverse(w) {
        let str = [...w];

        for (let i=0; i< Math.floor(str.length/2); i++) {
            let temp = str[i];
            str[i] = str[str.length-i-1];
            str[str.length-i-1] = temp;
        }
        return str.join("");
    }
    for (let i=0; i<words.length; i++) {
        let word = words[i];
        result += reverse(word) + " ";
    }

    return result.substring(0, result.length - 1);
};

console.log(reverseWords("Let's take LeetCode contest"));

var reverseList = function (head) {
    let prev = null, next = null

    while (head) {
        next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }

    return prev;
}

var sortedSquares = function(nums) {
    let left = 0, right = nums.length - 1, i=right;
    const out = [];
    while (left <= right) {
        const leftVal = nums[left]*nums[left];
        const rightVal = nums[right]*nums[right];

        if (leftVal > rightVal) {
            out[i--] = leftVal;
            left++;
        } else {
            out[i--] = rightVal;
            right--;
        }
    }
    return out;
};

var cache = {};
var fib = function(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (cache[n]) return cache[n];
    cache[n] = fib(n-1) + fib(n-2);

    return cache[n];
}

console.log(fib(4));

var tribonacci = function(n) {
    let arr = new Array(n + 1).fill(0);
    arr[0] = 0;
    arr[1] = 1;
    arr[2] = 1; 
    
    for(let i = 3; i <= n; i++) {
        arr[i] = arr[i - 3] + arr[i - 2] + arr[i -1];
    }
    
    return arr[n];
};

class QueueWithStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    static isEmpty(s) {
        return s.length === 0;
    }

    push(val) {
        this.stack1.push(val);
    }

    pop() {
        if (QueueWithStacks.isEmpty(this.stack2)) {
            while(!QueueWithStacks.isEmpty(this.stack1)) {
                this.stack2.push(this.stack1.pop())
            }
        }
        return this.stack2.pop();
    }

    peek() {
        if (QueueWithStacks.isEmpty(this.stack2)) {
            while (!QueueWithStacks.isEmpty(this.stack1)) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length];
    }
}

var missingNumber = function(nums) {
    const n = nums.length;
  
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
  
    return expectedSum - actualSum;
  }

  var missingNumber = function(nums) {
    var sum = 0;
    for(var i=0; i<nums.length;i++) {
        sum = sum+nums[i]-i;
    }
    return nums.length-sum;
};

var singleNumber = function(nums) {
    return nums.reduce((prev, curr) => prev^=curr);
  };


  var mergeTwoLists = function(list1, list2) {
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

var isAlienSorted = function(words, order) {

    const map = {};
    for (let i=0; i<order.length;i++) {
        map[order[i]] = i
    }
    
    for (let i=0; i<words.length-1;i++) {
        let w1 = words[i], w2 = words[i+1];
        for (let j=0; j<w1.length;j++) {
            if (j === w2.length) return false;
            if (map[w1[j]] !== map[w2[j]]) {
                if (map[w2[j]] < map[w1[j]]) return false;
                break;
            }
        }
    } 
    return true;
};

var maxProfit = function(prices) {
    let left=0,right=1,maxP = 0;

    while (right < prices.length) {
        if (prices[left] < prices[right]) {
            let profit = prices[right] - prices[left];
            maxP = Math.max(profit, maxP)
        } else {
            left = right;
        }
        right++;
    }

    return maxP;
};

var findSubarrays = function(nums) {
    const len = nums.length
    const existing = new Set()
    
    
    for (let i = 1; i < len; i++) {
        const sum = nums[i] + nums[i - 1]
        if (existing.has(sum))  return true
        
        existing.add(sum)
    }
    
    
    return false
};

var threeSum = function(nums) {
    nums.sort ((a, b) => a-b);
    let result = [];

    for (let i=0; i<nums.length; i++) {
        let j=i+1,k=nums.length-1;

        if (i !== 0 && nums[i] === nums[i-1]) continue;

        while (j < k) {
            if (nums[i] + nums[j] + nums[k] === 0) {
                result.push([nums[i], nums[j], nums[k]]);

                while (j<k && nums[j] === nums[j+1]) j++
                while (j<k && nums[k] === nums[k-1]) k--
                j++;
                k--;
            } else if (0 > (nums[i] + nums[j] + nums[k])) {
                j++
            } else {
                k--
            }
        }
    }
    return result;
};

var isValidParanthesis = function(s) {
    const hash = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    const stack = [];

    for (let i=0; i<s.length; i++) {
        if (hash[s[i]]) {
            stack.push(hash[s[i]])
        } else {
            if (stack.pop() !== s[i]) return false;
        }
    }

    return stack.length === 0;
};

var generateParenthesis = function (n) {
    // Resultant list
    const result = [];
    // Recursively generate parentheses
    generate(result, "", 0, 0, n);
    return result;
};

function generate(result, s, open, close, n) {
    // Base condition
    if (open === n && close === n) {
        result.push(s);
        return;
    }
    // If the number of _open parentheses is less than the given n
    if (open < n) {
        generate(result, s + "(", open + 1, close, n);
    }
    // If we need more close parentheses to balance
    if (close < open) {
        generate(result, s + ")", open, close + 1, n);
    }
};

let validateIPv6Group = function (str) {
    if(str.length === 0 || str.length > 4)
        return false;
    for(let char of str)
        if(isNaN(parseInt(char, 16))) return false;
    return true;
};

let validateIPv4Group = function (str) {
    let int = parseInt(str);
    return int < 256 && int >= 0 && int.toString() === str;
};

var validIPAddress = function(IP) {
    let dotSeparation = IP.split('.'),
        columnSeparation = IP.split(':');
    if(dotSeparation.length === 4 && dotSeparation.every(validateIPv4Group))
        return 'IPv4'
    else if(columnSeparation.length === 8 && columnSeparation.every(validateIPv6Group))
        return 'IPv6';
    return 'Neither';
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  var isPalindrome = function(str, start, end) {
    for(var i=start;i<= start+Math.floor((end-start)/2);i++) {
        if(str[i] !== str[end-i+start]) return false;
    }
    return true;
}

var validPalindrome = function(s) {
    var len = s.length;
    for(var i=0;i<Math.floor(len/2);i++) {
        var j = len-i-1;
        if(s[i] !== s[j]) {
            return isPalindrome(s,i+1,j) || isPalindrome(s, i, j-1);
        }
    }
    return true;
};

var maximumPopulation = function(logs) {
    let  max = -1, year = 0;

    for (let i=1950; i<=2050; i++) {
      let population = 0;
      for (let l of logs) {
        if (i >= l[0] && i < l[1]) {
          population++;
        }
      }
      if (population !==0 && population > max) {
          max = population;
          year = i
      }
    } 
    
    return year;
};