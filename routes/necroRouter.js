/**
 * Created by Note on 02.05.2015.
 */
var express = require('express');
var necroRouter = express.Router();


necroRouter.get('/:necroName/moveTo', function(req, res) {
    var necroName = req.params.necroName;
    if (global.necro!=undefined){
    if (global.necro.name==necroName){
        global.necro.moveTo();
        res.status(200).send('Персонаж ' + global.necro.name + ' перемістився в точку (' + global.necro.vector.x2 + ',' + global.necro.vector.y2 + ')');
    } else {
        res.status(403).send('Немає такої Людини ' + necroName);
    };} else {res.status(403).send('Персонаж класу Некромант не створений');
    };
});

necroRouter.get('/:necroName/fight', function(req, res) {
    var necroName = req.params.necroName;
    if (global.necro!=undefined){             //чи створений некромант
        if (global.necro.name==necroName){    //чи співпало імя із запитом
            if (global.human!=undefined) {    //чи створена людина
                if ((global.human.health<=0)||(global.necro.health<=0)){
                    global.necro.health<=0?console.log('Переміг ' + global.human.name):console.log('Переміг ' + global.necro.name);
                } else {
                    global.necro.fight(global.human); //атака
                    global.human.fight(global.necro); //здача
                };
                res.status(200).send();
            } else {res.status(403).send('Персонаж класу Некромант не створений')};
        } else {
            res.status(403).send('Немає такої Людини ' + humanName);
        };} else {res.status(403).send('Персонаж класу Людина не створений');
    };
});

necroRouter.get('*', function(req, res) {
    res.status(403).send('Для переміщення Некроманта - введіть в get /necromant/Ім\'я некроманта/moveTo'+'<br />'+'Для атаки - введіть в  get /necromant/Ім\'я некроманта/fight');
});

module.exports = necroRouter;