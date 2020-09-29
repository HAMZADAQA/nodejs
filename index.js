const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const routes = require('./routes/api');

// set up express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/citygo');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// lazem fok el routes
app.use(bodyParser.json()); 
// app.use('/api',routes); muhem

// initialize routes
app.use('/api', require('./routes/api'));

// app.get('/api', function(req, res){
//     console.log('Get request');
//     res.send({name:'Hamza'});
// })

// error handling Middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error:err.message});
})

// listen for requests 
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});