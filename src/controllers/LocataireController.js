require("dotenv").config();
const nodemailer = require('nodemailer');

const puppeteer = require('puppeteer');

const moment = require("moment");
moment.suppressDeprecationWarnings = true;

//==========================  IMPORTATION Model ================================
var Locatairedb = require("../models/LocataireModel");
const Facturedb = require("../models/FactureModel");

exports.findAll = (req, res) => {
    try {
        Locatairedb.find({ user: req.params.user })
            .populate({ path: 'bien' })
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
        Locatairedb.findById(req.params.id)
            .populate({ path: 'bien' })
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
        if (req.body.appartement && req.body.firstname && req.body.lastname && req.body.address && req.body.phone && req.body.email) {

            const list = await Locatairedb.find({ first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email, user: req.params.user });
            if (list.length == 0) {
                const new_ = {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    bien: req.body.appartement,
                    actived: true,
                    user: req.params.user
                };

                const newCli = new Locatairedb(new_);
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


exports.update = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        if (req.body.appartement && req.body.firstname && req.body.lastname && req.body.address && req.body.phone && req.body.email) {
            const dataUpdated = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                address: req.body.address,
                bien: req.body.appartement,
                phone: req.body.phone,
                email: req.body.email
            };

            Locatairedb.findByIdAndUpdate(
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
            Locatairedb.findByIdAndDelete(req.params.id)
                .then(async (data) => {
                    if (data) {
                        const dte = await Facturedb.deleteMany({ locataire: req.params.id });
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



exports.sendMailLocataire = async (req, res) => {
    const htmlContent = req.body.htmlContent;

    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf();

    await browser.close();
    const facture = await Facturedb.findById(req.params.id);

    Locatairedb.findById(facture.locataire).then((result) => {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_TOKEN
            }
        });
        var mailOption = {
            from: process.env.SMTP_NAME + "<" + process.env.SMTP_USERNAME + ">",
            to: result.email,
            cc: req.user.username,
            subject: "quittance de loyer pour " + moment(facture.month_rental).format("MMMM YYYY"),
            text: "Vous retouverai ci-joint le quittance de loyer pour le mois de Octobre",
            attachments: [{
                filename: 'quittance de loyer pour ' + moment(facture.month_rental).format("MMMM YYYY") + ' .pdf',
                content: pdfBuffer,
            }],
        };
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                res.send({ status: 400, message: err.message });
            } else {

                Locatairedb.findByIdAndUpdate(req.params.locataire, { url_pdf: req.body.htmlContent })
                res.send({ status: 200, message: 'Mail envoyé à locataire: ' + result.first_name + " " + result.last_name, data: info.response });
            }
        });
    }).catch((err) => {
        console.log(err.message);
        res.send({ status: 400, message: err.message });
    });

};