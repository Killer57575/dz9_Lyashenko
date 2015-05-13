/**
 * Created by Note on 25.04.2015.
 */
var Vector = require('./vector');
var world = require('./world');
var necroMarshrut = require('./necroMarshrut');
var configHeroes = require('./configHeroes');
var Human = require('./human');

module.exports = Necromant = function (name) {
    this.vector = new Vector(configHeroes.necroStartPoint[0], configHeroes.necroStartPoint[1], configHeroes.necroStartPoint[0], configHeroes.necroStartPoint[1]); // початкові координати Дракули
    this.regeneration = 0; // регенерація здоров'я за рахунок випитої крові
    this.name = name;
    this.health = Necromant.prototype.health * 2;
    this.atackDistance = Necromant.prototype.atackDistance*2;
    this.speed = Necromant.prototype.speed * 2;
    this.experience = Necromant.prototype.experience + 10;
    this.uvorot = Necromant.prototype.uvorot * 2;
    this.parir = Necromant.prototype.parir * 2;
    this.krit = Necromant.prototype.krit * 3;
    this.fightStrength = Necromant.prototype.fightStrength * 3;
    this.goToXY = configHeroes.necroStartPoint;
    this.onMarshrut = [0,0,true];

    this.moveTo = function () {
        var krok = Math.round(Math.random() * (this.speed * 20 - world.windStrength - world.obstacles - world.water * 5));
        var znakX;
        var znakY;
        var x = arguments[0];
        var y = arguments[1];
        var ok = !(isNaN(x)||isNaN(y)); //true коли дано х та у
        if (!((x>=0)&&(x<=world.maxX)&&(y>=0)&&(y<=world.maxY))){  //якщо ввели координати поза зоною
            ok = false;
        };
        if (ok){  // якщо ввели х у і вони нормальні
            if (this.onMarshrut[2]){  // якщо ми зійшли з маршрута то записуємо точку маршрута
                this.onMarshrut[0] = this.goToXY[0];
                this.onMarshrut[1] = this.goToXY[1];
                this.onMarshrut[2] = false;
            };
            this.goToXY[0] = x; // заміняємо точку до якої йдемо
            this.goToXY[1] = y;
        } else {if (!this.onMarshrut[2]){ // якщо не вводили координати переміщення і ми не на маршруті
            this.goToXY[0] = this.onMarshrut[0];  //відновити маршрут
            this.goToXY[1] = this.onMarshrut[1];
            this.onMarshrut[2]=true;
        };
        };
            this.vector.x1 = this.vector.x2; //продовжуємо рух з останньої точки
            this.vector.y1 = this.vector.y2;
            if ((necroMarshrut.necroCurentPosition == 0)&&(!ok)) {   //якщо в початковій точці та не дані координати взяти із маршрута наступну
                this.goToXY = necroMarshrut.necroNextXY();
            };

            if ((this.goToXY[0] - this.vector.x2) == 0) {
                znakX = 0; // якщо не можемо рухатись по координаті х
            } else if (this.goToXY[0] - this.vector.x2 > 0) {
                znakX = 1; //якщо рухаємось по координаті х вперед
                Number(this.vector.x2) + krok > this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 = Number(this.vector.x2) + krok;
            } else {
                znakX = -1; // якщо рухаємось по координаті х назад
                this.vector.x2 - krok < this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 -= krok;
            };
            if ((this.goToXY[1] - this.vector.y2) == 0) { //рух по координаті у
                znakY = 0;
            } else if (this.goToXY[1] - this.vector.y2 > 0) {
                znakY = 1;
                Number(this.vector.y2) + krok > this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 = Number(this.vector.y2) + krok;
            } else {
                znakY = -1;
                this.vector.y2 - krok < this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 -= krok;
            };

            if ((znakX == 0) && (znakY == 0) && (necroMarshrut.necroTheEnd)) { //якщо кінець маршрута вийти
                return;
            } else {
                if ((znakX == 0) && (znakY == 0)&&(!ok)){ //якщо не кінець і не вводились координати то взяти наступну точку маршрута
                    this.goToXY = necroMarshrut.necroNextXY();
                    this.moveTo();
                    return;
                };
            };

            console.log('Персонаж ' + this.name + ' перемістився в точку (' + this.vector.x2 + ',' + this.vector.y2 + ')');
            //console.log('Персонаж ' + this.name + ' перемістився по вектору (' + this.vector.x1 + ',' + this.vector.y1 + ',' + this.vector.x2 + ',' + this.vector.y2 + ')');
    };

    this.fight = function (secondHero) {
        if (this.vector.distanceTo(secondHero.vector)>this.atackDistance) {
            console.log(this.name + ' не може нанести удар по персонажу ' + secondHero.name);
            this.moveTo(secondHero.vector.x2, secondHero.vector.y2);
        } else {
            if (Math.random() <= secondHero.uvorot / 100) {
                console.log('Персонаж ' + secondHero.name + ' ухилився від атаки персонажа ' + this.name);
                secondHero.experience += 0.1;
                return;
            } else if (Math.random() <= secondHero.parir / 100) {
                console.log('Персонаж ' + secondHero.name + ' відбив атаку персонажа ' + this.name);
                secondHero.experience += 0.1;
                return;
            } else {
                Math.random() <= this.krit / 100 ? krit = 2 : krit = 1;
                var udar = Math.round(this.fightStrength * this.experience * this.speed * krit - secondHero.armour / 10);
                secondHero.health -= udar;
                this.regeneration = udar;
                this.health += this.regeneration;

                console.log(this.name + ' наніс удар силою ' + udar + 'од. персонажу ' + secondHero.name);
            };
            this.experience += 0.5;
        };

    };
};

