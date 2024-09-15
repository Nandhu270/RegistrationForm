
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model/Student');
const bodyParser = require('body-parser');
const app =express()
const PORT = 5000

mongoose.connect('mongodb://localhost:27017/StudentDB')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (req,res)=>{   //req = request , res = response
    // console.log("Hello");

    // res.end() To end the response
    
    const students = await Student.find()
    res.render('index',{students})

    // res.render('index')

    // console.log(students);


    
})

app.post('/save',async(req,res)=>{
    // console.log("Nandhu");

    // console.log(req.body);

    const {FirstName,LastName,Email,PhoneNumber,DateOfBirth,Gender,Address,Country,PostalCode} = req.body  //Destructing the Object
    // console.log(FirstName);
    // console.log(LastName);
    // console.log(Email);
    // console.log(PhoneNumber);
    // console.log(DOB);
    // console.log(Gender);
    // console.log(Address);
    // console.log(Country);
    // console.log(PostalCode);

    const students = new Student({FirstName,LastName,Email,PhoneNumber,DateOfBirth,Gender,Address,Country,PostalCode})

    await students.save()
    res.redirect('/')
})

app.post('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id); // Use the _id from the database
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Edit form route
app.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // Use the _id from the database
        res.render('edit', { student });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update operation
app.post('/edit/:id', async (req, res) => {
    try {
        const { FirstName, LastName, Email, PhoneNumber, DateOfBirth, Gender, Address,Country, PostalCode } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { // Use the _id from the database
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            DateOfBirth,
            Gender,
            Address,
            Country,
            PostalCode
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT,()=>{console.log(`Server is running on Port No: ${PORT}`);})// Delete operation