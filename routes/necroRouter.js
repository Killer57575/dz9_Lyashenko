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
        res.status(200).send();
    } else {
        res.status(403).send('Немає такої Людини ' + necroName);
    };} else {res.status(403).send('Персонаж класу Некромант не створений');
    };
});

necroRouter.get('*', function(req, res) {
    res.status(403).send('Для переміщення Некроманта - введіть в get /necromant/Ім\'я некроманта/moveTo');
});

module.exports = necroRouter;