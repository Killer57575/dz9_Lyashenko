/*
Created by Note on 02.05.2015.
*/

var configHeroes = require('./configHeroes');

var necroMarshrut = {

    necroCurentPosition: 0,
    necroTheEnd: false,

    necroNextXY: function () {
        var marsh2 = [configHeroes.necroStartPoint, [700, 400], [600, 200], [550, 250],configHeroes.necroEndPoint];
        var len2 = marsh2.length - 1;
        this.necroCurentPosition++;
        if (this.necroCurentPosition != len2) {
            this.necroTheEnd = false;
        } else {
            this.necroTheEnd = true;
        };
        return this.necroTheEnd ? marsh2[len2] : marsh2[this.necroCurentPosition];

    }
};
module.exports = necroMarshrut;
