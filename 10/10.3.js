const promise = new Promise((resolve) => {
    setTimeout(() => {
       setTimeout(() => console.log(4), 0);
       resolve(1);
   }, 1000);
});

promise.then(res => {
    console.log(res, Date.now());
    return 2;
}).then(res => {
    console.log(res, Date.now());
    return 3;
}).then(res => {
    console.log(res, Date.now());
});
