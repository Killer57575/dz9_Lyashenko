/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var humanRouter = express.Router();
var world = require('../world');

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
    world.refresh();
    res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');
});

humanRouter.get('/:humanName/moveTo', function(req, res) {
        global.human.moveTo();
        world.refresh();
        res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');
});

humanRouter.get('/:humanName/fight', function(req, res) {
            var hel;
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
            } else {res.status(403).send('Персонаж класу Некромант не створений, немає кого вдарити')};
});

humanRouter.use('*', function(req, res) {
    res.status(403).send('Для переміщення Людини - введіть в get /human/Ім\'я людини/moveTo'+'<br />'+'Для атаки - введіть в  get /human/Ім\'я людини/fight');
});

module.exports = humanRouter;