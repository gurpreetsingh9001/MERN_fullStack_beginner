//async and await is built upon promises and is like a syntactical sugar
//function we are calling will stay the same #they will return promises
//the way of calling is different #syntax looks like synchronous calling in async await but doing same like promise based work


async function displayCommits() {
    //      getUser.then(user => getRepo(user.name))
    //     .then(repos => getCommits(repos[0]))
    //     .then(commits => console.log(commits))
    //     .catch()

    //above code turns into below code and async added to function containing await functions and await is added to functions cthat are returning promise
    try {
        const user = await getUser('john');
        const repos = await getRepo(user.name);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error - ' + err);
    }
}

//upper code turns into 
const


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
