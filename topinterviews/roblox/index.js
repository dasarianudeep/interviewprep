let rotate = matrix => {
    let N = matrix.length;

    for (let i=0; i<N; i++) {
        for (let j=0; j<i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    for (let i=0; i<N; i++) {
        for (let j=0; j<Math.floor(N/2); j++) {
            [matrix[i][j], matrix[i][N-1-j]] = [matrix[i][N-1-j], matrix[i][j]];
        }
    }

    return matrix;
}

// Word Search
let exist = (board, word) => {
    let rows = board.length, cols = board[0].length;

    function dfs (i, j, k) {
        if (k === word.length) return true;

        if (i<0 || j<0 || i>=rows || j>=cols) return false;

        if (board[i][j] === word[k]) {
            let tmp = board[i][j];
            board[i][j] = '*';
            if (dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1)) return true;
            board[i][j] = tmp;
        }

        return false;
    }

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false;
    
}

// Maximum Number of Occurrences of a Substring
var maxFreq = function(s, maxLetters, minSize, maxSize) {
    let hash = {}, max=0;
    
    for (let i=0; i<=s.length-minSize; i++) {
        let str = s.substring(i, i+minSize);

        let temp = new Set(str);
        if (temp.size <= maxLetters) {
            if (!hash.hasOwnProperty(str)) {
                hash[str] = 1;
            } else {
                hash[str] += 1;
            }
            max = Math.max(max, hash[str]);
        }
    }

    return max;
};

// Subdomain Visit Count
var subdomainVisits = function(cpdomains) {
    let map = new Map();


    for (const domain of cpdomains) {
        const [visits, fullDomain] = domain.split(" ");
        let domains = fullDomain.split(".");

        while (domains.length) {
            let domain = domains.join(".")
            if (!map.has(domain)) {
                map.set(domain, Number(visits));
            } else {
                let count = map.get(domain);
                map.set(domain, count+Number(visits))
            }
            domains.shift();
        }
    }
    
    return Array.from(map, ([k,v]) => v+" "+k);
};

// Basic Calculator II - LC Medium
let calculate = s => {
    if (!s) return 0;

    let stack=[], num=0, op='+';

    for (let i=0; i<=s.length; i++) {
        if (s[i] === ' ') continue;
        if (s[i] >= '0' && s[i] <= '9') {
            num = (num*10) + Number(s[i]);
            continue;
        }

        if (op === '+') stack.push(num);
        else if (op === '-') stack.push(-num);
        else if (op === '*') stack.push(stack.pop()*num);
        else if (op === '/') stack.push(Math.trunc(stack.pop()/num));
        op = s[i];
        num = 0
    }

    return stack.reduce((a,b) => a+b);
}

// Basic Caculator - LC Hard
var calculateBrackets = function(s) {
    let sign = 1, sum = 0;
    
    const stack = []; 
    for (let i = 0; i < s.length; i += 1) {
        if (s[i] >= '0' && s[i] <= '9') {
            let num = 0
            while (s[i] >= '0' && s[i] <= '9') {
                num = (num * 10) + (s[i] - '0');
                i += 1;
            }
            sum += (num * sign);
            i -= 1;
        } else if (s[i] === '+') {
            sign = 1;
        } else if (s[i] === '-') {
            sign = -1;
        } else if (s[i] === '(') {
            stack.push(sum);
            stack.push(sign);
            sum = 0
            sign = 1;
        } else if (s[i] === ')') {
            sum = stack.pop() * sum;
            sum += stack.pop();
        }
    }
    return sum;
};

/**
 * 
 * Given an array of integers, representing points in a graph, find all points which are the 'peak' points in a graph.

Arr: [ 1, 4, 3, -1, 5, 5, 7, 4, 8 ]

Peaks: [4, 7, 8]} arr 
 * 
 */
const findAllpeakElements = (arr) =>
{
    let rising = true;
    let result = new Array();
    for(let i=1; i< arr.length; i++){
        if(arr[i] >= arr[i-1]){
            rising = true;
        } else if(arr[i] < arr[i-1] && rising === true){
            result.push(arr[i-1]);
            rising = false;
        }
    }
    if(rising == true)
        result.push(arr[arr.length-1]);
    return result;
}


var findPeakElement = function(nums) {
    let low = 0, high = nums.length - 1;

    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (nums[mid] > nums[mid+1]) {
            high = mid;
        } else if (nums[mid] < nums[mid+1]) {
            low = mid + 1;
        }
    }

    return low;
};

var TextEditor = function() {
    this.arr = []
    this.i = 0;
};

/** 
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function(text) {
    const temp = text.split("");
    this.arr.splice(this.i, 0, ...temp)
    this.i += text.length
};

/** 
 * @param {number} k
 * @return {number}
 */
TextEditor.prototype.deleteText = function(k) {  
    let total = 0;
    for (let i = this.i - 1, j = 0; i >= 0 && j < k; i--, j++) {
        this.arr.splice(i, 1)
        total++;
    }
    this.i -= total
    return total
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorLeft = function(k) {
    this.i = Math.max(this.i - k, 0)
    
    const s = Math.max(this.i - 10, 0)
    const e = this.i
    return this.arr.slice(s, e).join("")
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorRight = function(k) {
    this.i = Math.min(this.i + k, this.arr.length)
    
    const s = Math.max(this.i - 10, 0)
    const e = this.i
    return this.arr.slice(s, e).join("")
};

class BrowserHistory {
    constructor(url) {
        this.history = [url];
        this.current = 0
    }

    visit(url) {
        this.history[++this.current] = url;
    }

    back(steps) {
        this.current = Math.max(this.current - steps, 0);
        return this.current[this.current];
    }

    forward(steps) {
        this.current = Math.min(this.current + steps, this.history.length-1);
        return this.current[this.current];
    }
}

var minNumberOfFrogs = function(croakOfFrogs) {
    
    let map = {'c': 0, 'r': 0, 'o': 0, 'a': 0, 'k': 0};
    let currFrogs = 0, maxFrogs = 0;

    for (let i=0; i<croakOfFrogs.length; i++) {
        if (croakOfFrogs[i] === 'c') {
            map['c']++;
            currFrogs++;
            maxFrogs = Math.max(currFrogs, maxFrogs);
        } else if (croakOfFrogs[i] === 'r') {
            if (map['c'] === 0) return -1;
            map['c']--;
            map['r']++
        } else if (croakOfFrogs[i] === 'o') {
            if (map['r'] === 0) return -1;
            map['r']--;
            map['o']++
        } else if (croakOfFrogs[i] === 'a') {
            if (map['o'] === 0) return -1;
            map['o']--;
            map['a']++
        } else if (croakOfFrogs[i] === 'k') {
            if (map['a'] === 0) return -1;
            map['a']--;
            currFrogs--;
        }
    }

    return currFrogs== 0 ? maxFrogs : -1;
};