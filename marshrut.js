/**
 * Created by Note on 26.04.2015.
 */

module.exports = (function () {
    return {

        curentPosition: 0,
        theEnd: false,
        nextXY: function () {
            var marsh = [[0, 0], [0, 10], [115, 20], [200, 200]];
            var len = marsh.length - 1;
            if (this.curentPosition!=len){
                this.curentPosition++;
                this.theEnd = false;
            } else {
                this.theEnd = true;
            };
            return this.theEnd ? marsh[len] : marsh[this.curentPosition];
        }

    };
})();