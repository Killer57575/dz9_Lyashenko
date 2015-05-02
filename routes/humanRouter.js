/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var humanRouter = express.Router();


humanRouter.get('/:humanName/moveTo', function(req, res) {
    var humanName = req.params.humanName;
    if (global.human!=undefined){
    if (global.human.name==humanName){
        global.human.moveTo();
        res.status(200).send();
    } else {
        res.status(403).send('Немає такої Людини ' + humanName);
    };} else {res.status(403).send('Персонаж класу Людина не створений');
    };
});

humanRouter.get('*', function(req, res) {
    res.status(403).send('Для переміщення Людини - введіть в get /human/Ім\'я людини/moveTo');
});

module.exports = humanRouter;