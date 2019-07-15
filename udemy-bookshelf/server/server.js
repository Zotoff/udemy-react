const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Require the middleware auth
const {auth} = require('./middleware/auth');

// Creating the config which returns the production params or default params depending, where we are. Imports the get() from config.js
const config = require('./config/config').get([process.env.NODE_ENV]);
const app = express();

// Setting up the mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

// Including the user db schema and the books db schema from mongo

const {User} = require('./models/user');
const {Book} = require('./models/book');

// Using Bodyparser
app.use(bodyParser.json());
app.use(cookieParser());

// Creating the requests

// GET //
app.get('/api/getBook',(req,res)=>{
    // Requesting the id from DB
    let id = req.query.id;

    // Finding the book from DB by id
    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

// Request to get many books
app.get('/api/books',(req,res)=>{
    // Setting up the skip variable for skipping some ids
    let skip = parseInt(req.query.skip);
    // Setting up the limit
    let limit = parseInt(req.query.limit);
    // Setting up the order
    let order = req.query.order;

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })

})

// Passing the owner id
app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id;
    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name:doc.name,
            lastname:doc.lastname
        })
    })
})

// Getting the users
app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

// Gets the books of particular user
app.get('/api/user_posts',(req,res)=>{
    Book.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// Logout (widh creating the middleware auth)
app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

// Checking the user rights
app.get('/api/auth',auth,()=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

// POST //
app.post('/api/book',(req,res)=>{
    const book = new Book(req.body)
    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
})

// Registering the user
app.post('/api/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            successt:true,
            user:doc
        })
    })
})

// Log in
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email}, (err,user)=>{
        if(!user) return res.json({
            isAuth:false,
            message: 'Auth failed, email not found'
        })
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth: false,
                message: "Wrong Password"
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE //
app.post('/api/book_update',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})

// DELETE //
app.delete('/api/delete_book',(req,res)=>{
    let id = req.query.id;

    Book.findByIdAndDelete(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})


// Setting up the server
const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log('server is running');
})