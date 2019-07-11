const brcypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// const secret = 'mysecretpassword';
// const secretSalt = 'asdasdasdas';


// const user = {
//     id: 1,
//     token: MD5('dasdasda').toString() + secretSalt
// }

// const receivedToken = 'ac6555bfe23f5fe7e98fdcc0cd5f2451'

// if(user.token === receivedToken){
//     console.log('move forward')
// }else{
//     console.log("Doesn't match")
// }


// console.log(user);

/*Working with JSON Web Token*/

const id = '1000';
const secret = 'supersecret';

const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken,secret); 

console.log(decodeToken)