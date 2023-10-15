const mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    identifiant: {
        type: String,
        required: true,
        unique: true
    }
});


RoleSchema.set('timestamps', true);

const Roledb = mongoose.model('roles', RoleSchema);
module.exports = Roledb;

