const obfuscator = require('javascript-obfuscator');
var path = require("path");
const ejs = require("ejs");
require("dotenv").config();
const moment = require("moment");
moment.suppressDeprecationWarnings = true;


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const server = require("http").createServer(app);
// -------------------------------------

// -------------------------------------

const PORT = process.env.PORT || 3389;


const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.set("views", "./views");
app.set("view engine", "ejs");

//================================== URL Import CONTROLLER ===================================

const cUser = require("./src/controllers/UserController");
const cLocataire = require("./src/controllers/LocataireController");
const cFacture = require("./src/controllers/FactureController");

const cEncrypte = require('./src/controllers/EncryptFileController');


const Userdb = require("./src/models/UserModel");
const TypePaiementdb = require("./src/models/TypePaiementModel");


//================================ IMPORT ROUTER ET SERVICES ================================



app.use(
    require("express-session")({
        secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);


const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local");
const connectEnsureLogin = require("connect-ensure-login"); // authorization

app.use(passport.initialize());
app.use(passport.session());
passport.use(Userdb.createStrategy());
passport.serializeUser(Userdb.serializeUser());
passport.deserializeUser(Userdb.deserializeUser());

// ====================================== IMPORTATION ================================

const upload = require("express-fileupload");
app.use(upload());
app.use(express.json());

// ------------------------------------------------------
app.use("/style/js", express.static("public/dist/obfuscated_js"));
// ------------------------------------------------------

app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static("public/css"));
app.use("/scss", express.static("public/scss"));
app.use("/js", express.static("public/js"));
app.use("/js", express.static("src/scripts"));
app.use("/img", express.static("public/img"));
app.use("/example-data-file", express.static("Excel_example"));
app.use("/fonts", express.static("public/fonts"));
app.use("/css", express.static("assets/css"));
app.use("/svg", express.static("assets/svg"));
app.use("/img", express.static("assets/img"));
app.use("/sound", express.static("assets/sound"));
app.use("/vendor", express.static("assets/vendor"));
app.use("/jsmb", express.static("public/mbisscroll"));

// ================================ CONNECTION DATABASE =========================
const connectDB = require("./src/database/connection");
connectDB();

app.use("/", require("./src/routes/locataire.route"));
app.use("/", require("./src/routes/bien.route"));
app.use("/", require("./src/routes/facture.route"));

const redirectPage = require("./src/render");

// ================================ AUTHENTIFICATION D'UTILISATEUR =========================
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    Userdb.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new localStrategy(function (email, password, done) {
        Userdb.findOne({ username: email, status: true })
            .populate({
                path: "role",
            })
            .exec((err, user) => {
                if (err) {
                    return done("Your connection is unstable, please check if you are connected");
                }
                if (!user) {
                    return done(null, false, { message: "Identification incorrecte" });
                }
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) {
                        return done(err);
                    } else if (res === false) {
                        return done(null, false, { message: "Mot de passe incorrecte" });
                    } else {
                        return done(null, user);
                    }
                });
            });
    })
);

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

//================================= API AUTHENTIFICATION ==========================

app.get(
    "/76546587GFsdvlkh89656678cdc987765345364756754554scwxw45576786454563786",
    connectEnsureLogin.ensureLoggedIn(),
    cUser.reset_password
);


app.post(
    "/reset_password",
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        cUser
            .reset_password(
                req.user._id,
                req.body.lastpassword,
                req.body.confirmpassword
            )
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send({ status: 404, message: err.message });
            });
    }
);

app.get("/logout", (req, res) => {
    req.logout(req.user, (err) => {
        if (err) return next(err);
        res.redirect("/login");
    });
});

app.get("/login-stoped", (req, res) => {
    req.logout(req.user, (err) => {
        if (err) return next(err);
        res.redirect("/login?error=true");
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true'",
}),
    function (req, res) {
    }
);


app.post("/register", cUser.create);
app.get("/user-connected", connectEnsureLogin.ensureLoggedIn(), cUser.userConnected);


/****************************************************************** API  *****************************************************************/

app.get('/detail-quittance/:id', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    cFacture.findById(req.params.id).then((result)=>{

        res.render("pages/components/quittance/detail_quittance", { facture: result });
    }).catch((err)=>{res.send(err);});
});

app.post('/send-mail-locataire/:id', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    cLocataire.sendMailLocataire(req, res);

});



app.get('/type_paiements', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    TypePaiementdb.find().then((result) => { res.send(result); }).catch((err) => { res.send({ status: 400, message: err.message }); });
});

/****************************************************************** REDIRECTION PAGE *****************************************************************/


app.get("/login", isLoggedOut, redirectPage.login);
app.get("/register", isLoggedOut, redirectPage.register);
app.get("/", connectEnsureLogin.ensureLoggedIn(), redirectPage.home);


/****************************************************************** API Forgot password *****************************************************************/

app.get("/forgot-password", (req, res) => {
    cUser.page_forgot_password(req, res);
});

app.post("/api/sendmail/forgot_password", (req, res) => {
    cUser.sendMail_forgot_password(req, res);
});

app.get("/location&forgot&password&token_:token", (req, res) => {
    cUser.redirection_page_forgot_password_valid_token(req, res);
});

app.post("/api/change&the-customer&s&password/pwd", (req, res) => {
    cUser.api_change_forgot_password_valid_token(req, res);
});



/****************************************************************** API 404 Not found *****************************************************************/





app.use(function (req, res) {
    res.status(404).render("404.ejs");
});



server.listen(PORT, () => {

   
  cEncrypte.encryptFileJSCombine().then((result) => {
    console.log(`App is listening at Ip:${process.env.IP}:${PORT}`);
  }).catch((err) => { 
    console.log("error to crype files: "+err.message);
   }); 
    // console.log(`App is listening at Ip:${process.env.IP}:${PORT}`);

});
