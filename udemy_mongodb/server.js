const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/test';

/*Connecting to MongoDB */
// MongoClient.connect(url, (err,db)=>{
//     if(err){
//         console.log('error')
//     }
//     console.log('connected')
//     db.close();
// })

/*Inserting the Data to MongoDB */

// const cars = [
//     {model: "Cherry", year: 2019},
//     {model: "Kia", year: 2013}
// ]

// MongoClient.connect(url,(err, db)=>{
//     db.collection('Cars').insertMany(cars, (err, res)=>{
//         if(err){
//             return console.log(`Cannot insert ${err}`)
//         }
//         console.log(res.ops[0]._id.getTimestamp())
//     })
//     db.close();
// })

/*Getting the Data from MongoDB*/

// MongoClient.connect(url, (err, db)=>{
//     db.collection('Cars').find().limit(1).toArray().then(data=>{
//         console.log(data)
//     });
//     db.close();
// })

/*Getting the single Data from MongoDB */

// MongoClient.connect(url, (err, db)=>{
//     db.collection('Cars').findOne({model: 'Ford'}).then(data=>{
//         console.log(data);
//     })
//     db.close();
// })

/*Delete the data from Selection */

// MongoClient.connect(url, (err,db)=>{
//     db.collection('Cars').deleteOne({model:'Kia'},(err,doc)=>{
//         console.log(doc)
//     })
//     db.close();
// })

/*Updating the data*/

MongoClient.connect(url, (err,db)=>{
    db.collection('Cars').findOneAndUpdate(
        {model:'Cherry'},
        {
            $set: {model: 'Chevy Niva'}
        },
        {
            upsert:true,
            returnOriginal:false
        },
        (err,doc)=>{
        console.log(doc)
    })
    db.close();
})