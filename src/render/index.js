exports.home = (req, res) => {

    try {
        if (req.user) {
            res.render("index", {
                title: "Tableau de bord de Location",
            });
        } else {
            res.redirect("/login?error=true");
        }
    } catch (error) {
        res.render('404', { status: 400, message: "Une erreur est survenue lors de la redirection vers la page" })
    }
};

exports.login = (req, res) => {
  
    let response = {
        title: "Authentification d'utilisateur",
        error: req.query.error,
    };
    res.render("sign/signin/Login", response);
};

exports.register = (req, res) => {
    let response = {
        title: "Enregistrement d'utilisateur",
        error: req.query.error,
    };
    res.render("sign/signup/Register", response);
};