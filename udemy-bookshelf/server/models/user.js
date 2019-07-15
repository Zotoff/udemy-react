const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password: {
        type:String,
        required:true,
        minlength: 6
    },
    name: {
        type:String,
        maxlength:100
    },
    lastname: {
        type:String,
        maxlength:100
    },
    role: {
        type:Number,
        default:0
    },
    token:{
        type:String
    }
})

// Adding the presave to work with passwords

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err,salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})

// Creating a function that compares the password

userSchema.methods.comparePassword = function(candidatePassword, callback){
    // Comparing the password
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
        if(err) return callback(err);
        // Returns isMatch (true,false) without error
        callback(null, isMatch);
    })
}

// Find the user by token
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token, config.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

// Deletes the token

userSchema.methods.deleteToken = function(token, cb){
    var user = this;
    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

// Generates the token
userSchema.methods.generateToken = function(callback){
    var user = this;

    // Generates a token
    var token = jwt.sign(user._id.toHexString(), config.SECRET);

    // Stores the token
    user.token = token;
    user.save(function(err,user){
        if(err) return callback(err);
        callback(null,user)
    })
}

// Creating a constant with mongo schema
const User = mongoose.model('User', userSchema);
module.exports = {User};