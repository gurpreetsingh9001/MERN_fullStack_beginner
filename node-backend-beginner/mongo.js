const mongoose = require(mongoose);      //mongoose is developed over mongoDB driver

//1.connect to mongoDB
//make schema
//make model of it to get a class
//call function to do work that will have object of above class

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to mongoDB..."))
    .catch(err => console.log(err));

//schema is specific to mongoose package but not to mongoDB, it is just way to represent data using mongoose which will handle it afterwards
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
    //other possible data types are -- Buffer,ObjectId,number
});

const Course = mongoose.model('Course', courseSchema); // this will return a class, thats why the name of variable starts with capital letter


async function createCourse() {
    const course = new Course({
        name: 'node.js course',
        author: 'mosh',
        tags: ['node', 'backend'],       // noSQL databases can contain complex data as there values unlike in SQL database we had to use three tables to store course,tags and courseTag 
        isPublished: true
    })

    const result = await course.save();  // return the new document created as a promise
    console.log(result);
}

async function getCourses() {
    const courses0 = await Course
        .find()        // no filter
        .find({ author: 'John', isPublished: true })
        .count()

    const courses1 = await Course
        .find({ author: 'John', isPublished: true })  // filter for selected documents
        .skip((pageNo - 1) * pageSize)                             // generally used during pagination  
        .limit(pageSize)                                    // pagination or speed and short retrieval
        .sort({ name: -1 })                           // 1 for asc, -1 for desc
        .select({ name: 1, tags: 1 })                      // only contain name and tags in returned documents

    //complex queries like WHERE clause in SQL
    const courses2 = await Course
        //comparison operators
        .find({ price: { $gt: 10, $lte: 100 } })    //courses price greater than 10 and less than equal to 100
        .find({ price: { $in: [10, 20, 25] } })            //courses with price of 10,20,25
        //logical operators
        .find().or([{ author: 'john', isPublished: true }])
        .find().and([{ author: 'john', isPublished: true }])
        .find({
            $and: [
                {
                    $or: [
                        { "first_name": "john" },
                        { "last_name": "john" }
                    ]
                },
                {
                    "Phone": "12345678"
                }
            ]
        })
        //regex
        .find({ author: /^John/ })    //author start with john // case insensitive
        .find({ author: /mill$/i })    // author name end with mill //case sensitive
        .find({ author: /.*mill.*/ })    // author name containing john //learn more at javascript regular expressions
}

async function updateCourses(id, parameter) {
    // query first then update approach    // generally used if we need to validate paramaters first before update like we dont want price to be higher than 50
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = parameter.isPublished;
    course.price = parameter.price;
    const result = await course.save();

    //update first without retrieving
    const result0 = await Course.update({ _id: id }, { $set: { author: 'fin', price: 50 } });  // we also have other $inc,$min etc // find them at mongo documentation

    //other methods are like
    const result0 = await Course.findByIdAndUpdate({ _id: id }, { $set: { author: 'fin', price: 50 } });  //return document before update #trigger.old
    const result0 = await Course.findByIdAndUpdate({ _id: id }, { $set: { author: 'fin', price: 50 } }, { new: true });  //return updated document  #trigger.new

}

async function updateCourses(id, parameter) {
    const result = await Course.deleteOne({ _id: id });
    const result0 = await Course.deleteMany({ price: 50 });  //return object with no of documents deleted
    const result0 = await Course.findByIdAndRemove({ _id: id });  //if id not present or already deleted than it will return null

}


createCourse();
getCourses();
updateCourses(id, params);
deleteCourse(id);