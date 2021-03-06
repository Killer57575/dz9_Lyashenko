/**
 * Created by Note on 01.05.2015.
 */
var express = require('express');
var createRouter = express.Router();
var mongoose = require('mongoose');
var Human = require('../human');
var Necromant = require('../necro');
var humanMarshrut = require('../humanMarshrut');
var necroMarshrut = require('../necroMarshrut');


createRouter.post('/necro', function(req, res) {
    var name = req.body.name;
    if (global.human){
    global.necro ={};
    Necromant.prototype = global.human;         //наслідуємось від Людини
    Necromant.constructor = Necromant;
        global.necro = new Necromant(name);
        var NecroModel = mongoose.model('necroModel');
        global.necro.marshrutInfo = {
            necroCurentPosition:necroMarshrut.necroCurentPosition,
            necroTheEnd:necroMarshrut.necroTheEnd
        };
        global.necro._id = 2;
        NecroModel.findOneAndUpdate({"_id": 2},global.necro,{upsert: true},function(err){
            if (err) {
                return res.status(500).send(err);
            };
            res.status(200).send('Персонаж класу Некромант з іменем ' + name +' створено успішно');
        });
    } else {
        console.log('Спочатку створіть персонажа класу Людина через create/human');
        res.status(403).send('Спочатку створіть персонажа класу Людина через create/human')}
});

createRouter.post('/human', function(req, res) {
    var body = req.body;
    var name = body.name;
    var age = body.age;
    if (name&&age) {
        global.human = {};
        global.human = new Human(name, age);
        global.human._id = 1;
        var HumanModel = mongoose.model('humanModel');
        global.human.marshrutInfo = {
            humanCurentPosition:humanMarshrut.humanCurentPosition,
            humanTheEnd:humanMarshrut.humanTheEnd
        };

        HumanModel.findOneAndUpdate({"_id": 1},global.human,{upsert: true},function(err){
            if (err) {
                return res.status(500).send(err);
            };
            res.status(200).send('Персонаж класу Людина з іменем ' + name + ' та віком ' + age + ' створено успішно');
        });
    } else {
        console.log('Ви не ввели Ім\'я або вік');
        res.status(403).send('Ви не ввели Ім\'я або вік');
    };
});

createRouter.use('*', function(req, res) {
    res.status(403).send('Для створення Людини - введіть Ім\'я та вік в post create/human'+'<br />'+'Для створення Некроманта - введіть Ім\'я в post create/necro');
});


module.exports = createRouter;