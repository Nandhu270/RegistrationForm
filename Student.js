
const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    FirstName : String,
    LastName : String,
    Email : String,
    PhoneNumber : String,
    DateOfBirth : String,
    Gender : String,
    Address : String,
    Country: String,
    PostalCode : String,
})

module.exports = mongoose.model('Student',StudentSchema)