const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Table user (authentification des employées)


var LocataireSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require:true
    },
    last_name: {
        type: String,
        require:true
    },
    phone: {
        type: String,
        require:true
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    actived: {
        type: Boolean,
        require: true,
        default: true,
    },
    bien:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'biens',
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    }
});

const Locatairedb = mongoose.model("locataires", LocataireSchema);
module.exports = Locatairedb;
