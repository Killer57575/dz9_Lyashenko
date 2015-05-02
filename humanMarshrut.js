/**
 * Created by Note on 26.04.2015.
 */

var Human = require('./human');
var configHeroes = require('./configHeroes');

var humanMarshrut = {

        humanCurentPosition: 0,
        humanTheEnd: false,

        humannextXY: function () {
            var marsh = [configHeroes.humanStartPoint, [0, 10], [115, 20], [200, 200], configHeroes.humanEndPoint];
            var len = marsh.length - 1;
                if (this.humanCurentPosition != len) {
                    this.humanCurentPosition++;
                    this.humanTheEnd = false;
                } else {
                    this.humanTheEnd = true;
                };
                return this.humanTheEnd ? marsh[len] : marsh[this.humanCurentPosition];

        }
    };
module.exports = humanMarshrut;
