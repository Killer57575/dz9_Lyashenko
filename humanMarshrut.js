/**
 * Created by Note on 26.04.2015.
 */

var configHeroes = require('./configHeroes');

var humanMarshrut = {

    humanCurentPosition: 0,
    humanTheEnd: false,

    humanNextXY: function () {
        var marsh = [configHeroes.humanStartPoint, [0, 10], [115, 20], [200, 200], configHeroes.humanEndPoint];
        var len = marsh.length - 1;
        this.humanCurentPosition++;
        (this.humanCurentPosition != len)?this.humanTheEnd = false:this.humanTheEnd = true;
        return this.humanTheEnd ? marsh[len] : marsh[this.humanCurentPosition];
    }
};
module.exports = humanMarshrut;
