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
    //var HumanModel = mongoose.model('humanModel');
    if (global.human!=undefined){
        if (global.human.name==humanName){
            next();                                     // все ОК
        } else {
            res.status(403).send('Немає такої Людини ' + humanName);
        };} else {

        next(); //потестити next();
    };
});

humanRouter.get('/:humanName/moveTo/:x/:y', function(req, res) {
    var HumanModel = mongoose.model('humanModel');
    var humanName = req.params.humanName;

    if (global.human==undefined){
        HumanModel.findOne({name: humanName},function (err, hero) {
            if (err) {
                res.status(403).send('Персонаж класу Людина не створений');
            };
            global.human = {};
            global.human = new Human(hero.name,hero.age);
            global.human.vector.x1 = hero.vector.x1;
            global.human.vector.y1 = hero.vector.y1;
            global.human.vector.x2 = hero.vector.x2;
            global.human.vector.y2 = hero.vector.y2;
            global.human.health = hero.health;
            global.human.atackDistance = hero.atackDistance;
            global.human.speed = hero.speed;
            global.human.experience = hero.experience;
            global.human.uvorot = hero.uvorot;
            global.human.parir = hero.parir;
            global.human.krit = hero.krit;
            global.human.armour = hero.armour;
            global.human.fightStrength = hero.fightStrength;
            global.human.goToXY = hero.goToXY;
            global.human.onMarshrut = hero.onMarshrut;
            humanMarshrut.humanCurentPosition = hero.marshrutInfo.humanCurentPosition;
            humanMarshrut.humanTheEnd = hero.marshrutInfo.humanTheEnd;

            global.human.moveTo(req.params.x,req.params.y);
            ableToFight(); //якщо може когось вдарити після переміщення то проходить атака
            world.refresh();
            global.human.marshrutInfo = {
                humanCurentPosition:humanMarshrut.humanCurentPosition,
                humanTheEnd:humanMarshrut.humanTheEnd
            };
            HumanModel.findOneAndUpdate({"name": req.params.humanName},global.human,{new: true},function(err){
                if (err) {
                    return res.status(500).send(err);
                };
                res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');
            }); });
    } else {
        global.human.moveTo(req.params.x,req.params.y);
        ableToFight();
        world.refresh();

        global.human.marshrutInfo = {
            humanCurentPosition: humanMarshrut.humanCurentPosition,
            humanTheEnd: humanMarshrut.humanTheEnd
        };
        HumanModel.findOneAndUpdate({"name": req.params.humanName}, global.human, {new: true}, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        });
        res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');

        };


});

humanRouter.get('/:humanName/moveTo', function(req, res) {
    var HumanModel = mongoose.model('humanModel');
    var humanName = req.params.humanName;
    if (global.human==undefined){
        HumanModel.findOne({name: humanName},function (err, hero) {
            if (err) {
                res.status(403).send('Персонаж класу Людина не створений');
            };
            global.human = {};
            global.human = new Human(hero.name,hero.age);
            global.human.vector.x1 = hero.vector.x1;
            global.human.vector.y1 = hero.vector.y1;
            global.human.vector.x2 = hero.vector.x2;
            global.human.vector.y2 = hero.vector.y2;
            global.human.health = hero.health;
            global.human.atackDistance = hero.atackDistance;
            global.human.speed = hero.speed;
            global.human.experience = hero.experience;
            global.human.uvorot = hero.uvorot;
            global.human.parir = hero.parir;
            global.human.krit = hero.krit;
            global.human.armour = hero.armour;
            global.human.fightStrength = hero.fightStrength;
            global.human.goToXY = hero.goToXY;
            global.human.onMarshrut = hero.onMarshrut;
            humanMarshrut.humanCurentPosition = hero.marshrutInfo.humanCurentPosition;
            humanMarshrut.humanTheEnd = hero.marshrutInfo.humanTheEnd;


            global.human.moveTo();
            ableToFight();
            world.refresh();

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
    } else {
        global.human.moveTo();
        ableToFight();
        world.refresh();

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

    };
});

humanRouter.get('/:humanName/fight', function(req, res) {
    var humanName = req.params.humanName;
    var HumanModel = mongoose.model('humanModel');
    var NecroModel = mongoose.model('necroModel');

    // ============== пробуємо дістати героїв з бази ==========================
    if ((global.human==undefined)&&(global.necro==undefined)) {
        HumanModel.findOne({name: humanName},function (err, hero) {
            if (err) {
                return res.status(403).send('Персонаж класу Людина не створений');
            };
            global.human = {};
            global.human = new Human(hero.name,hero.age);
            //global.human.vector = hero.vector;
            global.human.vector.x1 = hero.vector.x1;
            global.human.vector.y1 = hero.vector.y1;
            global.human.vector.x2 = hero.vector.x2;
            global.human.vector.y2 = hero.vector.y2;
            global.human.health = hero.health;
            global.human.atackDistance = hero.atackDistance;
            global.human.speed = hero.speed;
            global.human.experience = hero.experience;
            global.human.uvorot = hero.uvorot;
            global.human.parir = hero.parir;
            global.human.krit = hero.krit;
            global.human.armour = hero.armour;
            global.human.fightStrength = hero.fightStrength;
            global.human.goToXY = hero.goToXY;
            global.human.onMarshrut = hero.onMarshrut;
            humanMarshrut.humanCurentPosition = hero.marshrutInfo.humanCurentPosition;
            humanMarshrut.humanTheEnd = hero.marshrutInfo.humanTheEnd;

            NecroModel.findOne({_id: 2},function (err, hero2) {
                if (err) {
                   return res.status(403).send('Персонаж класу Некромант не створений');
                };
                global.necro = {};
                Necromant.prototype = global.human;         //наслідуємось від Людини
                Necromant.constructor = Necromant;
                global.necro = new Necromant(hero2.name);
                //global.necro.vector = hero2.vector;
                global.necro.vector.x1 = hero2.vector.x1;
                global.necro.vector.y1 = hero2.vector.y1;
                global.necro.vector.x2 = hero2.vector.x2;
                global.necro.vector.y2 = hero2.vector.y2;
                global.necro.regeneration = hero2.regeneration;
                global.necro.health = hero2.health;
                global.necro.atackDistance = hero2.atackDistance;
                global.necro.speed = hero2.speed;
                global.necro.experience = hero2.experience;
                global.necro.uvorot = hero2.uvorot;
                global.necro.parir = hero2.parir;
                global.necro.krit = hero2.krit;
                global.necro.armour = hero2.armour;
                global.necro.fightStrength = hero2.fightStrength;
                global.necro.goToXY = hero2.goToXY;
                global.necro.onMarshrut = hero2.onMarshrut;
                necroMarshrut.necroCurentPosition = hero2.marshrutInfo.necroCurentPosition;
                necroMarshrut.necroTheEnd = hero2.marshrutInfo.necroTheEnd;

                //===================логіка===========================
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
                };
                //=========================================================


            });



        });

    } else {
        //=================всі дані є, в базу не ліземо =========================

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


    };
});

humanRouter.use('*', function(req, res) {
    res.status(403).send('Для переміщення Людини - введіть в get /human/Ім\'я людини/moveTo або /human/Ім\'я Людини/moveTo/Х/У'+'<br />'+'Для атаки - введіть в  get /human/Ім\'я людини/fight');
});

module.exports = humanRouter;