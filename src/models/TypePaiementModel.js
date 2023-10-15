const mongoose = require('mongoose');

var TypePaiementSchema = new mongoose.Schema({
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


TypePaiementSchema.set('timestamps', true);

const TypePaiementdb = mongoose.model('type_paiements', TypePaiementSchema);
module.exports = TypePaiementdb;

