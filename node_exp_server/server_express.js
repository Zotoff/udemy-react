const express = require('express');
const app = express();

const querystring = require('querystring');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/', (req, res, next) => {
    console.log('Someone made a request: ' + req.url);
    res.cookie('cookiename', 'cookievalue');
	next(); //вызываем ОБЯЗАТЕЛЬНО иначе выполнение приложения заморозится
})

const urlencodeParser = bodyParser.urlencoded({extended:false});
const jsonParser = bodyParser.json();


app.get('/',(req, res)=>{
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/css/style.css"
            </head>
            <body>
                <h1>Hello All</h1>
            </body>
        </html>
    `)
})

app.get('/api', (req, res) => {
    res.send({
        name: 'Paul',
        lastname: 'Zotov'
    })
})

app.get('/api/user/:id', (req, res) => {
    let id = req.params.id;
    res.send(`
        <html>
            <body>
                <h1>The user id is ${id}</h1>
            </body>
        </html>
    `)
})

app.get('/user', (req, res) => {
    let html  = fs.readFileSync(`${__dirname}/querystring.html`);
    res.send(`${html}`)
})

app.get('/user_post', (req, res) => {
    let html  = fs.readFileSync(`${__dirname}/jsonpost.html`);
    res.send(`${html}`)
})

app.post('/enteruser_post', jsonParser, (req, res) => {
    console.log(req.body);
    res.send(200);
})

app.post('/enteruser', urlencodeParser, (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    console.log(firstname);
})

app.get('/api/car', (req, res) => {
    let .brand = req.query.brand;
    let year = req.query.year;

    res.send({
        brand,
        year
    })
})

const port = process.env.PORT || 3000;

app.listen(port);