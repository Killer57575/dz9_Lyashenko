/**
 * Created by Ляшенко on 09.04.2015.
 */
var Human = require('./human');
var Necromant = require('./necro');
var world = require('./world');
//var server = require('./server')();



var peter = new Human('Петя',25);

Necromant.prototype = peter;         //наслідуємось від петі
Necromant.constructor = Necromant;

var necro = new Necromant('Дракула'); // створюємо дракулу, покращеного петю


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
peter.moveTo();
peter.moveTo();
peter.moveTo();
peter.moveTo();
peter.moveTo();

