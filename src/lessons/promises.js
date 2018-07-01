const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Task ended with success'); // only one argument to resolve (but we can pass object)
        resolve({ // only ONE RESOLVE is possible
            value: 1,
            prop: 'name'
        });
        reject('Something went wrong!'); // it throw JS error by default (but we can .catch it)
    }, 1500); //1,5s delay before running resolve()
});

console.log('before'); // print immediately

// register a callback on a promise:
promise.then((data) => {
    console.log(data); // after 1,5s will show in console a result of Promise ('task ended with success')
}); // This is asynchronous, so it will proceed with a code after it, don't wait 1,5s

promise.then((data) => {
    console.log(data); // after 1,5s will show in console a result of Promise ('task ended with success')
}).catch((error) => {
    console.log('error:', error); // it catch error and print its value (won't throw JS Error)
});

// ALTERNATIVE SYNTAX:
// (catch as second argument of then( callback for success , callback witch catch for error))
promise.then((data) => {
    console.log(data);
}, (error) => {
    console.log('error:', error); // it catch error and print its value (won't throw JS Error)
});
// this is less readable, not so obvious.
// better to use normal promise.then().catch()

///////////////////////////
// Most of time we will work with promises created by somebody else (from libraries etc.).
// Rarely we will define own "new Promise"
// More often we will use somebody elses promise with: promiseName.then().catch()
///////////////////////////

console.log('after'); // print immediately (won't wait 1,5s)