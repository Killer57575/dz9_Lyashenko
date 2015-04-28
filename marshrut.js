/**
 * Created by Note on 26.04.2015.
 */

module.exports = (function () {
    return {

        curentPosition: 0,
        theEnd: false,
        nextXY: function () {
            var marsh = [[0, 0], [0, 600], [100, 600], [100, 0]];
            var len = marsh.length - 1;
            this.curentPosition==len?this.curentPosition:this.curentPosition++;
            this.curentPosition == len ? this.theEnd = true : this.theEnd = false;
            return this.theEnd ? marsh[len] : marsh[this.curentPosition];
        }

    };
})();