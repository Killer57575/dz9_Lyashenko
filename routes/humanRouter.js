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
        res.status(200).send('Персонаж ' + global.human.name + ' перемістився в точку (' + global.human.vector.x2 + ',' + global.human.vector.y2 + ')');
    } else {
        res.status(403).send('Немає такої Людини ' + humanName);
    };} else {res.status(403).send('Персонаж класу Людина не створений');
    };
});

humanRouter.get('/:humanName/fight', function(req, res) {
    var humanName = req.params.humanName;
    if (global.human!=undefined){            //чи людина створена
        if (global.human.name==humanName){   //чи є така людина з таким іменем
            if (global.necro!=undefined) {   //чи Некромант створений
                if ((global.human.health<=0)||(global.necro.health<=0)){
                    global.necro.health<=0?console.log('Переміг ' + global.human.name):console.log('Переміг ' + global.necro.name);
                    } else {
                        global.human.fight(global.necro); //атака
                        global.necro.fight(global.human); //здача
                    };
                res.status(200).send();
            } else {res.status(403).send('Персонаж класу Некромант не створений')};
        } else {
            res.status(403).send('Немає такої Людини ' + humanName);
        };} else {res.status(403).send('Персонаж класу Людина не створений');
    };
});

humanRouter.get('*', function(req, res) {
    res.status(403).send('Для переміщення Людини - введіть в get /human/Ім\'я людини/moveTo'+'<br />'+'Для атаки - введіть в  get /human/Ім\'я людини/fight');
});

module.exports = humanRouter;