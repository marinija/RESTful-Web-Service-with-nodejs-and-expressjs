const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/bookAPI');
let db = mongoose.connection;

//Check connection
db.once('open', () => {
    console.log('Connected to mongodb');
});

//Check for db errors
db.on('error', (err) => {
    console.log(err);
});
const Book = require('./models/bookModel');

const app = express();

const port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => {
    console.log('Running on port:' + port);
});