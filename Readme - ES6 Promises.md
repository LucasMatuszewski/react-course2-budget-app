# ES6 Promises

Allowing to do something after a long running tasks (like setting data in DB) completes.
It's a way to sync up asynchronous operations.

We can do something if long running task succeed (resolve) and something else when failed (reject):
> const promiseName = new Promise((resolve, reject) => {
>   resolve({...});
>   rejest({...});
> });

To use promise we call:
> promiseName.then((data) => { ... }).catch((error) => { ... });