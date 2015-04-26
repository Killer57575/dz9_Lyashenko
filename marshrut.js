/**
 * Created by Note on 26.04.2015.
 */


module.exports = function (){
    return marchrut = {

        curentPosition: 0,
        theEnd:false,
        next: function (){
          var marsh = [[0,0],[0,600],[100,600],[100,0]];
            this.curentPosition++;
            this.curentPosition=marsh.length-1?this.theEnd=true:this.theEnd=false;
            return this.curentPosition=marsh.length-1?marsh[marsh.length-1]:marsh[this.curentPosition];
        }
    };
};
