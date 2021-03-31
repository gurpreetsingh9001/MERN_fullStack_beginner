// we have used post api services in app.js but to do it correctly we need to add it in routers folder
//replace app to router  because for app we use express.()  for router we use express.Router()
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "math" },
    { id: 2, name: "science" },
    { id: 3, name: "history" },
]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/api/courses/:id', (req, res) => {
    const course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("the course dont exist")
    res.send(course);
});


router.course('/', (req, res) => {
    const { error } = validatecourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {

    const course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");


    const { error } = validatecourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);


    course.name = req.body.name;
    res.send(course);
});

router.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


function validatecourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;