console.log('before');
getUser(1, (user) => {  //second argument is callback function which will be called by callback at line 10
    console.log('user', user);
});
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('in setTimeout');
        callback({ id: id, gitUser: 'me' });
    }, 2000);
}
//-----------------------------------------------------

//callback hell / christmas tree problem  # lot of nesting
getUser(1, (user) => {
    getRepo(user.name, (repos) => {
        getCommits(repo, (displayCommits) => {
            show(commits);
        });
    });
});

//-----------------------------------------------------

//name funtions to get rid  of callback hell
getUser(1, getRepo);


function displayCommits() {
    console.log(commits);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function getRepo(user) {
    getRepo(user.name, getCommits);
}







