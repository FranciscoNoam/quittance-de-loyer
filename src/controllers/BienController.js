require("dotenv").config();

//==========================  IMPORTATION Model ================================
var Biendb = require("../models/BienModel");
const Facturedb = require("../models/FactureModel");
const Locatairedb = require("../models/LocataireModel");

exports.findAll = (req, res) => {
    try {
        Biendb.find({ user: req.params.user })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send({
                    status: 400,
                    message: "Erreur"
                });
            });
    } catch (error) {
        reject({ status: 400, message: "Erreur de connexion" });
    }
};


exports.findAllByLocataire = (req, res) => {
    try {
        Biendb.find({ locataire: req.params.locataire, user: req.params.user })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send({
                    status: 400,
                    message: "Erreur"
                });
            });
    } catch (error) {
        reject({ status: 400, message: "Erreur de connexion" });
    }
};


exports.findById = (req, res) => {
    try {
        Biendb.findById(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send({
                    status: 400,
                    message: "Erreur"
                });
            });
    } catch (error) {
        reject({ status: 400, message: "Erreur de connexion" });
    }
};



exports.create = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        if (req.body.name && req.body.address && req.body.surface && req.body.loyer) {

            const list = await Biendb.find({ name: req.body.name, user: req.params.user });
            if (list.length == 0) {
                const new_ = {
                    name: req.body.name,
                    description: null,
                    address: req.body.address,
                    surface: req.body.surface,
                    loyer: req.body.loyer,
                    user: req.params.user
                };

                const newCli = new Biendb(new_);
                newCli.save((err, docs) => {

                    if (err) {
                        res.send({ status: 400, message: "Erreur lors d'enregistrement de donnée" });
                    } else {
                        res.send({ status: 200, data: docs, message: "Succès !" });
                    }
                });
            } else {
                res.send({ status: 400, message: 'Appartement existe déjà' });
            }

        } else {
            res.send({ status: 400, message: 'Donnée invalide' });
        }

    } catch (error) {
        console.log(error.message);
        res.send({ status: 400, message: "Erreur de connexion" });
    }
};


exports.update = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        if (req.body.name && req.body.address && req.body.surface && req.body.loyer) {
            const dataUpdated = {
                name: req.body.name,
                description: null,
                address: req.body.address,
                surface: req.body.surface,
                loyer: req.body.loyer
            };

            Biendb.findByIdAndUpdate(
                req.params.id,
                dataUpdated,
                { upsert: true },
                function (err, doc) {
                    if (err) {
                        res.send({ status: 400, message: "Erreur!" });
                    } else {
                        res.send({ status: 200, message: "Succès" });
                    }
                }
            );
        } else {
            res.send({ status: 400, message: 'Donnée invalide' });
        }

    } catch (error) {
        res.send({ status: 400, message: "Erreur de connexion" });
    }
};

exports.delete = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        if (req.params.id) {
            Biendb.findByIdAndDelete(req.params.id)
                .then(async (data) => {
                    if (data) {
                        console.log(data);
                        await Locatairedb.deleteMany({ bien: req.params.id });
                        await Facturedb.deleteMany({ bien: req.params.id });
                        res.send({ status: 200, message: "Succès" });
                    } else {
                        res.send({ status: 400, message: "Erreur!" });
                    }
                })
                .catch((err) => {
                    res.send({ status: 400, message: err.message });
                });
        } else {
            res.send({ status: 400, message: "Erreur de connexion" });
        }
    } catch (error) {
        res.send({ status: 400, message: "Erreur de connexion" });
    }
};

