const Joi = require('joi-browser');
const express = require('express');
const app = express();

app.use(express.json());  // adding a piece of middleware , then app.use for using it in request pipeline

const posts = [
    { id: 1, name: "jeff" },
    { id: 2, name: "joe" },
    { id: 3, name: "fin" },
]


app.get('/api/posts/:id/:name', (req, res) => {
    res.send(req.params.id);             // id and name are route paramenter and are generally used for required parameters
    res.send(req.query);            ///api/courses/:id?sortBy=name   query parameters are for optional values  // output ==> {sortBy:name}  ?? stored as key-value pairs 
});


app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.get('/api/post/:id', (req, res) => {              // this function is route handler function
    const post = posts.find(p => p.id === parseInt(req.params.id));   // in get method we are using params in post and put we use body of payload recieved
    if (!post) return res.status(404).send("the post dont exist") //we should return 404 status if id is not found
    res.send(post);
});

//environment variable PORT   // set PORT=5000 (in terminal) # assigning a port to node app
//global object process
const port = process.env.PORT || 9000;
app.listen(port, () => { console.log('listening on port ' + port) });



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

app.delete('/api/delete/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("post not found");

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(post);
});


function validatePost(post) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(post, schema);
}