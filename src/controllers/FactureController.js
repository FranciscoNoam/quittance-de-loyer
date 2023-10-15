require("dotenv").config();

const moment = require("moment");
moment.suppressDeprecationWarnings = true;

//==========================  IMPORTATION Model ================================
var Facturedb = require("../models/FactureModel");

exports.findAll = (req, res) => {
    try {
        Facturedb.find({ user: req.params.user })
            .populate({ path: 'bien' })
            .populate({ path: 'locataire' })
            .populate({ path: 'type_paiement' })
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
        Facturedb.findById(req.params.id)
            .populate({ path: 'bien' })
            .populate({ path: 'locataire' })
            .populate({ path: 'type_paiement' })
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


exports.findById = (id) => {

    return new Promise((resolve, reject) => {
        try {
            Facturedb.findById(id)
                .populate({ path: 'bien' })
                .populate({ path: 'user' })
                .populate({ path: 'locataire' })
                .populate({ path: 'type_paiement' })
                .then((data) => {
                    
                    const tmp = {
                        ref: data.ref,
                        invoice_date: moment(data.invoice_date).format("DD MMMM YYYY"),
                        due_date: moment(data.due_date).format("DD MMMM YYYY"),
                        month_rental: moment(data.month_rental).format("MMMM YYYY"),
                        montant: data.montant,
                        user: data.user,
                        charge: data.charge,
                        totale_montant: data.totale_montant,
                        locataire: data.locataire,
                        bien: data.bien,
                        type_paiement: data.type_paiement
                    };

                    resolve(tmp);
                })
                .catch((err) => {
                    reject({
                        status: 400,
                        message: "Erreur"
                    });
                });
        } catch (error) {
            reject({ status: 400, message: "Erreur de connexion" });
        }
    });

};


exports.create = async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        if (req.body.ref && req.body.invoice_date && req.body.due_date && req.body.month_rental && req.body.pu && req.body.locataire && req.body.bien && req.body.type_paiement) {

            const list = await Facturedb.find({ ref: req.body.ref, user: req.params.user });
            if (list.length == 0) {
                const new_ = {
                    ref: req.body.ref,
                    url_pdf: "",
                    invoice_date: req.body.invoice_date,
                    due_date: req.body.due_date,
                    month_rental: req.body.month_rental,
                    montant: Number(req.body.pu) + Number(req.body.charge),
                    totale_montant: Number(req.body.pu) + Number(req.body.charge) + Number(req.body.tva),
                    type_paiement: req.body.type_paiement,
                    bien: req.body.bien,
                    locataire: req.body.locataire,
                    user: req.params.user
                };

                const newCli = new Facturedb(new_);
                newCli.save((err, docs) => {

                    if (err) {
                        console.log(err.message);
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


exports.delete = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        if (req.params.id) {
            Facturedb.findByIdAndDelete(req.params.id)
                .then((data) => {
                    if (data) {
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

