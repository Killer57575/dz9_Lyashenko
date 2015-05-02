/**
 * Created by Note on 25.04.2015.
 */
var world ={
        maxX:800, //максимальна ширина де можуть рухатись персонажі
        maxY:600,  // -//- висота
        windStrength: 3, //сила вітру
        obstacles: 1, //інтенсивність перешкод (наскільки важко рухатись на даній ділянці)
        water: false, //чи є водяна перешкода

        refresh: function () {
            this.windStrength = Math.round(Math.random()*3+Math.random()*5+1);
            this.obstacles = Math.round(Math.random()*2+Math.random()*3+1);
            (Math.random()*100<=10)?this.water=true:this.water=false; // 10% що попадеться вода
        }

    };

module.exports = world;