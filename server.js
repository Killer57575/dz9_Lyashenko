/**
 * Created by Note on 23.04.2015.
 */

var express = require ('express');
var app = express ();
var bodyparser = require ('body-parser');
var logger = require('morgan');
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var index = require('./routes/index')(app);




    app.listen(3030, function () {
    console.log('Cервер працює на 3030');
    });


