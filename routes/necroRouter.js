/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var necroRouter = express.Router();
var mongoose = require('mongoose');
var Necromant = require('../necro');
var humanMarshrut = require('../humanMarshrut');
var necroMarshrut = require('../necroMarshrut');
var world = require('../world');
var hel;

function ableToFight (){
    if (global.human!=undefined){
        if (global.necro.vector.distanceTo(global.human.vector)<=global.necro.atackDistance) {
            hel = global.human.health;
            global.necro.fight(global.human);              // якщо після переміщення можемо вдарити
            if (hel>global.human.health){
                global.human.fight(global.necro); //якщо вдарили то дати здачу
            };
        };
    };
};

necroRouter.get('/:necroName/*', function(req, res, next) { //валідатор
    var necroName = req.params.necroName;
    if (global.necro!=undefined){
        if (global.necro.name==necroName){
            next();        // все ОК
        } else {
            res.status(403).send('Немає такого Некроманта ' + necroName);
        };
    } else {res.status(403).send('Персонаж класу Некромант не створений');
    };
});

necroRouter.get('/:necroName/moveTo/:x/:y', function(req, res) {
    global.necro.moveTo(req.params.x,req.params.y);
    ableToFight(); //якщо може когось вдарити після переміщення то проходить атака
    world.refresh();
    var NecroModel = mongoose.model('necroModel');
    global.necro.marshrutInfo = {
        necroCurentPosition:necroMarshrut.necroCurentPosition,
        necroTheEnd:necroMarshrut.necroTheEnd
    };
    NecroModel.findOneAndUpdate({"name": req.params.necroName},global.necro,{new: true},function(err){
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send('Персонаж ' + global.necro.name + ' перемістився в точку (' + global.necro.vector.x2 + ',' + global.necro.vector.y2 + ')');
    });
});

necroRouter.get('/:necroName/moveTo', function(req, res) {
    global.necro.moveTo();
    ableToFight();
    world.refresh();
    var NecroModel = mongoose.model('necroModel');
    global.necro.marshrutInfo = {
        necroCurentPosition:necroMarshrut.necroCurentPosition,
        necroTheEnd:necroMarshrut.necroTheEnd
    };
    NecroModel.findOneAndUpdate({"name": req.params.necroName},global.necro,{new: true},function(err){
        if (err) {
            return res.status(500).send(err);
        };
    });
    res.status(200).send('Персонаж ' + global.necro.name + ' перемістився в точку (' + global.necro.vector.x2 + ',' + global.necro.vector.y2 + ')');
});

necroRouter.get('/:necroName/fight', function(req, res) {
    var HumanModel = mongoose.model('humanModel');
    var NecroModel = mongoose.model('necroModel');

    if (global.human!=undefined) {    //чи створена людина
        if ((global.human.health<=0)||(global.necro.health<=0)){
            global.necro.health<=0?console.log('Переміг ' + global.human.name):console.log('Переміг ' + global.necro.name);
        } else {
            hel = global.human.health;
            global.necro.fight(global.human); //атака
            if (hel>global.human.health){
                global.human.fight(global.necro); //якщо вдарили то дати здачу
            }
            ;
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
            NecroModel.findOneAndUpdate({"name": req.params.necroName},global.necro,{new: true},function(err){
                if (err) {
                    return res.status(500).send(err);
                };
            });
        };


        res.status(200).send();
    } else {res.status(403).send('Персонаж класу Людина не створений, немає кого вдарити')};
});

necroRouter.use('*', function(req, res) {
    res.status(403).send('Для переміщення Некроманта - введіть в get /necromant/Ім\'я некроманта/moveTo або /necromant/Ім\'я некроманта/moveTo/Х/У'+'<br />'+'Для атаки - введіть в  get /necromant/Ім\'я некроманта/fight');
});

module.exports = necroRouter;