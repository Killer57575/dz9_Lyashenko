/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var mimoRouter = express.Router();


mimoRouter.get('/', function(req, res) {
    res.status(403).send('Для створення персонажа скористайтесь /create'+'<br />'+'Для інших дій скористайтесь посиланням /human або /necromant');
});

module.exports = mimoRouter;