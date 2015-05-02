/**
 * Created by Note on 26.04.2015.
 */

var Human = require('./human');
var Necromant = require('./necro');

var humanMarshrut = {

        humanCurentPosition: 0,
        humanTheEnd: false,
        necroCurentPosition: 0,
        necroTheEnd: false,

        humannextXY: function () {
            var marsh = [[0, 0], [0, 10], [115, 20], [200, 200], [400, 300]];
            var len = marsh.length - 1;
                if (this.humanCurentPosition != len) {
                    this.humanCurentPosition++;
                    this.humanTheEnd = false;
                } else {
                    this.humanTheEnd = true;
                };
                return this.humanTheEnd ? marsh[len] : marsh[this.humanCurentPosition];

        },
        necronextXY: function () {
            var marsh2 = [[800, 450], [700, 400], [600, 200], [550, 250],[400,300]];
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
module.exports = humanMarshrut;
