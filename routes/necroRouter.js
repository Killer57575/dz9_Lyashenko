/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var necroRouter = express.Router();
var mongoose = require('mongoose');
var Human = require('../human');
var Necromant = require('../necro');
var humanMarshrut = require('../humanMarshrut');
var necroMarshrut = require('../necroMarshrut');
var world = require('../world');
var hel; //змінна для перевірки чи втратив здоровя, тимчасова

function ableToFight (){
    if (global.human!=undefined){
        if (global.necro.vector.distanceTo(global.human.vector)<=global.necro.atackDistance) {
            hel = global.human.health;
            global.necro.fight(global.human);              // якщо після переміщення можемо вдарити
            if (hel>global.human.health){
                global.human.fight(global.necro); //якщо вдарили то дати здачу
                saveHuman(global.human.name);
            };
        };
    };
};

function saveNecromant (necroName){
    var NecroModel = mongoose.model('necroModel');
    global.necro.marshrutInfo = {
        necroCurentPosition:necroMarshrut.necroCurentPosition,
        necroTheEnd:necroMarshrut.necroTheEnd
    };
    NecroModel.findOneAndUpdate({"name": necroName},global.necro,{new: true},function(err){
        //пусто
    });
};

function saveHuman (humanName){
    var HumanModel = mongoose.model('humanModel');
    global.human.marshrutInfo = {
        humanCurentPosition:humanMarshrut.humanCurentPosition,
        humanTheEnd:humanMarshrut.humanTheEnd
    };
    HumanModel.findOneAndUpdate({"name": humanName},global.human,{new: true},function(err){
        //пусто
    });
};

necroRouter.get('/:necroName/*', function(req, res, next) { //валідатор та зчитуємо з бази персонажів якщо треба
    var necroName = req.params.necroName;
    var HumanModel = mongoose.model('humanModel');
    var NecroModel = mongoose.model('necroModel');

    if ((global.human==undefined)&&(global.necro==undefined)){ // ліземо в базу за героями
      HumanModel.findOne({"_id":1},function(err,hero){
          if (err){
              next(err);
          };
          if (hero) {
              global.human = {};
              global.human = new Human(hero.name, hero.age);
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
          };
          NecroModel.findOne({"_id":2},function(err,hero2){
              if (err){
                  next(err);
              };
              if (hero2) {
                  global.necro = {};
                  Necromant.prototype = global.human;         //наслідуємось від Людини
                  Necromant.constructor = Necromant;
                  global.necro = new Necromant(hero2.name);
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
              };
//========================аналізуємо що отримали з бази ========================
              if (global.necro!=undefined){
                  if (global.necro.name==necroName){
                      next();        // все ОК
                  } else {
                      res.status(403).send('Немає такого Некроманта ' + necroName);
                  };
              } else {res.status(403).send('Персонаж класу Некромант не створений');
              };
          });
      });
    } else {  //======== якщо не треба лізти в базу за героями=============
        if (global.necro!=undefined){
            if (global.necro.name==necroName){
                next();        // все ОК
            } else {
                res.status(403).send('Немає такого Некроманта ' + necroName);
            };
        } else {res.status(403).send('Персонаж класу Некромант не створений');
        };
    };
});


necroRouter.get('/:necroName/moveTo/:x/:y', function(req, res) {
    var necroName = req.params.necroName;

    global.necro.moveTo(req.params.x,req.params.y);
    ableToFight(); //якщо може когось вдарити після переміщення то проходить атака
    world.refresh();
    saveNecromant(necroName);
    res.status(200).send('Персонаж ' + global.necro.name + ' перемістився в точку (' + global.necro.vector.x2 + ',' + global.necro.vector.y2 + ')');
});


necroRouter.get('/:necroName/moveTo', function(req, res) {
    var necroName = req.params.necroName;

    global.necro.moveTo();
    ableToFight();
    world.refresh();
    saveNecromant(necroName);
    res.status(200).send('Персонаж ' + global.necro.name + ' перемістився в точку (' + global.necro.vector.x2 + ',' + global.necro.vector.y2 + ')');
});


necroRouter.get('/:necroName/fight', function(req, res) {
    var necroName = req.params.necroName;

    if (global.human!=undefined) {    //чи створена людина
        if ((global.human.health<=0)||(global.necro.health<=0)){
            global.necro.health<=0?console.log('Переміг ' + global.human.name):console.log('Переміг ' + global.necro.name);
        } else {
            hel = global.human.health;
            global.necro.fight(global.human); //атака
            if (hel>global.human.health){
                global.human.fight(global.necro); //якщо вдарили то дати здачу
            };
            saveHuman(global.human.name);
            saveNecromant(necroName);
        };

        res.status(200).send(); //людина створена і атака пройшла
    } else {res.status(403).send('Персонаж класу Людина не створений, немає кого вдарити')};
});

necroRouter.use('*', function(req, res) {
    res.status(403).send('Для переміщення Некроманта - введіть в get /necromant/Ім\'я некроманта/moveTo або /necromant/Ім\'я некроманта/moveTo/Х/У'+'<br />'+'Для атаки - введіть в  get /necromant/Ім\'я некроманта/fight');
});

module.exports = necroRouter;