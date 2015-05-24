/**
 * Created by Note on 21.05.2015.
 */
var mongoose = require('mongoose');


module.exports = (function() {
    var Schema = mongoose.Schema;
    var NecroSchema = new Schema({
        _id: Number,
        regeneration: Number,
        vector: JSON,
        name: {type:String,unique:true},
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
    }, {collection: 'Necroes'});

    mongoose.model('necroModel', NecroSchema);
})();