const mongoose = require("mongoose");


//Connecting to the DataBase in MongoDB if not Present already then creating it here.
mongoose.connect("mongodb://localhost:27017/StudentsApi" ,{
    useNewUrlParser: true
}).then(() => {
    console.log("Connection is successfully established");
}).catch( (error) => {
    console.log("Connection is Failed!!");
})