const express = require("express");
const route = express.Router();


const cFacture = require("../controllers/FactureController");

route.get('/factures/:user', cFacture.findAll);
route.get('/facture/:id', cFacture.findById);

route.post('/facture/:user', cFacture.create);
route.delete('/facture/:id', cFacture.delete);

module.exports = route;