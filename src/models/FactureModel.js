const mongoose = require('mongoose');

var FactureSchema = new mongoose.Schema({
    ref:{
        type:String,
        require:true,
    },
    url_pdf:{
        type:String,
    },
    invoice_date:{
        type:Date,
        require:true
    },
    due_date:{
        type:Date,
        require:true
    },
    month_rental:{
        type:Date,
        require:true
    },
    montant:{
        type:mongoose.Schema.Types.ObjectId,
        type:Number,
        require:true
    },
    charge:{
        type:mongoose.Schema.Types.ObjectId,
        type:Number,
        default:0
    },
    totale_montant:{
        type:mongoose.Schema.Types.ObjectId,
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    locataire:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'locataires',
        require:true
    },
    bien:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'biens',
        require:true
    },
    type_paiement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'type_paiements',
        require:true
    }
});


FactureSchema.set('timestamps', true); // ajout created_at et upated_at
const Facturedb = mongoose.model('factures',FactureSchema);
module.exports = Facturedb;

