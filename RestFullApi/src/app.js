const express = require('express');
require("./DB/Connection");
const Student = require("./MODELS/Students");
const app = express();
const port = process.env.PORT || 3000;

//express.json() is an inbuilt method in express to recognise the incoming request object as Json object. This method
// is called Middleware in your application 
app.use(express.json());

//Create a New Student

// Using Promises

// app.post("/students" ,(req,res) => {
//     const user = new Student(req.body)
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch( (error) => {
//         res.status(400).send(error);
//     })
// });

// Using Async Await

app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) { res.status(400).send(error) }
})


//Reading all the Data from database

app.get("/students", async (req, res) => {
    try {
        const StudentData = await Student.find();
        res.send(StudentData);

    } catch (error) {
        res.status(400).send(error);
    }
})

//Reading an indiviual data from the database

app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const StudentData = await Student.findById(_id);
        if(!StudentData){
            return res.status(404).send()
        }else{
            res.send(StudentData);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


// Update the database

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
            new :true
        });
        res.send(updateStudents)
    } catch (error) {
        res.status(400).send(error);
    }
})


// Delete any collection
app.delete("/students/:id", async (req,res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            res.status(400).send()
        }
        res.send(deleteStudent);

    }catch(err){
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`The server is listening to the port ${port}`);
});