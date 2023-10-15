require("dotenv").config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

//==========================  IMPORTATION Model ================================
var Userdb = require("../models/UserModel");
var Roledb = require("../models/RoleModel");


exports.userConnected = (req, res) => {
    try {
        Userdb.findById(req.user._id)
            .select({
                first_name: 1,
                last_name: 1,
                phone: 1,
                address: 1,
                username: 1,
                signature_electronic: 1,
                country: 1,
                role: 1,
                language: 1,
            })
            .exec((err, usr) => {
                if (!err) {
                    res.send(usr);
                }
            });
    } catch (error) {
        res.send({ status: 400, message: "Erreur de connexion" });
    }
};

exports.findById = (req, res) => {
    try {
        Userdb.findById(req.params.id)
            .then((data) => {
                if (!data) {
                    res.send({ status: 400, message: "Client non trouvé" });
                } else {
                    res.send(data);
                }
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

            Userdb.findById(id)
                .then((data) => {
                    if (!data) {
                        reject({ status: 400, message: "Client non trouvé" });
                    } else {
                        resolve(data);
                    }
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
        if (req.body.firstname && req.body.lastname && req.body.address && req.body.username && req.body.password && req.body.confirmpassword) {
            if (req.body.password == req.body.confirmpassword) {
                const role = await Roledb.findOne({ description: "isClient" });
                var pass = await bcrypt.hash(req.body.password, 10);

                Userdb.exists({ username: req.body.username })
                    .then((verify) => {
                        if (verify) {
                            res.redirect("/register?error=true");
                            // res.send({ status: 400, message: "E-mail existe déjà" });
                        } else {
                            const new_ = {
                                first_name: req.body.firstname,
                                last_name: req.body.lastname,
                                phone: req.body.phone,
                                address: req.body.address,
                                username: req.body.username,
                                signature_electronic: null,
                                password: pass,
                                role: role._id,
                                token: null,
                                expiration_date: null,
                                status: true
                            };

                            const newCli = new Userdb(new_);
                            newCli.save((err, docs) => {
                                if (err) {
                                    res.redirect("/register?error=true");
                                    // res.send({ status: 400, message: err.message });
                                } else {
                                    req.login(docs, (err) => {
                                        if (err) {
                                            res.redirect("/login?error=true");
                                        } else {
                                            res.redirect("/");
                                        }
                                    });
                                    // res.send({ status: 200, data: docs, message: "Succès !" });
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        res.redirect("/register?error=true");
                        // reject({ status: 400, message: err.message });
                    });
            } else {
                res.redirect("/register?error=true");
                // res.send({ status: 400, message: "Mot de passe invalide" });
            }
        } else {
            res.redirect("/register?error=true");
            // res.send({ status: 400, message: 'Donnée invalide' });
        }

    } catch (error) {
        console.log(error.message);

        res.redirect("/register?error=true");
        // res.send({ status: 400, message: "Erreur de connexion" });
    }
};

exports.update = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        if (req.params.id && req.body.firstname && req.body.lastname && req.body.address && req.body.username) {
            const dataUpdated = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                phone: req.body.phone,
                address: req.body.address,
                username: req.body.username,
                phone: null,
                signature_electronic: null
            };

            Userdb.findByIdAndUpdate(
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
            Userdb.findByIdAndDelete(req.params.id)
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


exports.reset_password = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        var $this = this;
        if (req.params.id && req.body.lastpassword && req.body.newpassword && req.body.confirmpassword) {

            if (req.body.newpassword === req.body.confirmpassword) {

                var new_pass = await bcrypt.hash(req.body.newpassword, 10);
                const dataUpdated = { password: new_pass };

                $this.findById(id).then((cli) => {

                    bcrypt.compare(cli.password, req.body.lastpassword, function (err, res) {
                        if (err) {
                            res.send({ status: 400, message: "L'ancien mot de passe est incorrecte!" });
                        } else {

                            Userdb.findByIdAndUpdate(
                                req.params.id,
                                dataUpdated,
                                { upsert: true },
                                function (err, doc) {
                                    if (err) {
                                        res.send({ status: 400, message: "Erreur" });
                                    } else {
                                        resolve({ status: 200, message: "Mot de passe modifié" });
                                    }
                                }
                            );
                        }

                    });

                });

            } else {
                res.send({ status: 400, message: "Mot de passe invalide" });
            }

        } else {
            res.send({ status: 400, message: "Donnée invalide" });
        }
    } catch (error) {
        res.send({ status: 400, message: "Erreur de connexion" });
    }
};

exports.update_password_forgot = (id, new_mdp, confirm_mdp) => {
    var $this = this;
    return new Promise(async (resolve, reject) => {
        try {

            if (new_mdp != confirm_mdp) {
                reject({ status: 400, message: "Mot de passe incorrecte!" });
            } else {
                var new_pass = await bcrypt.hash(new_mdp, 10);
                $this.findById(id).then((agent) => {

                    const dataUpdated = { password: new_pass };
                    Userdb.findByIdAndUpdate(
                        id,
                        dataUpdated,
                        { upsert: true },
                        function (err, doc) {
                            if (err) {
                                reject({ status: 400, message: "Erreur" });
                            } else {
                                resolve({
                                    status: 200,
                                    message: "Mot de passe modifié",
                                });
                            }
                        }
                    );

                }); // end findById
            } // end else
        } catch (error) {

            reject({ status: 400, message: "Erreur de connexion" });
        }
    });
};


exports.verify_password_valid = (password_user_connected, password_input) => {
    return new Promise((resolve, reject) => {
        var boll = false;

        bcrypt.compare(password_input, password_user_connected, function (err, res) {
            if (err) {
                boll = false;
                reject(boll);
            } else if (res === false) {
                boll = false;
                reject(boll);
            } else {
                boll = true;
                resolve(boll);
            }

        });
    });
};


exports.sendMailForgot = (destinataire_mail, copy_mail, token_) => {
    return new Promise((resolve, reject) => {
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
            to: destinataire_mail,
            cc: process.env.SMTP_USERNAME,
            subject: "Réinitialisez le mot de passe sur " + process.env.SMTP_NAME,
            html: "Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe: " + process.env.URL + "/location&forgot&password&token_" + token_
        };
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                reject({ status: 400, message: err.message });
            } else {
                resolve({ status: 200, message: 'Envoyé !', data: info.response });
            }
        });
    });
};


exports.forgot_password = (email_user_forgot) => {
    var $this = this;

    return new Promise(async (resolve, reject) => {
        try {
            let token_ = crypto.randomBytes(20).toString('hex');
            const tmp = await Userdb.findOne({ email: email_user_forgot, status: true });
            if (tmp) {
                let date_now = new Date();
                date_now.setMinutes(date_now.getMinutes() + 4);
                const dataUpdated = { token: token_, expiration_date: date_now };

                Userdb.findByIdAndUpdate(
                    tmp._id,
                    dataUpdated,
                    { upsert: true },
                    function (err, doc) {
                        if (err) {
                            reject({ status: 400, message: "Erreur de connexion" });
                        } else {
                            $this.sendMailForgot(email_user_forgot, null, token_).then((sender) => {
                                resolve({ status: 200, message: "Succès", token: token_ });
                            }).catch((err) => {
                                reject(err)
                            });

                        }
                    });

            } else {
                reject({ status: 400, message: "Donnée invalide" });
            }
        } catch (error) {
            reject({ status: 400, message: "Erreur de connexion" });
        }

    });
};


exports.page_forgot_password = (req, res) => {
    res.render("forgot/forgot", { title: "Mot de passe oublié" });
};


exports.sendMail_forgot_password = async (req, res) => {
    var $this = this;
    if (req.body.email) {
        const tmp = await Userdb.findOne({ email: req.body.email });
        if (tmp) {
            $this.forgot_password(req.body.email).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send({ status: 400, message: "Donnée invalide" });
            });
        } else {
            res.send({ status: 400, message: "Erreur de connexion" });
        }
    } else {
        res.send({ status: 400, message: "Donnée invalide" });
    }
};

exports.redirection_page_forgot_password_valid_token = async (req, res) => {
    try {
        var date_now = new Date();
        if (req.params.token) {

            const tmp = await Userdb.find({ token: req.params.token });

            if (tmp.length == 1) {
                const data = tmp[0];
                let dte_exp = new Date(data.expiration_date);

                if (data.expiration_date) {
                    if (dte_exp.getTime() >= date_now.getTime()) {

                        res.status(200).render("forgot/change", { title: "Changer mot de passe", indice: data._id, token: data.token })

                    } else {

                        res.status(404).render("404.ejs");

                    }
                } else {

                    res.status(404).render("404.ejs");

                }
            } else {

                res.status(404).render("404.ejs");

            }
        } else {

            res.status(404).render("404.ejs");

        }
    } catch (error) {

        res.status(404).render("404.ejs");

    }
};

exports.api_change_forgot_password_valid_token = async (req, res) => {
    var $this = this;

    try {
        if (req.body.token) {

            if (req.body.password != null && req.body.confirm_password != null) {

                if (req.body.password == req.body.confirm_password) {

                    const tmp = await Userdb.find({ token: req.body.token });

                    if (tmp.length == 1) {
                        const data = tmp[0];
                        $this.update_password_forgot(data._id, req.body.password, req.body.confirm_password).then((result) => {
                            res.send(result);
                        }).catch((err) => {
                            res.send(err);
                        });

                    } else {

                        res.send({ status: 400, message: "Donnée invalide" });

                    }

                } else {

                    res.send({ status: 400, message: "Mot de passe invalide" });

                }
            } else {

                res.send({ status: 400, message: "Donnée invalide" });

            }

        } else {

            res.send({ status: 400, message: "Donnée invalide" });

        }
    } catch (error) {

        res.send({ status: 400, message: "Erreur de connexion" });

    }
};
