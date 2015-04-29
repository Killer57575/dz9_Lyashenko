/**
 * Created by Note on 25.04.2015.
 */
var Vector = require('./vector');
var world = require('./world');
var marshrut = require('./marshrut');


   module.exports = function (name, age) {
        this.vector = new Vector(0, 0, 0, 0); //початкові координати Петі щоб розвести їх по різних кутах

        this.name = name;
        this.health = 1000 * age + 1;   //здоров'я
        this.speed = 1.2 - (age / 200);  //максимальна швидкість персонажа
        this.experience = 1 + (age / 10); //з кожною успішною атакою персонаж вчиться і прокачується
        this.uvorot = 1.5 * this.experience; //шанс ухиллитись від атаки
        this.parir = 2.5 * this.experience; //шанс відбити атаку
        this.krit = 3.5 * this.experience; //шанс нанести подвійний урон
        this.armour = 100 * this.experience; //броня
        this.fightStrength = 100; //сила удару
        this.goToXY = [0,0];

        this.moveTo = function () {
            this.vector.x1 = this.vector.x2; //продовжуємо рух з останньої точки
            this.vector.y1 = this.vector.y2;

            var krok = Math.round(Math.random() * (this.speed * 20 - world.windStrength - world.obstacles - world.water * 5));
            //var obj = {n:[0,0]}; //gjxfnrgfsddfsfs
            var znakX;
            var znakY;

            if ((znakX != 0) && (znakY != 0)&&(marshrut.theEnd==false)) {

                if (marshrut.curentPosition == 0) {
                    this.goToXY = marshrut.nextXY()
                };

                if (this.goToXY[0] - this.vector.x2 == 0) {
                    znakX = 0;
                } else if (this.goToXY[0] - this.vector.x2 > 0) {
                    znakX = 1;
                    this.vector.x2 + krok > this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 += krok;
                } else {
                    znakX = -1;
                    this.vector.x2 - krok < this.goToXY[0] ? this.vector.x2 = this.goToXY[0] : this.vector.x2 -= krok;
                }
                ;

                if (this.goToXY[1] - this.vector.y2 == 0) {
                    znakY = 0;
                } else if (this.goToXY[1] - this.vector.y2 > 0) {
                    znakY = 1;
                    this.vector.y2 + krok > this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 += krok;
                } else {
                    znakY = -1;
                    this.vector.y2 - krok < this.goToXY[1] ? this.vector.y2 = this.goToXY[1] : this.vector.y2 -= krok;
                }
                ;


                if ((znakX == 0) && (znakY == 0)) {
                    this.goToXY = marshrut.nextXY();
                }
                ;


                /*(Math.round(Math.random()) * (-1) < 0) ? this.vector.x2 -= krok : this.vector.x2 += krok;
                 (Math.round(Math.random()) * (-1) < 0) ? this.vector.y2 -= krok : this.vector.y2 += krok;

                 if (this.vector.x2 < 0) {
                 this.vector.x2 = 0
                 }
                 ; //якщо вийшли за межі
                 if (this.vector.y2 < 0) {
                 this.vector.y2 = 0
                 }
                 ;
                 if (this.vector.x2 >= world.maxX) {
                 this.vector.x2 = world.maxX
                 }
                 ;
                 if (this.vector.y2 >= world.maxY) {
                 this.vector.y2 = world.maxY
                 };*/

                //console.log('Персонаж ' + this.name + ' перемістився в точку (' + this.vector.x2 + ',' + this.vector.y2 + ')');
                console.log('Персонаж ' + this.name + ' перемістився по вектору (' + this.vector.x1 + ',' + this.vector.y1 + ',' + this.vector.x2 + ',' + this.vector.y2 + ')');


                /*console.log(znakX);
                console.log(znakY);
                console.log(krok);
                console.log(marshrut.curentPosition);
                console.log(marshrut.theEnd);
                console.log(this.goToXY);*/
            };
        };

        this.fight = function (secondHero) {

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
                console.log(this.name + ' нанес удар силой ' + udar + 'ед. персонажу ' + secondHero.name);
                this.experience += 0.2;
            };

        };
   };