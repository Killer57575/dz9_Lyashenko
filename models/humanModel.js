/**
 * Created by Note on 21.05.2015.
 */
var mongoose = require('mongoose');

module.exports = (function() {
    var Schema = mongoose.Schema;
    var HumanSchema = new Schema({
        _id:Number,
        vector: JSON,
        name: {type:String,unique:true},
        age: Number,
        health: Number,
        atackDistance:Number,
        speed:Number,
        experience:Number,
        uvorot:Number,
        parir:Number,
        krit:Number,
        armour:Number,
        fightStrength:Number,
        goToXY:Array,
        onMarshrut:Array,
        marshrutInfo: JSON
    }, {collection: 'Humans'});

    mongoose.model('humanModel', HumanSchema);
})();