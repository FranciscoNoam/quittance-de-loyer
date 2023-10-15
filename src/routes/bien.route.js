const express = require("express");
const route = express.Router();


const cBien = require("../controllers/BienController");

route.get('/biens/:user', cBien.findAll);
route.get('/biens/locataire/:locataire/:user', cBien.findAllByLocataire);
route.get('/bien/:id', cBien.findById);

route.post('/bien/:user', cBien.create);
route.put('/bien/:id', cBien.update);
route.delete('/bien/:id', cBien.delete);

module.exports = route;