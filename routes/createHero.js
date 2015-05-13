/**
 * Created by Note on 01.05.2015.
 */
var express = require('express');
var createRouter = express.Router();
var Human = require('../human');
var Necromant = require('../necro');


createRouter.post('/necro', function(req, res) {
    var name = req.body.name;
    if (global.human){
    global.necro ={};
    Necromant.prototype = global.human;         //наслідуємось від Людини
    Necromant.constructor = Necromant;
    global.necro = new Necromant(name);
        console.log('Персонаж класу Некромант з іменем ' + name +' створено успішно');
    res.status(200).send('Персонаж класу Некромант з іменем ' + name +' створено успішно');
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
        console.log('Персонаж класу Людина з іменем ' + name + ' та віком ' + age + ' створено успішно');
        res.status(200).send('Персонаж класу Людина з іменем ' + name + ' та віком ' + age + ' створено успішно');
    } else {
        console.log('Ви не ввели Ім\'я або вік');
        res.status(403).send('Ви не ввели Ім\'я або вік');
    };
});

createRouter.use('*', function(req, res) {
    res.status(403).send('Для створення Людини - введіть Ім\'я та вік в post create/human'+'<br />'+'Для створення Некроманта - введіть Ім\'я в post create/necro');
});


module.exports = createRouter;