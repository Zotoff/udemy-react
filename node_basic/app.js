const os = require('os');
const fs = require('fs');

const userData = require('./user.js');

console.log('Hey');

let user = os.userInfo();
let date = new Date();

let message = `User "${user.username}" started App at ${date}`;

fs.appendFile('log.txt', message, (err)=>{
    if(err){
        console.log(`Something went wrong at ${date}`)
    }
})