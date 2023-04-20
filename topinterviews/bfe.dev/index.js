


// /*
//     Currying is transforming a function with multiple arguments into a sequence of 
//     functions with any number of arguments
// curry() should return a function
// The returned function should
// if number of arguments matches original function, return the final result
// otherwise return a function which expects the missing arguments, also this function needs to be curried as well.
// */
// function curry (fn) {
//     return function curried (...args) {
//         if (args.length >= fn.length) {
//             return fn.call(this, ...args);
//         } 
//         //Returns a function which expects the missing arguments and also this function should be curried as well
//         return function (...missingArsg) {
//             return curried.call(this, ...args, ...missingArsg);
//         }
//     }
// }

//  function once(func) {
//   let ran = true;
//   let value;

//   return function (...args) {
//     if (ran) {
//       value = func.apply(this, args);
//       ran = false;
//     }
//     return value;
//   }
// }


// function throttle(func, wait = 0) {
//   let shouldThrottle = false;

//   return function (...args) {
//     if (shouldThrottle) {
//       return;
//     }

//     shouldThrottle = true;
//     setTimeout(function () {
//       shouldThrottle = false;
//     }, wait);

//     func.apply(this, args);
//   };
// }

function throttleLeading(fn, delay) {
  let timeout;

  return function(...args) {
    if (!timeout) {
      fn.apply(this, args);
      timeout = true;
      setTimeout(() => {
        timeout =  false;
      }, delay);
    }
  }
}
function throttleTrailing(fn, delay) {
  let timerId;

  return function(...args) {
    if (timerId) return;

    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delay);
  }
}

// function flat (arr, depth = 1) {
//     const result = []

//     for (const item of arr) {
//         if (Array.isArray(item) && depth>0) {
//             const flattened = flat(item, depth - 1);
//             result.push(...flattened);
//         } else {
//             result.push(item);
//         }
//     }
//     return result;
// }

// console.log(flat([1,2,[3,4,[5]]], 2));

// function debounce(func, wait) {
//     let timerId = null;

//     return function (...args) {
//         clearTimeout(timerId);

//         timerId = setTimeout(() => {
//             func.apply(this, args);
//         })
//     }
// }

    function debounce (func, wait, option = {leading: false, trailing: true}) {
      let timerId = null;
      return function() {
        let invoked = false;
        
        if (!timerId && option.leading) {
          func.apply(this, arguments);
          invoked = true;
        }
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          if (option.trailing && !invoked) {
            func.apply(this, arguments);
          }
          timerId = null;
        }, wait )
      }
    }

// function debounce(func, wait = 0) {
//   let timeoutId = null;
//   let context = undefined;
//   let argsToInvoke = undefined;

//   function clearTimer() {
//     clearTimeout(timeoutId);
//     timeoutId = null;
//   }

//   function invoke() {
//     // Don't invoke if there's no pending callback.
//     if (timeoutId == null) {
//       return;
//     }

//     clearTimer();
//     func.apply(context, argsToInvoke);
//   }

//   function fn(...args) {
//     clearTimer();
//     argsToInvoke = args;
//     context = this;
//     timeoutId = setTimeout(function () {
//       invoke();
//     }, wait);
//   }

//   fn.cancel = clearTimer;
//   fn.flush = invoke;
//   return fn;
// }

// function pipe(fns) {
//     return val => {
//         return funcs.reduce((val, func) => func(val), val);
//     }
// }

// function compose(fns) {
//     return val => {
//         return fns.reduceRight((val, fn) => fn(val), val);
//     }
// }

// /**
//  * Implement jQuery style $(el).css(name, value);
//  */

// function $(el) {
//     return new Wrapper(el);
// }

// class Wrapper {
//     constructor(el) {
//         this.el = el
//     }

//     css(propertyName, value) {
//         this.el.style[propertyName] = value;
//         return this;
//     }
// }

// function $(el) {
//     return {
//         _domNode: el,
//         css: function(propertyName, value) {
//             this._domNode.style[propertyName] = value;
//             return this;
//         }
//     }
// }

// class jQuery {
//     constructor(selector) {
//       this.element = document.querySelector(selector);
//     }
  
//     css(prop, value) {
//       // Getter case.
//       if (value === undefined) {
//         // No matching elements.
//         if (this.element == null) {
//           return undefined;
//         }
  
//         const value = this.element.style[prop];
//         return value === '' ? undefined : value;
//       }
  
//       // Setter case.
//       if (this.element != null) {
//         this.element.style[prop] = value;
//       }
  
//       return this;
//     }
//   }
  
//   export default function $(element) {
//     return new jQuery(element);
//   }

// class NodeStore {
//     constructor() {
//         this.store = {}
//     }

//     set(node, value) {
//         const key = node._key || Symbol();
//         node._key = key;
//         this.store[key] = value;
//     }

//     get(node) {
//         return this.nodes[node._key];
//     }

//     has(node) {
//         return !!this.node[node._key];
//     }
// }

// function findCorrespondingNodeDFS (rootA, rootB, target) {
//     if (rootA === target) {
//         return rootB;
//     }

//     for (let i=0; i<rootA.children.length; i++) {
//         const found = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
//         if (found) return found;
//     }
// }

// function findCorrespondingNodeBF (rootA, rootB, target) {
//     if (rootA === target) return rootB;

//     const queueA = [rootA];
//     const queueB = [rootB];

//     while (queueA.length) {
//         const currA = queueA.shift();
//         const currB = queueB.shift();

//         if (currA === target) {
//             return currB;
//         }

//         queueA.push(...currA.children);
//         queueB.push(...currB.children);
//     }
//     return null;
// }

// function sum(num) {
//     function func(n) {
//         return sum(num + n);
//     }

//     sum.valueOf = () => num;
//     return func;
// }

// function mergeList (arr1, arr2) {
//     let i=0, j=0;
//     let result = [];

//     while (i<arr1.length && j<arr2.length) {
//         if (arr1[i] < arr2[j]) {
//             result.push(arr1[i++])
//         } else if (arr1[i] > arr2[j]) {
//             result.push(arr2[j++])
//         } else {
//             result.push(arr1[i++]);
//             result.push(arr2[j++]);
//         }

//         while (i < arr1.length) {
//             result.push(arr1[i++]);
//         }

//         while (j < arr2.length) {
//             result.push(arr2[j++]);
//         }

//         return result;
//     }
// }

// function fib(n) {
//     if (n <= 1) return n;
//     return fib(n-1) + fib(n-2);
// }

// function fib(n, memo={}) {
//     if (n <= 1) return n;
//     if (memo[n]) return memo[n];
//     memo[n] = fib(n-1, memo) + fib(n-2, memo);
//     return memo[n];
// }

// function invertBinaryTree (node) {
//     if(!node) return null;
//     if (node.left) return invertBinaryTree(node.left);
//     if (node.right) return invertBinaryTree(node.right);

//     const temp = node.left;
//     node.left = node.right;
//     node.right = temp;

//     return node;
// }

// function MyObjectCreate(proto) {
//     if (proto === null || typeof proto !== object) throw Error();

//     function f() {

//     }
//     f.prototype = proto;
//     return new f();
// }

// function BFSDOMTraversal(root) {
//     if (!root) return [];
//     const result = [];
//     const queue = [root];

//     while (queue.length !== 0) {
//         const current = queue.shift();
//         result.push(current);
//         if (current.hasChildNodes()) {
//             result.push(...current.children);
//         }
//     }

//     return result;
// }

// function firstDuplicate(nums) {
//     const obj = {};

//     for (let n of nums) {
//         if (obj[n]) return n;
//         obj[n] = true;
//     }
//     return null;
// }

// function largestDiff(arr) {
//     if (arr.length < 2) return 0;
//     let min = Infinity;
//     let max = -Infinity;
//     arr.forEach(item => {
//         max = Math.max(item, max);
//         min = Math.min(item, min);
//     });

//     return max-min;
// }

// function pow(base , power) {
//     if (power === 0) return 1;
//     if (base === 1) return 1;

//     if (power > 1) return base*pow(base, power -1);
//     else {
//         return 1 / base*power(base, power +1);
//     }
// }

// function countPalindromicSubstrings(s) {
//     let count = 0;
//     for (let i=0; i<s.length;i++) {
//         palindrome(s, i, i);
//         palindrome(s, i, i+1);
//     }
//     function palindrome(s, j, k) {
//         while (j>=0 && k<=s.length && s[j--] === s[k++]) {
//             count++;
//         }
//     }
// }

// function ObjectIs(a, b) {
//     if (Number.isNaN(a) && Number.isNaN(b)) return true;

//     if (a === 0 && b === 0) {
//         return 1/a === 1/b;
//     }

//     return a === b;
// }

// console.log(ObjectIs(0, -0));

// function range (start, stop, step) {

//     return new Array(stop - start + 1).fill(0).map((d, i) => i + start);
//     // return new Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i*step))
// }

// console.log(range(4,9));

// function intersectionTwoArrays(arr1, arr2) {

//     const set1 = new Set(arr1);
//     const set2 = new Set(arr2);

//     let result = [];
//     for (let i of set1) {
//         if (set2.has(i)) {
//             result.push(i);
//         }
//     } 
//     return result;
//     /**
//      * arr1.filter(i => arr2.includes(i));
//      */
// }

function IntersectionTwoSortedArrays (arr1, arr2) {
  let result = 0, p1 = 0, p2 = 0;

  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] < arr2[p2]) p1++;
    else if (arr1[p1] > arr2[p2]) p2++;
    else {
      result.push(arr1[p1]);
      p1++;
      p2++;
    }
  }

  return result;
}

// function intersectionTwoArraysII(nums1, nums2) {
//     // ORder and duplicates maintained
//     let result = [];

//     for (let i = 0; i<nums3.length; i++) {
//         let val=nums2[i];
//         if (nums1.includes(val)) {
//             let deletedVal = nums1.splice(nums.indexOf(val), 1);
//             result.push(val);
//         }
//     }
//     return result;
    
//     const hash = {}, result = []
//     for (let n of nums1) {
//         if (!hash[n]) hash[n] = 1;
//         else {
//             hash[n] += 1;
//         }
//     }
//     for (let n of nums2) {
//         if (!hash[n] && (hash[n]>0)) {
//             result.push(n);
//             hash[n] =- 1;
//         }
//     }
//     return result;
// }

// function Intersection2DArray(nums) {
//     return nums.reduce((acc, curr) => curr.filter(val => acc.includes(val)), nums[0]).sort((a,b) => a - b);
// }

// Array.prototype.myReduce = function (callbackFn, initialValue) {
//     const noInitialValue = initialValue === undefined;
//     const len = this.length;
  
//     if (noInitialValue && len === 0) {
//       throw new TypeError('Reduce of empty array with no initial value');
//     }
  
//     let acc = noInitialValue ? this[0] : initialValue;
//     let startIndex = noInitialValue ? 1 : 0;
  
//     for (let i = startIndex; i < len; i++) {
//       if (Object.hasOwn(this, i)) {
//         acc = callbackFn(acc, this[i], i, this);
//       }
//     }
  
//     return acc;
//   };

//   export default function get(object, path, defaultValue) {
//     const pathParams = Array.isArray(path) ? path : path.split('.');
  
//     // let index = 0;
//     let current = object;
  
//     for ( let i = 0; i < pathParams.length; i++) {
//       if (current === null) return defaultValue
//       if (current[pathParams[i]] === undefined) return defaultValue;
//       current = current[pathParams[i]];
//     }
//     return current;
    
//   }

//   export default function promiseRace(iterable) {
//     /**
//      * The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an 
//      * iterable fulfills or rejects, with the value or reason from that promise.
//      */
//     return new Promise((resolve, reject) => {
//       if (iterable.length === 0) {
//         return;
//       }
  
//     //   iterable.forEach((iter) => {
//     //     Promise.resolve(iter)
//     //       .then(resolve, reject) 
//     //       .catch(reject);
//     //   });
    
//       iterable.forEach(async item => {
//         try {
//           const value = await item;
//           resolve(value);
//         } catch (err) {
//           reject(err);
//         }
//       })
//     });
//   }

//   export default function promiseAny(iterable) {
//     /**
//      * Promise.any() takes an iterable of elements (usually Promises). It returns a single promise that resolves as 
//      * soon as any of the elements in the iterable fulfills, with the value of the fulfilled promise. If no promises
//      *  in the iterable fulfill (if all of the given elements are rejected), then the returned promise is rejected 
//      * with an AggregateError, a new subclass of Error that groups together individual errors
//      */
//     return new Promise((resolve, reject) => {
//       if (iterable.length == 0) {
//         reject(new AggregateError([]))
//       }
  
//       let pending = iterable.length;
//       const errors = new Array(iterable.length);


      // iterable.forEach((item, index) =>
      // Promise.resolve(item).then(
      //   (value) => {
      //     resolve(value);
      //   },
      //   (reason) => {
      //     errors[index] = reason;
      //     pending--;

      //     if (pending === 0) {
      //       reject(new AggregateError(errors));
      //     }
      //   },
      // ),
      // );
//       iterable.forEach(async (item,i) => {
//         try {
//           const value = await item;
//           resolve(value);
//         } catch (err) {
//           errors[i] = err;
//           pending--;
  
//           if (pending === 0) {
//             reject(new AggregateError(errors))
//           }
//         }
//       })
//     })
//   }

//   export default function promiseAll(iterable) {
//     /**
//      * This returned promise will resolve when all of the input's promises have resolved, or if the input iterable
//      *  contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises
//      *  throwing an error, and will reject with this first rejection message / error
//      */
//     return new Promise((resolve, reject) => {
//       const results = new Array(iterable.length);
//       let unresolved = iterable.length;
  
//       if (unresolved === 0) {
//         resolve(results);
//         return;
//       }

    // iterable.forEach((item, index) => {
    //   Promise.resolve(item).then(
    //     (value) => {
    //       results[index] = value;
    //       unresolved -= 1;

    //       if (unresolved === 0) {
    //         resolve(results);
    //       }
    //     },
    //     (reason) => {
    //       reject(reason);
    //     },
    //   );
    // });

//       iterable.forEach(async (item, i) => {
//         try {
//           const value = await item;
//           results[i] = value;
//           unresolved--;
//           if (unresolved === 0) {
//             resolve(results);
//           }
//         } catch (err) {
//           reject(err);
//         }
//       })
//     })
//   }

//   export default function promiseAllSettled(iterable) {
//     /**
//      * The Promise.allSettled() method returns a promise that resolves after all of the given promises have either
//      *  fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
//      */
//     return new Promise((resolve) => {
//         const results = new Array(iterable.length);
//         let pending = iterable.length;
  
//         if (pending === 0) {
//           resolve(results);
//           return;
//         }
            
//         iterable.forEach(async (item, index) => {
//           try {
//             const value = await item;
//             results[index] = {
//               status: 'fulfilled',
//               value
//             }
//           } catch (err) {
//             results[index] = {
//               status: 'rejected',
//               reason: errc
//             }
//           }
//           pending = pending - 1;
//         if (pending === 0) {
//           resolve(results);
//         }
//         });
  
//         
//     })
//   }

//   export default function getElementsByTagName(rootElement, tagName) {
//     const elements = [];
//     const tag = tagName.toUpperCase();
  
//     function traverse (element) {
//       if (element === null) return;
  
//       if (element.tagName === tag) {
//         elements.push(element);
//       }
//       for (let i=0; i<element.children.length;i++) {
//         traverse(element.children[i]);
//       }
//     }
  
//     for (let i = 0; i < rootElement.children.length; i++) {
//       traverse(rootElement.children[i]);
//     }
//     return elements;
//   }


 
//  function getElementsByClassName(element, classNames) {
//     function isSubset(a, b) {
//         return Array.from(a).every(val => b.contains(val));
//       }

//     const elements = [];
//     const classNamesSet = new Set(classNames.trim().split(/\s+/));
  
//     function traverse (element) {
//       if (element === null) return;
  
//       if (isSubset(classNamesSet, element.classList)) {
//         elements.push(element);
//       }
  
//       for (let i=0; i<element.children.length;i++) {
//         traverse(element.children[i]);
//       }
//     }
  
//     for (let i=0; i<element.children.length;i++) {
//       traverse(element.children[i]);
//     }
//     return elements;
//   }

//   function isSameTree(nodeA, nodeB) {
//     if (nodeA.nodeType !== nodeB.nodeType) {
//       return false
//     }
  
//     if (nodeA.nodeType === Node.TEXT_NODE) {
//       return nodeA.textContent === nodeB.textContent;
//     }
  
//     if (nodeA.tagName !== nodeB.tagName) {
//       return false
//     }
  
//     if (nodeA.childNodes.length !== nodeB.childNodes.length) {
//       return false
//     }
  
//     if (nodeA.attributes.length !== nodeB.attributes.length) {
//       return false
//     }
  
//     const hasSameAttributes = nodeA.getAttributeNames.every(attrName => {
//       return nodeA.getAttribute(attrName) === nodeB.getAttribute(attrName);
//     });
  
//     if (!hasSameAttributes) {
//       return false
//     }
  
//     return Array.prototype.every.call(nodeA.childNodes, (childA, index) =>
//       isSameTree(childA, nodeB.childNodes[index]),
//     );
//   }

//   function deepClone (value) {
//     if (typeof value !== object || value ===  null) return value;

//     if (Array.isArray(value)) {
//         return value.map(val => deepClone(val));
//     }

//     const cloned = Object.entries(value).map(([k,v]) => [k, deepClone(v)]);

//     return Object.fromEntries(cloned);
//   }


//   export default function deepEqual(valueA, valueB) {
//     function isDeepCompare(type) {
//         return type === '[object Object]' || type === '[object Array]';
//       }
      
//     const type1 = Object.prototype.toString.call(valueA);
//     const type2 = Object.prototype.toString.call(valueB);
  
//   if (type1 === type2 && isDeepCompare(type1) && isDeepCompare(type2)) {
//     const kvPairs1 = Object.entries(valueA);
//     const kvPairs2 = Object.entries(valueB);
  
//     if (kvPairs1.length !== kvPairs2.length) {
//       return false;
//     }
  
//     return kvPairs1.every(
//       ([k,v]) => Object.hasOwn(valueB, k) && deepEqual(v, valueB[k])
//     )
//   }
//     return Object.is(valueA, valueB);
//   }

function semverCompare(v1, v2) {
  
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      continue;
    }

    return a[i] < b[i] ? -1 : 1;
  }

  return 0;
}

  function undefinedToNull (arg) {
    if (arg === undefined) {
      return null;
    }
    else if (Array.isArray(arg)) {
      return arg.map(undefinedToNull);
    }

    else if (Object.prototype.toString.call(arg) === '[object Object]') {
      const keys = Object.keys(arg);
      return keys.reduce((result, key) => {
        result[key] = (arg === undefined) ? null : undefinedToNull(arg[key]);
        return result;
      }, {});
    }

    return arg;
  }

  console.log(undefinedToNull({a: undefined, b: 'BFE.dev'}));
  console.log(undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']}));

  function uncompress (s) {

    let stack = [];

    for (let i=0; i<s.length; i++) {
      if (s[i] !== ')') {
        stack.push(s[i]);
      } else {
        let substr = '';

        while (stack.length && stack[stack.length-1] !== '(') {
          substr = stack.pop() + substr;
        }

        stack.pop();

        let k = '';
        while (stack.length && !isNaN(stack[stack.length-1])) {
          k = stack.pop() + k
        }
        stack.push(substr.repeat(Number(k)));
      }
    }

    return stack.join('');
  }

  console.log(uncompress('3(ab2(c))'));
  console.log(uncompress('3(ab)c'));

  function generateCSSSelector (el) {
    let path = [], parent;

    while (parent = el.parentNode) {
      let tag = el.tagName, siblings, selector;
      if (el.id) {
        selector = `#${el.id}`;
      } else {
        siblings = parent.children;
        if (Array.from(siblings).filter(sibling => sibling.tagName === tag).length === 1) {
          selector = tag.toLowerCase();
        } else {
          const index = Array.from(siblings).indexOf(el);
          selector = `${tag}:nth-child(${index+1})`;
        }
      }

      path.unshift(selector);
      el = parent;
    }

    return path.join('>');
  }

  function generateSelector(root, target) {
    const selectors = [];
  
    while (target !== root) {
      const nthChild = Array.from(target.parentNode.children).indexOf(target) + 1;
      const selector = `${target.tagName.toLowerCase()}:nth-child(${nthChild})`;
  
      selectors.unshift(selector);
      target = target.parentNode;
    }
  
    return selectors.join(' > ');
  }


  class LRUCache {
    constructor(capacity) {
      this.map = new Map();
      this.capacity = capacity;
    }

    get(key) {
      if (!this.map.has(key)) return undefined;
      let value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
    }

    put(key, value) {
      if (this.map.has(key)) this.map.delete(key);
      this.map.set(key, value);
      if (this.map.size > this.capacity) {
        const leastItem = this.map.keys().next().value;
        this.map.delete(leastItem);
      }
    }
  }

  function validateNumberString(str) {
    return !!str && Number(str) == str;
  }

  function validateNumberString(str) {
    return str !=="" && !isNaN(str)
  }

  function Immerproduce(base, recipe) {
    const copy = deepCopy(base);
    recipe(copy);
  
    if (compare(base, copy)) {
      return base;
    }
  
    return copy;
  }
  
  function myExpect (input) {

    var toBe = function(val, negate) {
      const result = Object.is(input, val);
      if (negate ? result : !result) {
        throw new Error('Test Case failed');
      }
      return true;
    };

    return {
      toBe: toBe,
      not: {
        toBe: function(val) {
          return toBe(val, true);
        }
      }
    }
  }

  console.log(myExpect(3).not.toBe(4))

  function previousLeftSibling (root, target) {

    const queue = [root];

    while (queue) {
      const ele = queue.shift();
      let prev = null;

      if (ele === target) return prev;
      queue.push(...ele.children);
      prev = ele;
    }

    return null;
  }

  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let id = 0;

function getUniqueClassName() {
  let className = '';
  let num = id++;

  while (num >= 0) {
    className = chars[num % chars.length] + className;
    num = Math.floor(num / chars.length) - 1;
  }

  return className;
}

getUniqueClassName.reset = function() {
  id = 0;
}


function t(translation, data) {
  let isPossiblePropertyName = false
  let propertyName = ''
  let result = ''

  for (let i = 0; i < translation.length; i++) {
    if (isPossiblePropertyName) {
      // if }} is found, end it
      if (translation[i] === '}' && translation[i + 1] === '}') {
        if (data && propertyName in data) {
          result += data[propertyName]
        }

        isPossiblePropertyName = false
        i += 1
      } else {
        propertyName += translation[i]
      }
    } else {
      // if {{ are met
      if (translation[i] === '{' && translation[i + 1] === '{') {
        isPossiblePropertyName = true
        propertyName = ''
        i += 1
      } else {
        result += translation[i]
      }
    }
  }

  // // for propertyName left
  // if (isPossiblePropertyName) {
  //   result += '{{' + propertyName
  // }

  return result
}

console.log(t("my name is {{nme}}, age is {{ag}}", { nme: 'anudeep', ag: 32}));

const stringify = (data) => {
  return JSON.stringify(data, (_, value) => {

    if (Number.isNaN(value)) { // NaN === NaN always false
      return 'NaN'
    }

    if (value === Infinity) {
      return 'Infinity'
    }

    if (value === -Infinity) {
      return '-Infinity'
    }
    if (value === undefined) { // we need to differentiated string 'undefined' and serialized undefined
      return '__undefined__'
    }

    if (typeof value === 'bigint') {
      return Number(value).toString() + 'n'
    }
    return value
  })
}

window.myLocalStorage = {
  getItem(key){
        return localStorage.getItem(key);
  },  
  setItem(key, value, maxAge){
    if(maxAge===0) return;
    localStorage.setItem(key, value);
    if(maxAge!==undefined) {
    setTimeout(()=>{
    localStorage.removeItem(key);
    }, maxAge);
    }
  },  
  removeItem(key){
    localStorage.removeItem(key);
  },  
  clear(){
    localStorage.clear();
  }
}


async function myFinally (promise, onFinally) {
  try {
      const fulfilledValue = await promise;
      await onFinally();
      return fulfilledValue;
  } catch (rejectValue) {
      await onFinally();
      return rejectValue;
  }
}

function myFinally(promise, onFinally){
  return promise.then(value => {
      return Promise.resolve(onFinally()).then(() => value)
  }, (reason) => {
      return Promise.resolve(onFinally()).then(() => Promise.reject(reason))
  })
}

function memo(func) {
    let cache = new Map();
    return function (...args) {
      const key = args.join('_');

      const cachedResult = cache.get(key);

      if (cachedResult?.has) {
        return cachedResult.get(key);
      }

      const result = func.apply(this, args);
      if (!cachedResult) {
        cache.set(key, new Map([[this, result]]));
      } else {
        cachedResult.set(this, result);
      }

      return result;
    }
}
function memoizeOne(func) {

  function IsEqual(a, b) {
      if (a.length !== b.length) return false
      return a.every((item, i) => item === b[i])
    }

  let lastArgs = [], lastThis = null, lastResult = null, isCalled = false;

  return function (...args) {
      if (isCalled && (lastThis === this) && isEqual(lastArgs, args)) {
          return lastResult;
      }

      lastResult = func.apply(this, args);
      lastArgs = args;
      lastThis = this;
      isCalled = true;

      return lastResult;
  }
}


const composeAsync = funcs => x => funcs.reduce((acc, val) => acc.then(val), Promise.resolve(x));

class MyPromise {
  #state;
  #result;
  #onFulfilled;
  #onRejected;
  #thenPromiseResolve;
  #thenPromiseReject;

  constructor(executor) {
    this.#state = 'pending';
    this.#result = undefined;
    this.#onFulfilled = undefined;
    this.#onRejected = undefined;
    this.#thenPromiseResolve = undefined;
    this.#thenPromiseReject = undefined;

    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    if (this.#state !== 'pending') return;

    this.#state = 'fulfilled';
    this.#result = value;

    queueMicrotask(() => {
      if (
        !this.#onFulfilled ||
        !this.#thenPromiseResolve ||
        !this.#thenPromiseReject
      ) {
        return;
      }

      try {
        const returnValue = this.#onFulfilled(this.#result);

        if (!(returnValue instanceof MyPromise)) {
          this.#thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.#thenPromiseResolve, this.#thenPromiseReject);
        }
      } catch (error) {
        this.#thenPromiseReject(error);
      }
    });
  }

  #reject(reason) {
    if (this.#state !== 'pending') return;

    this.#state = 'rejected';
    this.#result = reason;

    queueMicrotask(() => {
      if (
        !this.#onRejected ||
        !this.#thenPromiseResolve ||
        !this.#thenPromiseReject
      ) {
        return;
      }

      try {
        const returnValue = this.#onRejected(this.#result);

        if (!(returnValue instanceof MyPromise)) {
          this.#thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.#thenPromiseResolve, this.#thenPromiseReject);
        }
      } catch (error) {
        this.#thenPromiseReject(error);
      }
    });
  }

  then(onFulfilled, onRejected) {
    // Register consuming functions.
    this.#onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    this.#onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      // Register `resolve` and `reject`, so that we can
      // resolve or reject this promise in `#resolve`
      // or `#reject`.
      this.#thenPromiseResolve = resolve;
      this.#thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}

function getHeight(tree) {
  let maxHeight = 0;
  
  if (!tree) {
    return maxHeight;
  }
    
  for (let chid of tree.children) {
    maxHeight = Math.max(maxHeight, getHeight(chid)); 
  }

  return maxHeight + 1;
}

function myNew (constructor, ...args) {

  let that = Object.create(constructor.prototype);

  let obj = constructor.apply(that, args);

  if (obj && typeof obj === 'object') {
    return obj;
  }

  return that;
}

function MyInstanceOf (obj, target) {
  /**
   * The instanceof operator tests to see if the prototype property of a constructor appears 
   * anywhere in the prototype chain of an object.
   */
  if (obj === null || (typeof obj !== 'object')) return false;
  const proto = Object.getPrototypeOf(obj);

  return proto === target.prototype ? true : MyInstanceOf(proto, target);
}

class EventEmitter {
  store = new Map();

  subscribe(eventName, callback) {
    if (!this.store.has(eventName)) {
      this.store.set(eventName, new Set());
    }
    const cObj = { callback };
    this.store.get(eventName).add(cObj);
    return {
      release: () => {
        if(!this.store.has(eventName)) return;
        this.store.get(eventName).delete(cObj);
        if(this.store.get(eventName).size === 0) this.store.delete(eventName);
      }
    }
  }

  emit(eventName, ...args) {
    this.store.get(eventName)?.forEach((cbObj) => {
      cbObj.callback.apply(this, args);
    });
  }
}

class EventEmitterAdv {
  constructor(){
    this.mp = new Map()
  }
  subscribe(eventName, callback) { //when someone subscribes we just need to store a mapping of the type of event to the callback & the no. of times the event has been subscribed to   
    if(!this.mp.has(eventName))
        this.mp.set(eventName, {cb : callback, count : 1})//storing the first subscription
    else{
      let curCount = this.mp.get(eventName).count
      this.mp.set(eventName, {cb : callback, count : ++curCount }) //storing the subsequent subscriptions after the first one
    }
    return {
      release: ()=>{  // a release function is returned to the subscriber
        if(this.mp.has(eventName)){  // if we have the subscription we just need to reduce the subscription by 1 
          let {cb, count} = this.mp.get(eventName)
          this.mp.set(eventName, {cb : cb, count : --count })
          if(count == 0) // if all subscription are released then we just delete the subscription
            this.mp.delete(eventName)
        }
      }
    }
  }

  emit(eventName, ...args) {//when an event is emitter we need to just run the callback as much times as the event has been subscribed to
    if(this.mp.has(eventName)){
      let {cb, count} = this.mp.get(eventName)
      while(count-->0)
        cb(...args)
    }
  }
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
class EventEmitterNoDups {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(listener);
    return this;
  }

  off(eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      return this;
    }

    const listeners = this.events[eventName];
    
    if (this.events[eventName].has(listener)) {
    	this.events[eventName].delete(listener);
    }
    return this;
  }

  emit (eventName, ...args) {
    if (!this.events.hasOwnProperty(eventName) || this.events[eventName].length === 0)
      return false;

    this.events[eventName].forEach(l => l.apply(null, args));

    return true;
  }

  once(eventName, listener) {
    this.on(eventName, function f() {
      this.off(eventName, f);
      listener.apply(null, arguments);
    })
  }
}

const sum = (a,b) => console.log(a+b);

const e = new EventEmitter();

e.on('add', sum);
e.on('add', sum);
e.on('add', sum);

e.emit('add', 2, 3)
e.off('add', sum);
e.off('add', sum);

e.emit('add', 2, 3)

function removeDuplicateObjFromArray() {
              
  // Create an array of objects
  books = [
      { title: "C++", author: "Bjarne" },
      { title: "Java", author: "James" },
      { title: "Python", author: "Guido" },
      { title: "Java", author: "James" },
  ];
    
  jsonObject = books.map(JSON.stringify);
    
  console.log(jsonObject);
    
  uniqueSet = new Set(jsonObject);
  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    
  console.log(uniqueArray);
}

const uniqueAuthors = data.reduce((accumulator, current) => {
  if (!accumulator.find((item) => item.tweet.author.id === current.tweet.author.id)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);

const uniqueAuthorsII = data.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.tweet.author.id === value.tweet.author.id
  ))
)

const groupBy = (arr, key) => {
  return arr.reduce((acc, curr) => {
    if (!acc[curr[key]]) {
      acc[curr[key]] = [];
    } 
    acc[curr[key]].push(curr);
    return acc;
  }, {});
}

function stringify(data) {
  if(typeof data === 'bigint') {
    throw new Error('Do not know how to serialize a BigInt at JSON.stringify');
  } 
  if(typeof data === 'string') {
    return `"${data}"`;
  } 
  if(typeof data === 'function') {
    return undefined;
  }
  if(data !== data) {
    return 'null';
  }
  if(data === Infinity) {
    return 'null';
  }
  if(data === -Infinity) {
    return 'null';
  }
  if(typeof data === 'number') {
   return `${data}`;
  }
  if(typeof data === 'boolean') {
    return `${data}`;
  }
  if(data === null) {
    return 'null';
  }
  if(data === undefined) {
    return 'null';
  }
  if(typeof data === 'symbol') {
    return 'null';
  }
  if(data instanceof Date) {
    return `"${data.toISOString()}"`;
  }
  if(Array.isArray(data)) {
    const arr = data.map((el) => stringify(el));
    return `[${arr.join(',')}]`;
  }
  if(typeof data === 'object') {
    const arr = Object.entries(data).reduce((acc, [key, value]) => {
      if(value === undefined) {
        return acc;
      }
      acc.push(`"${key}":${stringify(value)}`);
      return acc;
    }, [])
    return `{${arr.join(',')}}`;
  }
}
