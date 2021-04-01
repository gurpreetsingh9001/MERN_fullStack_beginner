//Holds the eventual result of an asynchronous operation

getUser.then(user => getRepo(user.name))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch()

function getUser(id) {
    return new promise((resolve, reject) => {
        setTimeout(() => { console.log('getting your repos...') }, 2000);
        resolve({ name: 'john' });
    });
}

function getRepo(user) {
    return new promise((resolve, reject) => {
        setTimeout(() => { console.log('calling api for commits...') }, 2000);
        resolve([repo1, repo2, repo3]);
    });
}

function getCommits(repo) {
    return new promise((resolve, reject) => {
        setTimeout(() => { console.log('fetching commits...') }, 2000);
        resolve('commits brought to you by skillshare');
    });
}


//other promise api funtions are  // also they dont need object they directly called by class
promise.resolve('returned');
promise.reject('error by me');
promise.all([p1, p2]);  // execute all given promises in parallel without waiting for one promise to complete
promise.race([p1, p2]); //return the first promise completed