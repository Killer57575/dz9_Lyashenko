/**
 * Created by Note on 23.04.2015.
 */
var express = require ('express');
var app = express ();
var bodyparser = require ('body-parser');


//app.use(bodyparser.json());

module.exports.start  = function start(){
    app.get('/info', function (req, res, next) {
            res.status(200).send({pupkin: 'Hello World'});
        });

app.post('/info', function (req, res, next) {
    var body = req.body;
    if (!body.key){
        var err = new Error ('Not key');
        return res.status(300).send({error:err.message});
    }
    res.status(200).send(body);

});

app.listen(3030, function () {
    console.log('Cервер працює на 3030');
});
};