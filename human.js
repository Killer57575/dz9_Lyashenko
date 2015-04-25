/**
 * Created by Note on 25.04.2015.
 */
var Vector = require('./vector');
var world = require('./world');


   module.exports = function (name, age) {
        this.vector = new Vector(100, 100, 100, 100); //початкові координати Петі щоб розвести їх по різних кутах

        this.name = name;
        this.health = 1000 * age + 1;   //здоров'я
        this.speed = 1.2 - (age / 200);  //максимальна швидкість персонажа
        this.experience = 1 + (age / 10); //з кожною успішною атакою персонаж вчиться і прокачується
        this.uvorot = 1.5 * this.experience; //шанс ухиллитись від атаки
        this.parir = 2.5 * this.experience; //шанс відбити атаку
        this.krit = 3.5 * this.experience; //шанс нанести подвійний урон
        this.armour = 100 * this.experience; //броня
        this.fightStrength = 100; //сила удару

        this.moveTo = function () {
            this.vector.x1 = this.vector.x2; //продовжуємо рух з останньої точки
            this.vector.y1 = this.vector.y2;
            var krok = Math.round(Math.random() * (this.speed * 20 - world.windStrength - world.obstacles - world.water * 5));
            (Math.round(Math.random()) * (-1) < 0) ? this.vector.x2 -= krok : this.vector.x2 += krok;
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
            }
            ;

            console.log('Персонаж ' + this.name + ' перемістився в точку (' + this.vector.x2 + ',' + this.vector.y2 + ')');
            //console.log('Персонаж ' + this.name + ' перемістився по вектору (' + this.vector.x1 + ',' +this.vector.y1 + ',' + this.vector.x2 + ',' + this.vector.y2 + ')');
        };

        this.fight = function (object) {

            if (Math.random() <= object.uvorot / 100) {
                console.log('Персонаж ' + object.name + ' ухилився від атаки персонажа ' + this.name);
                return;
            } else if (Math.random() <= object.parir / 100) {
                console.log('Персонаж ' + object.name + ' відбив атаку персонажа ' + this.name);
                return;
            } else {
                Math.random() <= this.krit / 100 ? krit = 2 : krit = 1;
                object.health -= Math.round(this.fightStrength * this.experience * this.speed * krit - object.armour / 10);
                this.experience += 0.2;

                console.log(this.name + ' нанес удар силой ' + Math.round(this.fightStrength * (this.experience - 0.2) * this.speed * krit - object.armour / 10) + 'ед. персонажу ' + object.name);
            };

        };
   };