/**
 * Created by Note on 25.04.2015.
 */
var Vector = require('./vector');
var Human = require('./human');

module.exports = Necromant = function (name) {
    this.vector = new Vector(800,450,800,450); // початкові координати Дракули
    this.regeneration = 0; // регенерація здоров'я за рахунок випитої крові
    this.name = name;
    this.health = Necromant.prototype.health*2;
    this.speed = Necromant.prototype.speed*2;
    this.experience = Necromant.prototype.experience+10;
    this.uvorot = Necromant.prototype.uvorot*2;
    this.parir = Necromant.prototype.parir*2;
    this.krit = Necromant.prototype.krit*3;
    this.fightStrength = Necromant.prototype.fightStrength*3;

    this.fight = function (object) {

        if (Math.random()<=object.uvorot/100){
            console.log('Персонаж '+object.name+' ухилився від атаки персонажа '+this.name);
            return;
        } else if (Math.random()<=object.parir/100) {
            console.log('Персонаж '+object.name+' відбив атаку персонажа '+this.name);
            return;
        } else {
            Math.random() <= this.krit / 100 ? krit = 2 : krit = 1;
            object.health -= Math.round(this.fightStrength * this.experience * this.speed * krit-object.armour/10);
            this.regeneration = Math.round(this.fightStrength * this.experience * this.speed * krit-object.armour/10);
            this.health += this.regeneration;
            this.experience += 0.5;


            console.log(this.name + ' нанес удар силой ' + Math.round(this.fightStrength * (this.experience-0.5) * this.speed * krit-object.armour/10) + 'ед. персонажу ' + object.name);};

    };

};

