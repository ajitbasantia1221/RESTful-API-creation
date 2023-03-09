const mongoose = require("mongoose");
const validator = require("validator");


//Schema Creation 
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This Email already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone :{
        type :Number,
        min: 10,
        unique : true,
        required: true
    },
    address: {
        type: String,
        required : true
    }

}
)

//Collection Creation
const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;