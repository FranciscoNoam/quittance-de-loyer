const express = require("express");
const route = express.Router();


const cLocataire = require("../controllers/LocataireController");


route.get('/locataires/:user', cLocataire.findAll);
route.get('/locataire/:id', cLocataire.findById);

route.post('/locataire/:user', cLocataire.create);
route.put('/locataire/:id', cLocataire.update);
route.delete('/locataire/:id', cLocataire.delete);
module.exports = route;