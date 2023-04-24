const containsDuplicate = nums => {
    let set = new Set();

    for (let n of nums) {
        if (set.has(n)) return true;
        set.add(n);
    }
    return false;
} // T : O(n), S : O(n)

var removeDuplicatesSortedArray = function(nums) {
    var k = 0;

    for (let i=0;i<nums.length-1;i++) {
        if (nums[i] !== nums[i+1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    nums[k++] = nums[nums.length-1];
    return k;
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


console.log(containsDuplicate([1,2,3,4,1]));
console.log(containsDuplicate([1,2,3,4]));

const towSum = (nums, target) => {
    let result = [], set = new Set();

    for (let n of nums) {
        let diff = target - n;
        if (set.has(diff)) return [diff, n];
        set.add(n)
    }
    return result;
} // T : O(n), S :  O(n)

console.log(towSum([2,7,9,11], 9));
console.log(towSum([2,7,9,11], 10));

const validAnagram = (a, b) => {
    if (a.length !== b.length) return false;

    let map = new Map();

    for (let s of a) {
        if (!map.get(s)) {
            map.set(s, 1);
        } else {
            map.set(s, map.get(s) + 1);
        }
    }

    for (let s of b) {
        if (!map.get(s)) return false;
        map.set(s, map.get(s) - 1)
    }

    for (let count of map.values()) {
        if (count !== 0) return false;
    }
    return true;
}

console.log(validAnagram('anagram', 'nagaraa'));
console.log(validAnagram('anagram', 'nagaram'));

const topKFrequentElements =  (nums, k) => {
    let map = new Map();

    for (let n of nums) {
        if (!map.get(n)) {
            map.set(n, 1)
        } else {
            map.set(n, map.get(n) + 1)
        }
    }

    let arr = Array.from(map.keys()).map(key => [key, map.get(key)]);
    arr.sort((a, b) => b[1] -  a[1]);

    let out = [];
    for (let i=0; i<k; i++) {
        out.push(arr[i][0]);
    }

    return out;
}

console.log(topKFrequentElements([1,1,1,2,2,3], 2));

const productExceptSelf = nums => {
    let result = [];

    let prefix = 1;

    for (let i=0 ;i<nums.length; i++) {
        result[i] = prefix;
        prefix*=nums[i];
    }

    let suffix = 1;

    for (let i=nums.length-1; i>=0; i--) {
        result[i]*=suffix;
        suffix*=nums[i]
    }

    return result;
}

console.log(productExceptSelf([1,2,3,4]))
console.log(productExceptSelf([10,2,3]))

const longestConsecutiveSequence = nums => {

    let set = new Set(nums), count = 0, max = 0;

    for (let n of nums) {
        if (!set.has(n-1)) {
            let temp = n;
            while (set.has(temp++)) {
                count++;
                max = Math.max(count, max);
            }
            count = 0;
        }
    }

    return max;
}

console.log(longestConsecutiveSequence([100,4,200,1,3,2]));
console.log(longestConsecutiveSequence([0,3,7,2,5,8,4,6,0,1]));

const groupAnagrams = strs => {

    let map = new Map();

    for (let s of strs) {
        let str = s.split('').sort().join('');
        if (!map.get(str)) {
            map.set(str, [s])
        } else {
            map.get(str).push(s);
        }
    }

    return Array.from(map.values());
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
console.log(groupAnagrams(["anu"]));

const isValidPalindrome = s => {
    let str = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    for (let i=0; i< Math.floor(str.length/2); i++) {
        if (str[i] !==str[str.length-1-i]) {
            return false;
        }
    }

    return true;
}

console.log(isValidPalindrome('A man, a plan, a canal: Panama'));
console.log(isValidPalindrome('race a car'));


const threeSum = (nums) => {
    nums.sort((a, b) => a-b);

    let result = [];

    for (let i=0 ;i<nums.length; i++) {
        let j=i+1,k=nums.length-1;

        if (i!==0 && nums[i]===nums[i-1]) continue;
        while (j < k) {
            if (nums[i]+nums[j]+nums[k] === 0) {
                result.push([nums[i], nums[j], nums[k]]);
                while (j<k && nums[j] === nums[j+1]) j++;
                while (j<k && nums[k] === nums[k-1]) k--;
                j++;
                k--; 
            } else if (0 > nums[i]+nums[j]+nums[k]) {
                j++;
            } else {
                k--
            }
        }
    }

    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));
console.log(threeSum([0,1,1]));


const maxProfit = prices => {
    let left=0, right=1, max=0;

    while (right < prices.length) {
        if (prices[left] < prices[right]) {
            max = Math.max(prices[right] - prices[left], max);
        } else {
            left = right;
        }
        right++;
    }

    return max;
}

console.log(maxProfit([7,1,5,3,6,4]));
console.log(maxProfit([7,6,4,3,1]));

const validParanthesis = str => {

    let stack = [], map = new Map([['(', ')'], ['{', '}'], ['[', ']']]);

    for (let s of str) {
        if (map.get(s)) stack.push(map.get(s))
        else {
            if (stack.pop() !== s) return false
        }
    }

    return true;
}

console.log(validParanthesis('(({))'));
console.log(validParanthesis('(([{()}]))'));

const lengthOfLongestSubstring = s => {

    let left=0,max=0,set=new Set();

    for (let i=0;i<s.length;i++) {
        while (set.has(s[i])) {
            set.delete(s[left]);
            left++
        }
        set.add(s[i]);
        max = Math.max(max, set.size);

    }
    return max;

}

console.log(lengthOfLongestSubstring('abce'));
console.log(lengthOfLongestSubstring('abbce'));

const searchInRotatedSortedArray = function (nums, target) {
    
    let low = 0, high = nums.length-1;

    while (low <= high) {
        let mid = Math.floor((low+high)/2);

        if (nums[mid] === target) return mid;

        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target <= nums[mid]) {
                high = mid-1;
            } else {
                low = mid+1;
            }
        } else {
            if (target >= nums[mid] && target <= nums[high]) {
                low = mid+1;
            } else {
                high = mid-1;
            }
        }
    }
    return -1;
}

console.log(searchInRotatedSortedArray([4,5,6,7,0,1,2], 1));
console.log(searchInRotatedSortedArray([4,5,6,7,0,1,2], 0));
console.log(searchInRotatedSortedArray([4,5,6,7,0,1,2], 5));
console.log(searchInRotatedSortedArray([4,5,6,7,0,1,2], 4));
console.log(searchInRotatedSortedArray([4,5,6,7,0,1,2], 15));

const minRotatedSearchArray = nums => {
    let low=0, high = nums.length - 1;

    if (nums[high] > nums[low]) return nums[low];

    while (low <= high) {
        let mid = Math.floor((low+high)/2);

        if (nums[mid] > nums[mid+1]) return nums[mid+1];

        if (nums[mid] >= nums[left]) low=mid+1;
        else high=mid-1;
    }
}

console.log(minRotatedSearchArray([3,4,5,1,2]));
console.log(minRotatedSearchArray([4,5,7,0,1]));

const reverseList = head => {
    let [prev, curr, next] = [null, head, null];

    while (curr) {
        next = curr.next;
        curr.next = prev;

        prev = curr;
        curr = next;
    }

    return prev;
}

const mergeTwoList = (list1, list2) => {
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val < list2.val) {
        list1.next = mergeTwoList(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoList(list2.next, list1);
        return list2;
    }
}

const hasLinkedListCycle = head => {
    let [slow, fast] = [head, head];

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true;
    }

    return false;
}

var removeNthFromEnd = function(head, n) {
    let curr = head, length=0, i=1;

    while (curr) {
        curr = curr.next;
        length++;
    }

    if (length === n) return head.next;
    for (curr = head; i<length-n;i++) {
        curr = curr.next;
    }

    curr.next = curr.next.next;

    return head;
};

const setMatrixZero = matrix => {
    let zeroRows = new Set(),
        zeroCols = new Set(),
        rows = matrix.length,
        cols = matrix[0].length;

    for (let i=0; i<rows.length; i++) {
        for (let j=0; j<cols.length; j++) {
            if (matrix[i][j] === 0) {
                zeroRows.add(i);
                zeroCols.add(i);
            }
        }
    }

    for (let i of zeroRows) {
        for (let j=0; j<cols; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i of zeroCols) {
        for (let j=0; j<rows; j++) {
            matrix[j][i] = 0
        }
    }
}

const spiralOrder = function(matrix) {
    let rowStart = 0,
        rowEnd = matrix.length-1,
        colStart = 0,
        colEnd = matrix[0].length-1,
        res = [];

    while (rowStart <= rowEnd && colStart <= colEnd) {
        for (let i=colStart; i<=colEnd; i++) {
            res.push(matrix[rowStart][i]);
        }
        rowStart++;

        for (let i=rowStart; i<=rowEnd; i++) {
            res.push(matrix[i][colEnd]);
        }
        colEnd--;

        if (rowStart <= rowEnd) {
            for (let i=colEnd; i>=colStart; i--) {
            res.push(matrix[rowEnd][i]);
            }
            rowEnd--
        }
        
        if (colStart <= colEnd) {
            for (let i=rowEnd; i>=rowStart; i--) {
            res.push(matrix[i][colStart])
            }
            colStart++;
        }
        
    }

    return res;
};

const transposeMatrix = matrix => {

    let res = [];

    for (let i=0; i<matrix[0].length; i++) {
        let temp = [];
        for (let j=0; j<matrix.length; j++) {
            temp.push(matrix[j][i])
        }
        res.push(temp);
    }
    return res;
}

const isToeplitzMatrix = (matrix) => {
    var rowLen = matrix.length, colLen = matrix[0].length;
    for(var i=0; i< rowLen-1;i++) {
        for(var j=0; j< colLen-1; j++) {
            if(matrix[i][j] !== matrix[i+1][j+1]) return false;
        }
    }
    return true;
};

var flipAndInvertImage = function(image) {
    
    for (let row of image) {
        for (let i=0; i< Math.floor((image.length+1)/2); i++) {
            [row[i], row[image.length-1-i]] = [row[image.length-1-i]^1, row[i]^1];
        }
    }

    return image;
};

var diagonalSum = function(mat) {
    let sum = 0;

    for (let i=0; i<mat.length; i++) {
        sum+=mat[i][i]+mat[i][mat.length-1-i];
    }

    if (mat.length%2 === 1) {
        sum-=mat[Math.floor(mat.length/2)][Math.floor(mat.length/2)]
    }

    return sum;
};

var checkValid = function(matrix) {
    let rows = matrix.length,
        cols = matrix[0].length;

    for (let i=0; i<rows; i++) {
        let set = new Set();
        for (let j=0; j<cols; j++) {
            set.add(matrix[i][j]);
        }
        if (set.size !== matrix.length) return false;
    }

    for (let i=0; i<cols; i++) {
        let set = new Set();
        for (let j=0; j<rows; j++) {
            set.add(matrix[j][i]);
        }
        if (set.size !== matrix.length) return false;
    }

    return true;
};

var matrixReshape = function(mat, r, c) {
    
    if (mat.length*mat[0].length !== r*c) return mat;
    let elements=[],
        reshapedElements=[];
    
    for (let row of mat) elements.push(...row);

    for (let i=0; i<elements.length; i+=c) {
        reshapedElements.push(elements.slice(i,i+c));
    }

    return reshapedElements;
};

var isValidSudoku = function(board) {
    let rows = new Set(),
        cols = new Set(),
        boxes = new Set();

        for (let i=0; i<board.length; i++) {
            rows.clear();
            cols.clear();

            for (let j=0; j<board.length; j++) {
                let currRow = board[i][j];
                if (currRow !== '.') {
                    if (rows.has(currRow)) return false;
                    rows.add(currRow);
                }
                let currCol = board[j][i];
                if (currCol !== '.') {
                    if (cols.has(currCol)) return false;
                    cols.add(currCol);
                }
            }
        }

        for (let i=0; i<7;i+=3) {
            for (let j=0; j<7;j+=3) {
                boxes.clear();
                for (let k=0;k<9;k++) {
                    if (board[i+Math.floor(k/3)][j+Math.floor(k%3)] !== '.') {
                        if (boxes.has(board[i+Math.floor(k/3)][j+Math.floor(k%3)])) return false;
                        boxes.add(board[i+Math.floor(k/3)][j+Math.floor(k%3)])
                    }
                }
            }
        }

        return true;
};

var countNegatives = function(grid) {
    
    let M = grid.length,
        N = grid[0].length,
        negative = 0,
        i=M-1;
        j=0;

    while (i>=0 && j<N) {
        if (grid[i][j] < 0) {
            negative+= (N-j)
            i--
        } else {
            j++;
        }
    }

    return negative;
};

var rotate = function(matrix) {
    let N = matrix.length;

    for (let i=0; i<N; i++) {
        for (let j=0; j<i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    for (let i=0; i<N; i++) {
        for (let j=0; j<Math.floor(N/2); j++) {
            [matrix[i][j], matrix[i][N-1-j]] = [matrix[i][N-1-j],matrix[i][j]]
        }
    }

    return matrix;
};

var construct2DArray = function(original, m, n) {
    if (original.length !== m*n) return [];
    let res =[];
    for (let i=0; i<original.length; i+=n) {
        res.push(original.slice(i,i+n));
    }
    return res;
};

var tictactoe = function(moves) {
    let rows = new Array(3).fill(0),
        cols = new Array(3).fill(0);
    let isPlayerA = true;
    let diagnal = 0,
        antidiagonal = 0;
    
    for (let i = 0; i < moves.length; i++) {
        let counter = isPlayerA? 1:-1; 
        isPlayerA = !isPlayerA; // switch to player B
        let row = moves[i][0],
            col = moves[i][1];
        rows[row] +=  counter;
        cols[col] +=  counter;
        if (row === col) diagnal += counter;
        if (row === 2 - col) antidiagonal += counter;
        
        if (rows[row] === 3 || cols[col] === 3 || antidiagonal === 3 || diagnal === 3) {
            return "A";
        } else if (rows[row] === -3 || cols[col] === -3 || antidiagonal === -3 || diagnal === -3) {
            return "B";
        }
    }
    
    return moves.length === 9 ? "Draw" : "Pending"
};

const maxSubArray = nums => {
    let curr_max = nums[0], total_max = nums[0];

    for (let i=1; i<nums.length; i++) {
        curr_max = Math.max(nums[i], nums[i]+curr_max);
        total_max = Math.max(curr_max, total_max);
    }

    return total_max;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSubArray([5,4,-1,7,8]));

var canJump = function(nums) {
    let maxJump = 0;

    for (let i=0 ;i<nums.length; i++) {
        if (i > maxJump) return false;
        maxJump = Math.max(maxJump, i+nums[i]);
    }

    return true;
};

const subsets = function(nums) {
    let res = [[]], appendarr= []
    
    for(let num of nums){
        appendarr = []
        for(let entry of res){
            appendarr.push([...entry, num])
        }
        
        res.push(...appendarr)
    }
    return res
};

const numberOf1Bits = nums => {
    return [...nums.toString(2)].filter(n => n==='1').length;
}

var missingNumber = function(nums) {
   let sum=0, numSum=0;

   for (let i=0;i<=nums.length;i++) sum+=i;
   for (let i=0;i< nums.length;i++) numSum+=nums[i];

    console.log(sum, numSum)
   return sum - numSum;
};

