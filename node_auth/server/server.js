const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Working with BCRYPT
const bcrypt = require('bcrypt');
const SALT = 10;

/*User info*/

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

// Running something before making a request. Method Next() is called to make the app going to the next step as it is the Middleware
userSchema.pre('save', function(next){
    var user = this;

    // Checking if the password is modified

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }

    
})

const User = mongoose.model('User',userSchema)
/*END User info*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

app.use(bodyParser.json());

// Creating a route
app.post('/api/user',(req, res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save((err, doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(doc)
    })
});

app.listen(port, ()=>{
    console.log(`Started on port ${port}`)
})