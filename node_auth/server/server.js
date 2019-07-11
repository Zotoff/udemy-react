const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SALT = 10;


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cookieParser());

/*User info*/

/*Creating the Schema for Mongoose*/
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
    },
    token:{
        type: String
    }
})

// Running something before making a request. Method Next() is called to make the app going to the next step as it is the Middleware
userSchema.pre('save', function(next){

    // Declaring the user
    var user = this;

    // Checking if the password is modified

    if(user.isModified('password')) {

        // Generating the salt
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            // Hashing
            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

// Method for comparing the password
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) throw cb(err);
        cb(null,isMatch)
    })
}
// Method which generates the token
userSchema.methods.generateToken = function(cb){
    var user = this;
    // Generating the token with user id
    var token = jwt.sign(user._id.toHexString(), 'supersecret');

    user.token = token;
    user.save(function(err,user){
        // If error returns the callback function for error
        if(err) return cb(err)
        cb(null,user)
    })
}

// Grabbing the token and verifying the correctness
userSchema.statics.findByToken = function(token, cb){
    const user = this;
    
    // Verifies the token
    jwt.verify(token, 'supersecret', function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err)
            cb(null,user)
        })
    })

}

const User = mongoose.model('User',userSchema); // Specifies the collection

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')



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


/*User login*/
app.post('/api/user/login',(req, res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message: "Auth failed, user not found"})
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message: "Wrong password"
            });
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).send('ok')
            });
        })
    })
})

// Creates a route for profile
app.get('user/profile',(req,res)=>{
    let token = req.cookies.auth;

    User.findByTolen(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res/status(401).send('no access');
        res.status(200).send('you have access');
    })
})


app.listen(port, ()=>{
    console.log(`Started on port ${port}`)
})