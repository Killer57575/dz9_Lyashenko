/**
 * Created by Ляшенко on 09.04.2015.
 */
var Human = require('./human');
var Necromant = require('./necro');
//var marshrut = require('./marshrut');
//var world = require('./world');
//var server = require('./server')();


var petya = new Human("Петя",25);
Necromant.prototype = petya;         //наслідуємось від петі
Necromant.constructor = Necromant;
var necro = new Necromant("Дракула");


for (var i=100;i>0;i--){
    petya.moveTo();
};

console.dir(petya);
console.dir(necro);
for (var j=100;j>0;j--){
    necro.moveTo();
};




//моделювання бою
/*for (var i= 100000; i>=0; i--){
    if ((peter.health<=0)||(necro.health<=0)){
        console.log('Пройшло ' + (100001-i) + ' ходів.');
        necro.health<=0?console.log('Переміг ' + peter.name):console.log('Переміг ' + necro.name);
        break;} else {
    peter.moveTo(); //хаотично переміщаємось
    if (peter.vector.peretin(necro.vector)){ //чи вектор руху Петі перетнув вектор руху Дракули
        peter.fight(necro); //атака
        necro.fight(peter); //здача
    };
    world.refresh();
    necro.moveTo();
    if (necro.vector.peretin(peter.vector)){
        necro.fight(peter);
        peter.fight(necro);
    };
        world.refresh();

}};*/


/*var v1 = new Vector (1,0,3,2);
var v2 = new Vector (0,0,2,2);

console.log(v1.distanceTo(v2));
*/

