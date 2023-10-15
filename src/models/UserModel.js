const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Table user (authentification des employées)


var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    signature_electronic: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        require: true,
    },
    token: {
        type: String,
    },
    expiration_date: {
        type: String,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    }
});

UserSchema.set("timestamps", true);
UserSchema.plugin(passportLocalMongoose);

const Userdb = mongoose.model("users", UserSchema);
module.exports = Userdb;
