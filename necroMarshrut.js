/**
 * Created by Note on 02.05.2015.
 */


var Necromant = require('./necro');
var configHeroes = require('./configHeroes');

var necromarshrut = {

    necroCurentPosition: 0,
    necroTheEnd: false,

    necronextXY: function () {
        var marsh2 = [configHeroes.humanStartPoint, [700, 400], [600, 200], [550, 250],configHeroes.necroEndPoint];
        var len2 = marsh2.length - 1;

        if (this.necroCurentPosition != len2) {
            this.necroCurentPosition++;
            this.necroTheEnd = false;
        } else {
            this.necroTheEnd = true;
        };
        return this.necroTheEnd ? marsh2[len2] : marsh2[this.necroCurentPosition];

    }
};
module.exports = necromarshrut;
