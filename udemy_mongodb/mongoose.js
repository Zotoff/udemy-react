const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

// Setting up the collection schema
const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    avail: Boolean
});

// Model
const Car = mongoose.model('Car',carSchema);

// Creating a new instance of object
// const addCar = new Car({
//     brand: 'Nissan',
//     model: 'Terrano',
//     year: 2018,
//     avail: true
// })

// Storing the data
// addCar.save((err, doc) => {
//     if(err) return console.log(err);
//     console.log(doc)
// })

/* Getting the data from MongoDB */
// Car.find((err, doc) => {
//     if(err) return console.log(err);
//     console.log(doc);
// })

// Car.findOne({brand:'Nissan'}, (err, doc) => {
//     if(err) return console.log(err);
//     console.log(doc);
// })

// Car.findById("a123465", (err, doc) => {
//     if(err) return console.log(err);
//     console.log(doc);
// })

/*Deleting the data*/

// Car.findOneAndRemove({brand: "Nissan"}, (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc)
// })

// Car.findByIdAndRemove("asb1564654", (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc)
// })

// Car.remove({year: 2000}, (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc)
// })

/* Updating the data */

Car.update({_id:"5d1e3c2ea6fe243788ad8f43"}, {$set:{brand:"Ford"}}, (err, doc)=>{
    if(err) return console.log(err);
    console.log(doc)
})

Car.findByIdAndUpdate("5d1e3c2ea6fe243788ad8f43", {$set:{brand:"Galaxy"}}, {new: false}, (err, doc)=>{
    if(err) return console.log(err);
    console.log(doc)
})

Car.findById("d1e3c2ea6fe243788ad8f43", (err, car)=>{
    if(err) return console.log(err);
    car.set({
        brand: "UAZ"
    });
    car.save((err, doc)=>{
        if(err) return console.log(err);
        console.log(doc)
    })
})