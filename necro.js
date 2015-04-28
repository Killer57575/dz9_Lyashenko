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

    this.fight = function (secondHero) {

        if (Math.random()<=secondHero.uvorot/100){
            console.log('Персонаж '+secondHero.name+' ухилився від атаки персонажа '+this.name);
            secondHero.experience += 0.1;
            return;
        } else if (Math.random()<=secondHero.parir/100) {
            console.log('Персонаж '+secondHero.name+' відбив атаку персонажа '+this.name);
            secondHero.experience += 0.1;
            return;
        } else {
            var udar = Math.round(this.fightStrength * this.experience * this.speed * krit-secondHero.armour/10);
            Math.random() <= this.krit / 100 ? krit = 2 : krit = 1;
            secondHero.health -= udar;
            this.regeneration = udar;
            this.health += this.regeneration;

            console.log(this.name + ' нанес удар силой ' + udar + 'ед. персонажу ' + secondHero.name);};
            this.experience += 0.5;
    };

};

