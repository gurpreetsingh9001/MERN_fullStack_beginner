//explore documentations of packages used here
const startupDebugger = require('debug')('app:startup') //better than console.log  //second bracket is for namespace
const dbDebugger = require('debug')('app:startup')  //if DEBUG=app:startup is set as env variable than all debug statement in that namespace will be shown, if no env variable no debug will be shown
const config = require('config');    // for env configurations
const helmet = require('helmet');    // secure http headers
const Joi = require('joi-browser');   //validation
const logger = require('./middleware/logger');   // seperate file to handle logging
const courses = require('./route/courses');
const express = require('express');
const app = express();


const posts = [
    { id: 1, name: "jeff" },
    { id: 2, name: "joe" },
    { id: 3, name: "fin" },
]

// pug is a template engine for delivering dynamic html other than json // other than pug we have EJS,Mustache
//see it in action in get request
// view engines are not needed in restful services
app.set('view engine', 'pug');
app.set('views', './views');


// adding a piece of middleware , then app.use for using it in request pipeline
app.use(express.json());   //express.json() will unstringify to json  
//creating a middleware function
app.use((req, res, next) => {
    console.log("Authenticating...");
    next();   //pass control to next middleware function in pipleline
});
//another middleware function in other file
app.use(logger);
app.use(express.urlencoded({ extended: true }));  // convert url encoded payload key=value&key=value to json in the header of request
app.use(express.static('public'));  //static files like css or images in public folder // here like localhost:3000/readme.txt
//explore third party middlewares documentation at expressjs website like 'helmet','morgan'
app.use(helmet);
app.use('/api/courses', courses); //we are telling express that for any route that start with '/api/courses' use 'courses' router and hence we can just reduce '/api/courses' in our courses file unlike posts

startupDebugger("startup");
dbDebugger("database");



if (app.get('env') === 'development')         //enable it during development refrain in production //set env variable to change environment to staging prod etc  
    app.use(morgan('tiny'));            //logs the requests to console or log file  

app.get('/api/posts/:id/:name', (req, res) => {
    res.send(req.params.id);             // id and name are route paramenter and are generally used for required parameters
    res.send(req.query);            ///api/courses/:id?sortBy=name   query parameters are for optional values  // output ==> {sortBy:name}  ?? stored as key-value pairs 
});

//here we will return html markup to client with get request
app.get('/', (req, res) => {
    res.render('index', { title: "my express app", message: "hello" }); //first argument is name of view #name of our pug file //second arg has all dynamic values in the index.pug file
});



app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.get('/api/posts/:id', (req, res) => {              // this function is route handler function
    const post = posts.find(p => p.id === parseInt(req.params.id));   // in get method we are using params in post and put we use body of payload recieved
    if (!post) return res.status(404).send("the post dont exist") //we should return 404 status if id is not found
    res.send(post);
});


app.post('/api/posts', (req, res) => {
    const { error } = validatePost(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const post = {
        id: posts.length + 1,   // will be assigned by database later
        name: req.body.name
    }
    posts.push(post);
    res.send(post); // sending back response so that called know the new id assigned or other new things he expect
});

app.put('/api/posts/:id', (req, res) => {
    //validate the id/parameter is correct
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("post not found");

    //validate the body
    const { error } = validatePost(req.body);   // joi returns error and value so we can use object destructuring rather than //const result = validatePost(post);
    if (error)
        return res.status(400).send(error.details[0].message);

    //if all good update the post
    post.name = req.body.name;
    res.send(post);
});

app.delete('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("post not found");

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(post);
});

//syntax changed in new version
function validatePost(post) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(post);
}

// set PORT=5000 (in terminal) # assigning a port to node app
// set NODE_ENV='staging' #assigning current environment -- development(default),production
//environment variable PORT   
//global object process
const port = process.env.PORT || 9000;
app.listen(port, () => { console.log('listening on port ' + port) });
