/**
 * A Promise is an object that representa eventual completion or failure of an asyn operation.
 * Promise is a returned object to which you attach callbacks instead of passing callbacks.
 * 
 * Callback pyramid of doom
 * 
 * catch(failureCallback) is a short form for then(null, failureCallback)
 * 
 * Always return value in cb if the following callbacks have to catch
 * 
 * const list = [];
 * 
 * doSomething().then(url => fetch(url)).then(res => res.json()).then(data => {
 *  list.push(data);
 * }).then(() => console.log(list));
 * 
 * Promise.all([func1(), func2(), fund3()]).then((r1, r2, r3) => {
 * 
 * });
 * 
 * [func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve()).then(res3 => console.log(res3))
 * 
 * const composeAsync = (...funcs) => x => funcs.reduce((acc, val) => acc.then(val), Promise.resolve(x));
 * 
 * let result;
 * for (const f of funcs) {
 *      result = await f(result);
 * }
 * 
 * const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
 *  
 * somePromise().then(function () {
  // I'm inside a then() function!
  return another promise, return synchronouse value, throw a Error
});
    return new Promise(resolve => resolve('hello'));

    Promise.resolve('hello');

    As it turns out, when you use the then(resolveHandler, rejectHandler) format, 
    the rejectHandler won't actually catch an error if it's thrown by the resolveHandler itself.


     The async and await keywords enable asynchronous, promise-based behavior to be written in a 
     cleaner style, avoiding the need to explicitly configure promise chains.

     An Async Function Always Returns a Promise
    Any value returned by an async function gets wrapped in a Promise.resolve(  

    
    async/await in forEach loop - nooo

    #1: for..of

 */

//  new Promise((resolve, reject) => {
//     console.log("Initial");
  
//     resolve();
//   })
//     .then(() => {
//       throw new Error("Something failed");
  
//       console.log("Do this");
//     })
//     .catch(() => {

//     })
//     .then(() => {
//       console.log("Do this, no matter what happened before");
//     }).catch(e => {
//        console.log(e.message)
//       })


//       console.log('-----------------')
//       const promise = new Promise((resolve, reject) => {
//         console.log("Promise callback");
//         resolve();
//       }).then((result) => {
//         console.log("Promise callback (.then)");
//       });
      
//       setTimeout(() => {
//         console.log("event-loop cycle: Promise (fulfilled)", promise);
//       }, 0);
      
//       console.log("Promise (pending)", promise);

//       console.log('-----------------')

//       function somePromiseAPI() {
//         return Promise.resolve().then(function () {
//           return Promise.reject('err')
//           return 'foo';
//         }).then(v => console.log(v)).catch(e => console.log(e));
//       }
//       somePromiseAPI();
      console.log('----------------------------------');


      const users = [1,2,3,4];

      const wait = user => {
        return new Promise(resolve => setTimeout(() => {
            console.log('user --'+user);
            resolve();
        }, 3000));
      };

      async function execute() {
        // Sequential
        // for (const user of users) {
        //     await wait(user);
        //   }
        
        // Sequential
        // await users.reduce(async (promise, user) => {
        //     await promise;

        //     await wait(user);
        // }, Promise.resolve());

        //Parallel
        await Promise.all(users.map(async user => await wait(user)))
      }
      execute();

      // Seq Promises 
      function asyncFunc(e) {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(e), e * 1000);
        });
      }
      
      const arr = [1, 2, 3];
      let final = [];
      
      function workMyCollection(arr) {
        return arr.reduce((promise, item) => {
          return promise
            .then((result) => {
              console.log(`item ${item}`);
              return asyncFunc(item).then(result => final.push(result));
            })
            .catch(console.error);
        }, Promise.resolve());
      }
      
      workMyCollection(arr)
        .then(() => console.log(`FINAL RESULT is ${final}`))