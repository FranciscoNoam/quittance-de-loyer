const mongoose = require('mongoose');

var BienSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String
    },
    address:{
        type:String,
    },
    surface:{
        type:String,
    },
    loyer:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    }
});


BienSchema.set('timestamps', true); // ajout created_at et upated_at
const Biendb = mongoose.model('biens',BienSchema);
module.exports = Biendb;

