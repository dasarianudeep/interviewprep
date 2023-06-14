


/*
    Currying is transforming a function with multiple arguments into a sequence of 
    functions with any number of arguments
curry() should return a function
The returned function should
if number of arguments matches original function, return the final result
otherwise return a function which expects the missing arguments, also this function needs to be curried as well.
*/
function curry(func) {
  // here ...args collects arguments as array (rest)
  return function curriedFunc(...args) {
    // Here we check if current args passed equals the number of args func expects
    if(args.length >= func.length) {
      // if yes, we spread args elements to pass into func (spread). This is our base case.
      return func(...args)
    } else {
      /* if not, we return a function that collects the next arguments passed in next and 
      we recursively call curriedFunc, accumalating and spreading the values of args first and then
      the values of next. next will take into consideration a variable amount of next arguments
      e.g (1, 2) (1) (1,2,3) */
      return function(...next) {
        return curriedFunc(...args,...next);
      }
    }
  }
}

 function once(func) {
  let ran = true;
  let value;

  return function (...args) {
    if (ran) {
      value = func.apply(this, args);
      ran = false;
    }
    return value;
  }
}

function onceUndefined(func) {
  let ran = true;
  let value;

  return function (...args) {
    if (ran) {
      value = func.apply(this, args);
      ran = false;
    } else {
      value = undefined;
    }
    return value;
  }
}


function limit(func, n) {
  let count = 0, value;

  return function(...args) {
    if (count < n) {
        value = func.apply(this, args);
        count++;
    }
    return value;
  }
}

// https://skilled.dev/course/throttle
// https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/


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

// function throttleLeading(fn, delay) {
//   let timeout;

//   return function(...args) {
//     if (!timeout) {
//       fn.apply(this, args);
//       timeout = true;
//       setTimeout(() => {
//         timeout =  false;
//       }, delay);
//     }
//   }
// }
// function throttleTrailing(fn, delay) {
//   let timerId;

//   return function(...args) {
//     if (timerId) return;

//     timerId = setTimeout(() => {
//       fn.apply(this, args);
//       timerId = null;
//     }, delay);
//   }
// }

// function throttle(func, timeFrame) {
//   var lastTime = 0;
//   return function (...args) {
//       var now = new Date();
//       if (now - lastTime >= timeFrame) {
//           func(...args);
//           lastTime = now;
//       }
//   };
// }
function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

function createCounter() {
 
  let count = 0

  const obj = {
    count: 0
  }

  Object.defineProperty(obj, 'count', {
    get: function() {
      return count++
    }
  })

  return obj
}

function createCounter() {
  let currentCount = 0
  return {
    get count() {
      return currentCount++
    }
  }
}

  const count = (function(){
    let num = 0;
    const val = () => ++num;
    val.reset = () => num = 0;
    return val;
  })()

  console.log(count());
  console.log(count());
  console.log(count());
  console.log(count());

  count.reset();

  console.log(count());
  console.log(count());
  console.log(count());
  console.log(count());


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIdx = Math.floor(Math.random() * (i+1));
    const storedItem = arr[i];
    arr[i] = arr[randIdx];
    arr[randIdx] = storedItem;
  }

  return arr;
}

Array.prototype.myFlat = (depth = 1) => {
  let arr = this;
  while (depth > 0 && this.some(Array.isArray)) {
    arr = [].concat(this);
    depth--;
  }
  return arr;
}

const flattenDeep = (arr) => Array.isArray(arr)
  ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , [])
  : [arr]

function flat (arr, depth = 1) {
    const result = []

    for (const item of arr) {
        if (Array.isArray(item) && depth>0) {
            const flattened = flat(item, depth - 1);
            result.push(...flattened);
        } else {
            result.push(item);
        }
    }
    return result;
}

// console.log(flat([1,2,[3,4,[5]]], 2));

function debounce(func, wait) {
    let timerId = null;

    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, args);
        })
    }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
  	var context = this, args = arguments;
  	clearTimeout(timeout);
  	timeout = setTimeout(function() {
  		timeout = null;
  		if (!immediate) func.apply(context, args);
  	}, wait);
  	if (immediate && !timeout) func.apply(context, args);
  };
}

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

function throttle(func, wait, option = {leading: true, trailing: true}) {
  let lastArgs = null;
  let waiting = null;

  function setTimer() {
    waiting = null;
    if (lastArgs && option.trailing) {
      func.apply(this, lastArgs);
      lastArgs = null;
      waiting = setTimeout(setTimer, wait);
    }
  }

  return (...args) => {
    if (waiting) {
      lastArgs = args;
      return;
    }

    if (option.leading) {
      func.apply(this, args);
    }
    waiting = setTimeout(setTimer, wait);
  }
}

function throttleII(func, wait, option = {leading: true, trailing: true}) {
  const { leading, trailing} = option
  let shouldWait = false
  let prevArgs = null
  let timer = () => setTimeout(()=>{
        shouldWait = false
        if (prevArgs && trailing){
          func(...prevArgs)
          shouldWait = true
          prevArgs = null;
          timer();
        }
  },wait);

  return function(args){
    if(!shouldWait){
      if(leading){
        func(...args);
      }
      shouldWait = true;
      timer();
    }else{
      prevArgs = args
    }
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

function pipe(fns) {
    return val => {
        return funcs.reduce((val, func) => func(val), val);
    }
}

function compose(fns) {
    return val => {
        return fns.reduceRight((val, fn) => fn(val), val);
    }
}

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

class jQuery {
    constructor(selector) {
      this.element = document.querySelector(selector);
    }
  
    css(prop, value) {
      // Getter case.
      if (value === undefined) {
        // No matching elements.
        if (this.element == null) {
          return undefined;
        }
  
        const value = this.element.style[prop];
        return value === '' ? undefined : value;
      }
  
      // Setter case.
      if (this.element != null) {
        this.element.style[prop] = value;
      }
  
      return this;
    }
  }
  
  export default function $(element) {
    return new jQuery(element);
  }

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

class NodeStore {
  /**
  * @param {Node} node
  * @param {any} value
  */
 cache = {}
 set(node, value) {
   node.__ACCESS_KEY__ = Symbol();
   this.cache[node.__ACCESS_KEY__] = value;
 }
 /**
  * @param {Node} node
  * @return {any}
  */
 get(node) {
   return this.cache[node.__ACCESS_KEY__];
 }
 
 /**
  * @param {Node} node
  * @return {Boolean}
  */
 has(node) {
   return !!this.cache[node.__ACCESS_KEY__]
 }
}

function findCorrespondingNodeDFS (rootA, rootB, target) {
    if (rootA === target) {
        return rootB;
    }

    for (let i=0; i<rootA.children.length; i++) {
        const found = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
        if (found) return found;
    }
}

function findCorrespondingNodeBFS (rootA, rootB, target) {
    if (rootA === target) return rootB;

    const queueA = [rootA];
    const queueB = [rootB];

    while (queueA.length) {
        const currA = queueA.shift();
        const currB = queueB.shift();

        if (currA === target) {
            return currB;
        }

        queueA.push(...currA.children);
        queueB.push(...currB.children);
    }
    return null;
}

// function sum(num) {
//     function func(n) {
//         return sum(num + n);
//     }

//     sum.valueOf = () => num;
//     return func;
// }

function mergeList (arr1, arr2) {
    let i=0, j=0;
    let result = [];

    while (i<arr1.length && j<arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i++])
        } else if (arr1[i] > arr2[j]) {
            result.push(arr2[j++])
        } else {
            result.push(arr1[i++]);
            result.push(arr2[j++]);
        }

        while (i < arr1.length) {
            result.push(arr1[i++]);
        }

        while (j < arr2.length) {
            result.push(arr2[j++]);
        }

        return result;
    }
}

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

function invertBinaryTree (node) {
    if(!node) return null;
    if (node.left) return invertBinaryTree(node.left);
    if (node.right) return invertBinaryTree(node.right);

    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    return node;
}

function spyOn(obj, methodName) {
  const calls = []

  const originMethod = obj[methodName]
  
  if (typeof originMethod !== 'function') {
    throw new Error('not function')
  }
  
  obj[methodName] = function(...args) {
    calls.push(args)
    return originMethod.apply(this, args)
  }
  
  return {
    calls
  }
}

class Middleware {
  constructor() {
    this.middlewarsOk = [];
    this.middlewarsErrors = [];
  }
  /**
   * @param {MiddlewareFunc} func
   */
  use(func) {
    if (func.length === 3) {
      this.middlewarsErrors.push(func);
    }
    if (func.length === 2) {
      this.middlewarsOk.push(func);
    }
  }

  /**
   * @param {Request} req
   */
  start(req) {
    const next = (error) => {
      let args = error ? [error, req, next] : [req, next];
      const func = error ? this.middlewarsErrors.shift() : this.middlewarsOk.shift();

      try {
        if (func) {
          func(...args)
        }
      } catch (err) {
        next(err);
      }
    }

    next();
  }
}

const middleware = new Middleware()

// throw an error at first function
middleware.use((req, next) => {
  req.a = 1
  throw new Error('sth wrong')
  // or `next(new Error('sth wrong'))`
})

// since error occurs, this is skipped
middleware.use((req, next) => {
  req.b = 2
})

// since error occurs, this is skipped
middleware.use((req, next) => {
  console.log(req)
})

// since error occurs, this is called
middleware.use((error, req, next) => {
  console.log(error)
  console.log(req)
})

middleware.start({})

class MiddlewareII {
  /**
   * @param {MiddlewareFunc} func
   */
  constructor() {
    // Create a function queue to help with execution
    this.funcs = [];
    this.req = null;
  }
  use(func) {
    // Push the function into Queue
    this.funcs.push(func);
  }

  /**
   * @param {Request} req
   */
  start(req) {
    this.req = req;
    // Start the chain
    this.next();
  }

  next = (err) => {
    // take out the function to execute from the queue
    const toExecute = this.funcs.shift();
    // Catch execution error when a function throw an error
    try {
      // args length tells us if its a normal call or an error call
      if (toExecute.length === 2) {
        // there is no error, execute the function with current request and next()
        if (!err) {
          toExecute(this.req, this.next);
        }
        // There is an error, call next() immediately for error handling. This will now keep on dequeuing funs queue 
        // till we get an error handler function with 3 args 
        else{
          this.next(err);
        }
      }
      // There's an error and now we got a func with more than 2 args, i.e. an error handler
      else {
        toExecute(err, this.req, this.next);
      }
    }
    catch (e) {
      this.next(e);
    }

  }
}


function spyOn(obj, methodName) {
  let calls = [];
  obj[methodName] = new Proxy(obj[methodName], {
    apply: (targetFn, context, args) => {
      calls.push(args);
      return targetFn.apply(context, args);
    }
  });
  return {
    calls
  }
}

function clearAllTimeout() {
  // your code here
  let id = setTimeout(null, 0);
  while(id>=0){
    window.clearTimeout(id);
    id--;
  }
}

var timers = [];
var originClearTimeOut = window.setTimeout;
window.setTimeout = (...args)=>{
  var timerId = originClearTimeOut(...args);
  timers.push(timerId);
  return timerId;
}
function clearAllTimeout() {
  // your code here
  timers.forEach(t=>window.clearTimeout(t));
}

function completeAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error('target is Not an object!')  
  }
  target = new Object(target);
  for (const source of sources) {
    if (!source) {
      continue;
    }
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
  }
  return target
}

function objectAssign(target, ...sources) {
  
  // Make sure target is not null or undefined
  if (target == null)  throw new Error('Target is null or undefined'); 

  // Turn primitives like boolean, number, string into an object
  target = Object(target);

  for (let source of sources) {
    // Skips the source if it is null or undefined
    if (source == null) continue;

      // Get all properties + their descriptors or the source (to check later if they are enumerable)
      const descriptors = Object.getOwnPropertyDescriptors(source)
      
      // Create an array of all keys from the descriptors
      const keys = Object.keys(descriptors).concat(Object.getOwnPropertySymbols(descriptors))
      
        keys.forEach(k => {
        // Check if the target has the same property as the source. If it has, and the property is not writable, throw an Exception.
        const targetProp = Object.getOwnPropertyDescriptor(target, k) 
        if (targetProp && !targetProp.writable) throw new Error(`Property ${k} is not writable`)

        // If the property on the source is enumerable, asign it to the target
        if (descriptors[k].enumerable) target[k] = source[k]; 
    })
  }
  return target;
}

(function() {
  if (typeof Object.assign != 'function') {
      (function () {
          Object.assign = function (target) {
              'use strict';
              if (target === undefined || target === null) {
                  throw new TypeError('Cannot convert undefined or null to object');
              }

              var output = Object(target);
              for (var index = 1; index < arguments.length; index++) {
                  var source = arguments[index];
                  if (source !== undefined && source !== null) {
                      for (var nextKey in source) {
                          if (source.hasOwnProperty(nextKey)) {
                              output[nextKey] = source[nextKey];
                          }
                      }
                  }
              }
              return output;
          };
      })();
  }
})();


function MyObjectCreate(proto) {
    if (proto === null || typeof proto !== object) throw Error();

    function f() {

    }
    f.prototype = proto;
    return new f();
}

function BFSDOMTraversal(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];

    while (queue.length !== 0) {
        const current = queue.shift();
        result.push(current);
        if (current.hasChildNodes()) {
            result.push(...current.children);
        }
    }

    return result;
}

  const levelOrder = (root)=> {
    if(!root) return []
    let res=[]
    let q=[root]

    while(q.length){
        let temp=[]
        let currLength = q.length
        for (let i = 0; i < currLength; i++) {
            const node = q.shift()
            temp.push(node.val)
            q.push(...node.children)
        }
        res.push(temp);
    }
    return res;
    
  };
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

const array = [0, 1, 2, 3, 4]
const random = arr => {
  const len = arr == null ? 0 : arr.length
  return len ? arr[Math.floor(Math.random() * len)] : undefined
}

const partial = (func, ...boundArgs) => (...remainingArgs) => func(...boundArgs, ...remainingArgs)

// Native
const has = function (obj, key) {
  var keyParts = key.split('.');

  return !!obj && (
    keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : hasOwnProperty.call(obj, key)
  );
};

var object = { a: 1, b: 'settings' };
var result = has(object, 'a');

//lodash omit -

// Underscore/Lodash
var result = _.omit(object, ['a', 'c']);
console.log(result)
// output: { 'b': '2' }

// Native
var { a, c, ...result2 } = object;
console.log(result2)
// output: { 'b': '2' }

// Native
function pick(object, keys) {
  return keys.reduce((obj, key) => {
     if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
     }
     return obj;
   }, {});
}
var result = pick(object, ['a', 'c']);
console.log(result)
// output: {a: 1, c: 3}



// function intersectionTwoArraysII(nums1, nums2) {
//     // ORder and duplicates maintained
//     let result = [];

//     for (let i = 0; i<nums1.length; i++) {
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

//Returns an array that is the intersection of all the arrays. Each value in the result is present in each of the arrays.

var arrays = [[1, 2, 3], [101, 2, 1, 10], [2, 1]];
console.log(arrays.reduce(function(a, b) {
  return a.filter(function(value) {
    return b.includes(value);
  });
}));

// Native JS
const array = [1, 2, 3, 1, 2, 3];
function pull(arr, ...removeList){
    var removeSet = new Set(removeList)
    return arr.filter(function(el){
        return !removeSet.has(el)
  

Array.prototype.myReduce = function (callbackFn, initialValue) {
    const noInitialValue = initialValue === undefined;
    const len = this.length;
  
    if (noInitialValue && len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  
    let acc = noInitialValue ? this[0] : initialValue;
    let startIndex = noInitialValue ? 1 : 0;
  
    for (let i = startIndex; i < len; i++) {
      if (Object.hasOwn(this, i)) {
        acc = callbackFn(acc, this[i], i, this);
      }
    }
  
    return acc;
  };

  export default function get(object, path, defaultValue) {
    const pathParams = Array.isArray(path) ? path : path.split('.');
  
    // let index = 0;
    let current = object;
  
    for ( let i = 0; i < pathParams.length; i++) {
      if (current === null) return defaultValue
      if (current[pathParams[i]] === undefined) return defaultValue;
      current = current[pathParams[i]];
    }
    return current;
    
  }

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
function detectType(data) {
  // your code here
  if(data instanceof FileReader) return typeof data;
  return typeof data === 'object' ? (data === null ? 'null' : data.constructor.name.toLowerCase()) : typeof data;
}

  function isSameTree(nodeA, nodeB) {
    if (nodeA.nodeType !== nodeB.nodeType) {
      return false
    }
  
    if (nodeA.nodeType === Node.TEXT_NODE) {
      return nodeA.textContent === nodeB.textContent;
    }
  
    if (nodeA.tagName !== nodeB.tagName) {
      return false
    }
  
    if (nodeA.childNodes.length !== nodeB.childNodes.length) {
      return false
    }
  
    if (nodeA.attributes.length !== nodeB.attributes.length) {
      return false
    }
  
    const hasSameAttributes = nodeA.getAttributeNames.every(attrName => {
      return nodeA.getAttribute(attrName) === nodeB.getAttribute(attrName);
    });
  
    if (!hasSameAttributes) {
      return false
    }
  
    return Array.prototype.every.call(nodeA.childNodes, (childA, index) =>
      isSameTree(childA, nodeB.childNodes[index]),
    );
  }

  function deepClone (value) {
    if (typeof value !== object || value ===  null) return value;

    if (Array.isArray(value)) {
        return value.map(val => deepClone(val));
    }

    const cloned = Object.entries(value).map(([k,v]) => [k, deepClone(v)]);

    return Object.fromEntries(cloned);
  }


   function deepEqual(valueA, valueB) {
    function isDeepCompare(type) {
        return type === '[object Object]' || type === '[object Array]';
      }
      
    const type1 = Object.prototype.toString.call(valueA);
    const type2 = Object.prototype.toString.call(valueB);
  
  if (type1 === type2 && isDeepCompare(type1) && isDeepCompare(type2)) {
    const kvPairs1 = Object.entries(valueA);
    const kvPairs2 = Object.entries(valueB);
  
    if (kvPairs1.length !== kvPairs2.length) {
      return false;
    }
  
    return kvPairs1.every(
      ([k,v]) => Object.hasOwn(valueB, k) && deepEqual(v, valueB[k])
    )
  }
    return Object.is(valueA, valueB);
   }

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
  function addComma(num) {
    // your code here
    let [number, decimal] = num.toString().split('.');
    let str = '';
    let i = number.length-1;
    let count = 0;
    while( i >= 0){
    str = number[i]+ str;
    count++;
      if(i > 0 && count % 3 === 0){
      str = ',' + str;
    } 
    i--; 
    }
    return decimal ?  str + "." + decimal : str

  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    const  componentToHex = c => {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  let timer = null;
  function mySetInterval(func, delay, period) {
    // your code here
    let counter = 0;
      function helper() {
        timer = setTimeout(() => {
          func();
          counter++;
            helper(); 
        }, (delay+ (period*counter)));
      }
    helper();
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

  function compress (str) {
    let compressed='', currChar='', currCount='', maxCount=1;
    for (let i=0; i<str.length; i++) {
      if (currChar !== str[i]) {
        compressed = compressed+currChar+currCount;
        maxCount = Math.max(maxCount, currCount);
        currChar = str[i];
        currCount = 1
      } else {
        currCount++
      }
    }
    compressed = compressed+currChar+currCount;
    maxCount = Math.max(maxCount, currCount);

    return maxCount===1 ? str : compressed; 
  }
  

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

  class ListNode {
    constructor (key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DLL {
    constructor () {
        this.head = new ListNode();
        this.tail = new ListNode();
        this.connect(this.head, this.tail);
    }

    add (node) {
        this.connect(node, this.head.next);
        this.connect(this.head, node);
    }

    removeLast() {
        const lastNode = this.tail.prev;
        this.delete(lastNode);
        return lastNode;
    }
     moveToFront(node) {
         this.delete(node);
         this.add(node);
     }

    connect(node1, node2) {
        node1.next = node2;
        node2.prev = node1;
    }

    delete(node) {
        this.connect(node.prev, node.next);
    }
}

class LRUCacheDLL {
    constructor (capacity) {
        this.map = {};
        this.list = new DLL();
        this.capacity = capacity;
        this.size = 0;
    }

    get(key) {
        // if key does not exist, return -1
        if (!this.map[key]) return -1;

        // if key present, move to front of list, return value
        const node = this.map[key];
        this.list.moveToFront(node);
        return node.value;
    }

    put(key, value) {
        // If key exists, Update value and move to front of list
        if (this.map[key]) {
            const node = this.map[key];
            node.value = value;
            this.list.moveToFront(node);
            return;
        }

        // If no key exists,and at capacity: remove last node from list and from map
        if (this.size === this.capacity) {
            const lastNode = this.list.removeLast();
            delete this.map[lastNode.key];
            this.size-=1;
        }

        // Add to list, save to map
        const newNode = new ListNode(key, value);
        this.list.add(newNode);
        this.map[key] = newNode;
        this.size+=1

    }
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

  /**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling_i(root, target) {
  // your code here
  if(!root) return null;
  let queue = [root, null];
  while(queue.length){
    const current = queue.shift();
    if(current === target){
      return queue.shift();
    }
    if(current == null){
      queue.push(null);
    }else{
      queue.push(...current.children);
    }
  }
}

function nextRightSibling(root, target) {
  // If target is null, return null
  if(!target) return null;
  // If there is a right sibling return it
  if(target.nextElementSibling) return target.nextElementSibling;
  // There is no right sibling so we need to go to parent and look for another node
  let parent = target.parentElement;
  // Loop up towards root till we get a node with 
  while(parent){
    parent = nextRightSibling(root, parent);
    // because we're only 1 level above, if there's a first child, it is the right sibling.
    if(parent && parent.firstElementChild) return parent.firstElementChild;
  }
  // right sibling not found, return null
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

window.myLocalStorage = {
  getItem(key) {
    try {
      const {value, maxAge, createdAt} = JSON.parse(localStorage.getItem(key))
      
      if (maxAge !== undefined && Date.now() - createdAt >= maxAge) {
        this.removeItem(key)
        return null
      }
      
      return value
    } catch (e) {
      return null
    }    
  },
  
  setItem(key, value, maxAge) {
    const entry = {
      value,
      maxAge,
      createdAt: Date.now()
    }
    
    localStorage.setItem(key, JSON.stringify(entry))
  },
  
  removeItem(key) {
    return localStorage.removeItem(key)
  },
  
  clear() {
    localStorage.clear()
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
// https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720
// https://leetcode.com/discuss/interview-question/691075/Amazon-Frontend-SDE2
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

/*
Suppose we have an array of items - A, and another array of indexes in numbers - B

const A = ['A', 'B', 'C', 'D', 'E', 'F']
const B = [1,   5,   4,   3,   2,   0]
You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.

For above example A should be modified inline to following

['F', 'A', 'E', 'D', 'C', 'B']
**/
function sort(items, newOrder) {
  for(let i = 0; i < items.length; i++) {
    const j = newOrder[i];
    swap(items, i, j);
    swap(newOrder, i, j);
  }

  return items;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
function myNew (constructor, ...args) {

  let that = Object.create(constructor.prototype);

  let obj = constructor.apply(that, args);

  if (obj && typeof obj === 'object') {
    return obj;
  }

  return that;
}

function sum(a) {
  return function(b){
    if(b) return sum(a+b);
    return a;
  }
}

console.log(sum(10)(20)(90)())

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

const seen = new Set();
const uniqueAuthors = data.filter(item => {
  const duplicate = seen.has(item.tweet.author.id);
  seen.add(item.tweet.author.id);
  return !duplicate;
});

const uniqueAuthors = data.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.tweet.author.id === value.tweet.author.id
  ))
)

const unique = [];
for (const item of arr) {
  const isDuplicate = unique.find((obj) => obj.location === item.location);
  if (!isDuplicate) {
    unique.push(item);
  }

const inRange = (num, a, b=0) => (Math.min(a,b) <= num && num < Math.max(a,b));

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomNumberInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function groupByToMap(items, key) {
  // initialize our map
  const map = new Map();
  items.forEach((item) => {
    // get the value we're grouping by
    const keyValue = item[key];
    // get the array of items for this key value. default to an empty array
    const currArr = map.has(keyValue) ? map.get(keyValue) : [];
    // add the current item
    currArr.push(item);
    // update the array
    map.set(keyValue, currArr);
  });
  return map;
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

function getTags(node) {
  const tags = new Set();

  const stack = [node];

  while (stack.length) {
    const ele = stack.shift();
    tags.add(ele.tagName.toLowerCase());
    stack.push(...ele.children);
  }

  return [...tags];
}

function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, data) {
        if (err) reject(err);
        else resolve(data);
      };

      func.call(this, ...args, callback);
    })
  }
}

function hightlightText (s, query) {
  const idx = s.indexOf(query);

  if (idx > -1) {
    return s.substring(0, idx) + '<strong>' + s.substring(idx, idx+query.length) + '</strong>' + s.substring(idx+query.length);
  }

  return '';
}

const term = "visibility"
let results = `<h2>The VISibility property isn’t just about visibility<h2>`;

results = results.replace(new RegExp(term, "gi"), (match) => `<mark>${match}</mark>`);
console.log(results);

/**
    <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
            <li>item 5</li>
            <li>item 6</li>
            <li>item 7</li>
            <li>item 8</li>
            <li>item 9</li>
           <li>item 10</li>
        </ul>
      
     
        <input id="search" type="text">

        let searchBar = document.getElementById("search");

        const displayMatches = () => {
        let userInput = document.getElementById("search").value;
        let target = document.getElementsByTagName("li");
        let regex = new RegExp(`${userInput}`, 'g');
        for (i = 0; i < target.length; i++) {
            target[i].innerHTML = target[i].innerText.replace(regex, match => `<mark>${match}</mark>`);
        }
        }

        searchBar.addEventListener('keyup', displayMatches);
 */

function classNames(...args) {
  const classes = [];

  args.forEach((arg) => {
    // Ignore falsey values.
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    // Handle string and numbers.
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
      return;
    }

    // Handle arrays.
    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      return;
    }

    // Handle objects.
    if (argType === 'object') {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }

      return;
    }
  });

  return classes.join(' ');
}

function squashObject(object, path = [], output = {}) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value !== 'object' || value === null) {
      output[path.concat(key).filter(Boolean).join('.')] = value;
    } else {
      squashObject(value, path.concat(key), output);
    }
  }

  return output;
}

function chunk(array, size = 1) {
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }

  const result = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }

  return result;
}

function difference(array, values) {
  const result = [];

  // Create a set of all the values in the values arrays
  const valuesSet = new Set(values.flat());

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    // Check if the value is in the values set
    if (!valuesSet.has(value) && !(value === undefined && !(i in array))) {
      result.push(value);
    }
  }

  return result;
}

function model(state, element) {
  // your code here
  element.value = state.value;
  Object.defineProperty(state, 'value', {
    get() {
      return element.value;
    },
    set(new_value) {
      element.value = new_value;
      return;
    }
  });

  element.addEventListener('change', (event) => {
    state.value = event.target.value;
  })
}

/**
 * https://jsfiddle.net/htb2d51s/1/
 * const data = {
  value: ''
};

const el = document.getElementById('inputEl');

Object.defineProperty(data, 'prop', {
  get: function() {
    return this.value;
  },
  set: function(value) {
    this.value = value;
    el.value = value;
    printVal();
  }
});


// attaching the event listener on keyup events
el.addEventListener('keyup', (event) => {
  data.prop = event.target.value;
});

function printVal() {
  const el = document.getElementById('val');
  el.innerText = data.prop;
}

const btn = document.getElementById('incrementVal');
btn.addEventListener('click', () => {
	data.prop = Number(data.prop) + 1;
});
 */

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;

  return function(...args) {
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
  }
};


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue;
}


// Fixing Race Conditions - useEffect fetch
// https://sebastienlorber.com/handling-api-request-race-conditions-in-react
// https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect
useEffect(() => {
  let active = true;

  const fetchData = async () => {
    setTimeout(async () => {
      const response = await fetch(`https://swapi.dev/api/people/${props.id}/`);
      const newData = await response.json();
      if (active) {
        setFetchedId(props.id);
        setData(newData);
      }
    }, Math.round(Math.random() * 12000));
  };

  fetchData();
  return () => {
    active = false;
  };
}, [props.id]);


useEffect(() => {
  const abortController = new AbortController();

  const fetchData = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`, {
          signal: abortController.signal,
        });
        const newData = await response.json();

        setFetchedId(id);
        setData(newData);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Aborting a fetch throws an error
          // So we can't update state afterwards
        }
        // Handle other request errors here
      }
    }, Math.round(Math.random() * 12000));
  };

  fetchData();
  return () => {
    abortController.abort();
  };
}, [id]);

// Route level Code-Splitting
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

// Lazy load images
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
});

// Event Delegation

const on = (selector, eventType, childSelector, eventHandler) => {
  const elements = document.querySelectorAll(selector)
  for (element of elements) {
    element.addEventListener(eventType, eventOnElement => {
      if (eventOnElement.target.matches(childSelector)) {
        eventHandler(eventOnElement)
      }
    })
  }
}


const allHandlers = new Map()
function onClick(root, predicate, handler) {
  if (allHandlers.has(root)) {
    allHandlers.get(root).push([predicate, handler])
    return
  }

  allHandlers.set(root, [[predicate, handler]])

  // attach the real handler
  root.addEventListener('click', function(e) {

    // from e.target -> root
    // check if element shoulded applied witht handler

    let el = e.target
    const handlers = allHandlers.get(root)
    let isPropagationStopped = false

    e.stopPropagation = () => {
      isPropagationStopped = true
    }

    while (el) {
      
      let isImmediatePropagationStopped = false

      e.stopImmediatePropagation = () => {
        isImmediatePropagationStopped = true
        isPropagationStopped = true
      }

      for (const [predicate, handler] of handlers) {
        if (predicate(el)) {
          handler.call(el, e)

          // check immediatepropagtion
          if (isImmediatePropagationStopped) {
            break
          }
        }
      }

      // check propagation
      if (el === root || isPropagationStopped) break

      el = el.parentElement
    }

  }, false)
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}


public String miniParser(String s) {
  StringBuilder sb = new StringBuilder();
  String[] parts = s.split("\n\n");
  for (String p : parts) {
      sb.append("<p>");
      boolean inBlockQuoteMode = false;
      boolean inStrikeThroughRange = false;
      for (int i = 0; i < p.length(); i++) {
          char ch = p.charAt(i);
          if (ch == '\n') {
              sb.append("<br />");
          } else if (ch == '~') {
              if (inStrikeThroughRange) {
                  i++;
                  sb.append("</del>");
                  inStrikeThroughRange = false;
              } else {
                  i++;
                  sb.append("<del>");
                  inStrikeThroughRange = true;
              }
          } else if (ch == '>') {
              if (inBlockQuoteMode == false) {
                  inBlockQuoteMode = true;
                  sb.append("<blockquote>");
              }
          } else {
              sb.append(ch);
          }
      }
      if (inBlockQuoteMode) {
          sb.append("</blockquote>");
      }
      sb.append("</p>");
  }
  return sb.toString();
}

// Recursive React Rendering
const TocItem = ({ toc }) => {
  const subItem = (toc.items || []).map(item => (
    <ul key={item.url}>
      {/* ✅ Recursion ✅ */}
      <TocItem toc={item} type="child" />
    </ul>
  ))

  return (
    <li key={toc.title}>
      <a href={toc.url}>{toc.title}</a>
      {subItem}
    </li>
  )
}

const TableOfContents = ({ toc }) => (
  <ul>
    {(toc.items || []).map((item, index) => (
      <TocItem key={index} toc={item} />
    ))}
  </ul>
)

/*
-----------------------------------------------------------
**/

class TokenBucket {
  constructor(bucketSize = 5, refillInterval = 1000) {
    this.tokens = bucketSize;

    setInterval(() => {
      if (this.tokens < bucketSize) {
        this.tokens++;
      }
    }, refillInterval);
  }

  redeem() {
    if (this.tokens) {
      this.tokens--;
      return true;
    }
    return false;
  }
};

/*
-----------------------------------------------------------
Create React like VDOM from DOM tree
**/

function virtualize(root) {

  const result = {
    type: root.tagName.toLowerCase(),
    props: {}
  };

  for (let attr of root.attributes) {
    const name = attr.name === 'classname' ? 'className' : attr.name;
    result.props[name] = attr.value;
  }

  const children = [];
  for (let node of root.childNodes) {
    if (node.nodeType === 3 && !node.textContent.includes('\n')) {
      children.push(node.textContent);
    } else if (node.nodeType === 1) {
      children.push(virtualize(node));
    }
  }

  result.props.children = children.length === 1 ? children[0] : children;
  return result;
}

function render(jsxObj) {
  if (typeof jsxObj === 'string') {
    return document.createTextNode(jsxObj);
  }

  const {type, props: { children, ...attrs }} = jsxObj;
  const element = document.createElement(type);

  for (let [attr, value] of Object.entries(attrs)) {
    if (attr === 'className') {
      element.className = value;
    } else {
      element.setAttribute(attr, value);
    }
  }

  const childrenArr = Array.isArray(children) ? children : [children];

  for (const child of childrenArr) {
    element.append(render(child));
  }

  return element;
}
/*
  VDOM Rendering - Custom functional component
**/
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

function render(json) {
  // create the top level emlement
  // recursively append the children
  // textnode
  if (typeof json === 'string') {
    return document.createTextNode(json)
  }

  // element
  const {type, props} = json
  const {children, ...attrs} = props

  // if functional component
  if (typeof type === 'function') {
    return render(json.type(props))
  }
  
  // if intrinsic html tag
  const element = document.createElement(type)
  
  for (let [attr, value] of Object.entries(attrs)) {
    element[attr] = value
  }
  
  const childrenArr = Array.isArray(children) ? children : [children]
  
  for (let child of childrenArr) {
    element.append(render(child))
  }
  
  return element
}

