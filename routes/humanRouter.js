/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var humanRouter = express.Router();
var mongoose = require('mongoose');
var Human = require('../human');
var Necromant = require('../necro');
var humanMarshrut = require('../humanMarshrut');
var necroMarshrut = require('../necroMarshrut');
var world = require('../world');
var hel; //змінна для перевірки чи втратив здоровя, тимчасова

function ableToFight (){
    if (global.necro!=undefined){
        if (global.human.vector.distanceTo(global.necro.vector)<=global.human.atackDistance) {
            hel = global.necro.health;
            global.human.fight(global.necro);              // якщо після переміщення можемо вдарити
            if (hel>global.necro.health){
                global.necro.fight(global.human); //якщо вдарили то дати здачу
            };
        };
    };
};

humanRouter.get('/:humanName/*', function(req, res, next) {  //валідатор
    var humanName = req.params.humanName;
    if (global.human!=undefined){
        if (global.human.name==humanName){
            next();                                     // все ОК
        } else {
            res.status(403).send('Немає такої Людини ' + humanName);
        };} else {res.status(403).send('Персонаж класу Людина не створений');
    };
});

humanRouter.get('/:humanName/moveTo/:x/:y', function(req, res) {
    global.human.moveTo(req.params.x,req.params.y);
    ableToFight(); //якщо може когось вдарити після переміщення то проходить атака
    world.refresh();
    var HumanModel = mongoose.model('humanModel');
    global.human.marshrutInfo = {
        humanCurentPosition:humanMarshrut.humanCurentPosition,
        humanTheEnd:humanMarshrut.humanTheEnd
    };
    HumanModel.findOneAndUpdate({"name": req.params.humanName},global.human,{new: true},function(err){
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');
    });
});

humanRouter.get('/:humanName/moveTo', function(req, res) {
    global.human.moveTo();
    ableToFight();
    world.refresh();
    var HumanModel = mongoose.model('humanModel');

    global.human.marshrutInfo = {
        humanCurentPosition:humanMarshrut.humanCurentPosition,
        humanTheEnd:humanMarshrut.humanTheEnd
    };
    HumanModel.findOneAndUpdate({"name": req.params.humanName},global.human,{new: true},function(err){
        if (err) {
            return res.status(500).send(err);
        }
    });
    res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');

});

humanRouter.get('/:humanName/fight', function(req, res) {
    var HumanModel = mongoose.model('humanModel');
    var NecroModel = mongoose.model('necroModel');

    if (global.necro!=undefined) {   //чи Некромант створений
        if ((global.human.health<=0)||(global.necro.health<=0)){
            global.necro.health<=0?console.log('Переміг ' + global.human.name):console.log('Переміг ' + global.necro.name);
        } else {
            hel = global.necro.health;
            global.human.fight(global.necro); //атака
            if (hel>global.necro.health){
                global.necro.fight(global.human); //якщо вдарили то дати здачу
            };
        };
        res.status(200).send();

        global.human.marshrutInfo = {
            humanCurentPosition:humanMarshrut.humanCurentPosition,
            humanTheEnd:humanMarshrut.humanTheEnd
        };
        HumanModel.findOneAndUpdate({"name": req.params.humanName},global.human,{new: true},function(err){
            if (err) {
                return res.status(500).send(err);
            };
        });

        global.necro.marshrutInfo = {
            necroCurentPosition:necroMarshrut.necroCurentPosition,
            necroTheEnd:necroMarshrut.necroTheEnd
        };
        NecroModel.findOneAndUpdate({"_id": 2},global.necro,{new: true},function(err){
            if (err) {
                return res.status(500).send(err);
            };
        });
    } else {res.status(403).send('Персонаж класу Некромант не створений, немає кого вдарити')};
});

humanRouter.use('*', function(req, res) {
    res.status(403).send('Для переміщення Людини - введіть в get /human/Ім\'я людини/moveTo або /human/Ім\'я Людини/moveTo/Х/У'+'<br />'+'Для атаки - введіть в  get /human/Ім\'я людини/fight');
});

module.exports = humanRouter;