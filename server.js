/**
 * Created by Note on 23.04.2015.
 */

var express = require ('express');
var app = express ();
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var url = 'mongodb://localhost:27017/LyashenkoDb';
var logger = require('morgan');
app.use(logger('dev'));
app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));

var index = require('./routes/index')(app);

mongoose.connect(url);
var db = mongoose.connection;

db.once('open', function () {
    require('./models/index.js');

    app.listen(3030, function () {
        console.log('Cервер працює на 3030');
    });
});

process.env.NODE_ENV = 'production';
