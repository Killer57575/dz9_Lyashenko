/**
 * Created by Note on 25.04.2015.
 */
var Vector = require('./vector');
var world = require('./world');
var marshrut = require('./marshrut');


   module.exports = function (name, age) {
        this.vector = new Vector(0, 0, 0, 0); //початкові координати Петі щоб розвести їх по різних кутах
        //ToDo винести початкові налаштування в окремий модуль

        this.name = name;
        this.health = 1000 * age + 1;   //здоров'я
        this.atackDistance = 5;
        this.speed = 1.2 - (age / 200);  //максимальна швидкість персонажа
        this.experience = 1 + (age / 10); //з кожною успішною атакою персонаж вчиться і прокачується
        this.uvorot = 1.5 * this.experience; //шанс ухиллитись від атаки
        this.parir = 2.5 * this.experience; //шанс відбити атаку
        this.krit = 3.5 * this.experience; //шанс нанести подвійний урон
        this.armour = 100 * this.experience; //броня
        this.fightStrength = 100; //сила удару
        this.goToXY = [0,0];

        this.moveTo = function () {
            var krok = Math.round(Math.random() * (this.speed * 20 - world.windStrength - world.obstacles - world.water * 5));
            var znakX;
            var znakY;

            if ((znakX != 0) && (znakY != 0)) {

                this.vector.x1 = this.vector.x2; //продовжуємо рух з останньої точки
                this.vector.y1 = this.vector.y2;
                if (marshrut.curentPosition == 0) {   //якщо в початковій точці взяти із маршрута наступну
                    this.goToXY = marshrut.nextXY()
                };

                if (this.goToXY[0] - this.vector.x2 == 0) {
                    znakX = 0; // якщо не можемо рухатись по координаті х
                } else if (this.goToXY[0] - this.vector.x2 > 0) {
                    znakX = 1; //якщо рухаємось по координаті х вперед
                    this.vector.x2 + krok > this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 += krok;
                } else {
                    znakX = -1; // якщо рухаємось по координаті х назад
                    this.vector.x2 - krok < this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 -= krok;
                };

                if (this.goToXY[1] - this.vector.y2 == 0) { //рух по координаті у
                    znakY = 0;
                } else if (this.goToXY[1] - this.vector.y2 > 0) {
                    znakY = 1;
                    this.vector.y2 + krok > this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 += krok;
                } else {
                    znakY = -1;
                    this.vector.y2 - krok < this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 -= krok;
                };

                if ((znakX == 0) && (znakY == 0)&&(marshrut.theEnd==true)) { //якщо кінець маршрута вийти
                    return;
                } else {
                    this.goToXY = marshrut.nextXY();
                };

                console.log('Персонаж ' + this.name + ' перемістився в точку (' + this.vector.x2 + ',' + this.vector.y2 + ')');
                //console.log('Персонаж ' + this.name + ' перемістився по вектору (' + this.vector.x1 + ',' + this.vector.y1 + ',' + this.vector.x2 + ',' + this.vector.y2 + ')');
            };
        };

        this.fight = function (secondHero) {
            if (this.vector.distanceTo(secondHero.vector)){
            if (Math.random() <= secondHero.uvorot / 100) {
                console.log('Персонаж ' + secondHero.name + ' ухилився від атаки персонажа ' + this.name);
                secondHero.experience += 0.1;
                return;
            } else if (Math.random() <= secondHero.parir / 100) {
                console.log('Персонаж ' + secondHero.name + ' відбив атаку персонажа ' + this.name);
                secondHero.experience += 0.1;
                return;
            } else {
                var udar = Math.round(this.fightStrength * this.experience * this.speed * krit - secondHero.armour / 10);
                Math.random() <= this.krit / 100 ? krit = 2 : krit = 1;
                secondHero.health -= udar;
                console.log(this.name + ' наніс удар силою ' + udar + 'од. персонажу ' + secondHero.name);
                this.experience += 0.2;
            };} else {
                console.log(this.name + 'не може нанести удар по персонажу ' + secondHero.name);
            };

        };
   };