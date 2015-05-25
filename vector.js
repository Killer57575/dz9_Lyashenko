/**
 * Created by Note on 25.04.2015.
 */

module.exports = function (x1,y1,x2,y2) {
    this.x1 = x1 || 0;
    this.y1 = y1 || 0;
    this.x2 = x2 || 0;
    this.y2 = y2 || 0;

    /*this.length = function (){
     return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
     };*/

    this.distanceTo = function(secondVector){
        return Math.sqrt((secondVector.x2-this.x2)*(secondVector.x2-this.x2)+(secondVector.y2-this.y2)*(secondVector.y2-this.y2));
    };

    this.peretin = function (secondVector) {
        var a1 = this.y1 - this.y2,
            b1 = this.x2 - this.x1,
            c1 = a1 * this.x1 + b1 * this.y1,
            a2 = secondVector.y1 - secondVector.y2,
            b2 = secondVector.x2 - secondVector.x1,
            c2 = a2 * secondVector.x1 + b2 * secondVector.y1;
        if (a1 * b2 - a2 * b1 == 0) {
            return ( (a1 * secondVector.x1 + b1 * secondVector.y1 == c1) && ((this.x1 - secondVector.x1) * (this.x2 - secondVector.x1) <= 0) && ((this.y1 - secondVector.y1) * (this.y2 - secondVector.y1) <= 0)) || ((a1 * secondVector.x2 + b1 * secondVector.y2 == c1) && ((this.x1 - secondVector.x2) * (this.x2 - secondVector.x2) <= 0) && ((this.y1 - secondVector.y2) * (this.y2 - secondVector.y2) <= 0));
        }
        var x = (b2 * c1 - c1 * b2) / (a1 * b2 - a2 * b1),
            y = (a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1);
        return ((this.x1 - x) * (this.x2 - x) <= 0) && ((this.y1 - y) * (this.y2 - y) <= 0) && ((secondVector.x1 - x) * (secondVector.x2 - x) <= 0) && ((secondVector.y1 - y) * (secondVector.y2 - y) <= 0);
    };
};