/**
 * Created by Note on 14.06.2015.
 */
var express = require('express');
var resetRouter = express.Router();
var mongoose = require('mongoose');
var Human = require('../human');
var Necromant = require('../necro');
var humanMarshrut = require('../humanMarshrut');
var necroMarshrut = require('../necroMarshrut');

function saveNecromant (necroName){
    var NecroModel = mongoose.model('necroModel');
    global.necro.marshrutInfo = {
        necroCurentPosition:0,
        necroTheEnd:false
    };
    NecroModel.findOneAndUpdate({"name": necroName},global.necro,{new: true},function(err){
        //пусто
    });
};

function saveHuman (humanName){
    var HumanModel = mongoose.model('humanModel');
    global.human.marshrutInfo = {
        humanCurentPosition:0,
        humanTheEnd:false
    };
    HumanModel.findOneAndUpdate({"name": humanName},global.human,{new: true},function(err){
        //пусто
    });
};

resetRouter.use('*', function(req,res, next){
    var HumanModel = mongoose.model('humanModel');
    var NecroModel = mongoose.model('necroModel');

    if ((global.human==undefined)&&(global.necro==undefined)){ // ліземо в базу за героями
        HumanModel.findOne({"_id":1},function(err,hero){
            if (err){
                return next(err);
            };
            if (hero) {
                global.human = {};
                global.human = new Human(hero.name, hero.age);

                saveHuman(global.human.name);
            };
            NecroModel.findOne({"_id": 2}, function (err, hero2) {
                if (err) {
                    return next(err);
                };
                if (hero2) {
                    global.necro = {};
                    Necromant.prototype = global.human;         //наслідуємось від Людини
                    Necromant.constructor = Necromant;
                    global.necro = new Necromant(hero2.name);

                    saveNecromant(global.necro.name);
                };
//========================аналізуємо що отримали з бази ========================
                if (global.human != undefined) {
                    if (global.necro != undefined){
                        console.log('Налаштування Людини і Некроманта скинуті до початкових');
                        res.status(200).send('Налаштування Людини і Некроманта скинуті до початкових');
                    } else {
                        console.log('Налаштування Людини скинуті до початкових');
                        res.status(200).send('Налаштування Людини скинуті до початкових');
                    };

                } else {
                    res.status(200).send('Персонажі не створені');
                };
            });
        });
    } else {  //======== якщо не треба лізти в базу за героями=============
        if (global.human != undefined) {
            if (global.necro != undefined){
                humanMarshrut.humanCurentPosition = 0;
                humanMarshrut.humanTheEnd = false;
                necroMarshrut.necroCurentPosition = 0;
                necroMarshrut.necroTheEnd = false;
                global.human = new Human(global.human.name, global.human.age);
                Necromant.prototype = global.human;         //наслідуємось від Людини
                Necromant.constructor = Necromant;
                global.necro = new Necromant(global.necro.name);
                saveHuman(global.human.name);
                saveNecromant(global.necro.name);
                console.log('Налаштування Людини і Некроманта скинуті до початкових');
                res.status(200).send('Налаштування Людини і Некроманта скинуті до початкових');
            } else {
                humanMarshrut.humanCurentPosition = 0;
                humanMarshrut.humanTheEnd = false;
                global.human = new Human(global.human.name, global.human.age);
                saveHuman(global.human.name);
                console.log('Налаштування Людини скинуті до початкових');
                res.status(200).send('Налаштування Людини скинуті до початкових');
            };

        };
    };
});

module.exports = resetRouter;