// Spotify
const print = () => {
    if (true) {
      var x = 10;
      let y = 20;
    } else {
      var z = 30;
  
    }
    console.log(x)
    setTimeout(() => console.log(y), 10);
    console.log(z)
  
  
    return () => console.log(x)
  }
  
  setTimeout(print(), 100)

////////////////////////////////////
  
  setTimeout(() => {
    console.log(0)
    }, 0)
    
    const arr = [1,2,3];
    arr.forEach(n => console.log(n));
    
    const promise = new Promise(resolve => {
        console.log(1);
      resolve(5);
    });
    
    console.log(4);
    promise.then(r => console.log(r));
    