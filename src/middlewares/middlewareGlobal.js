const Contato = require("../models/ContatoModel");

const injectTexts = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success')
    res.locals.User = req.session.User || "Visitante"
    next();
};

const loginRequired = (req, res, next) => {
    if (!req.session?.User) {
        setTimeout(() => {
            req.flash("errors", "VOCÊ PRECISA FAZER O LOGIN")
            req.session.save(() => res.redirect('/login'))

        }, 1000);
        return
    }
    next()
}

const csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

const checkCsrfError = (erro, req, res, next) => {
    if (erro) {
        console.log("ERRO CSRF")
        return res.render('404');
    }
    next(); // Chame next() para garantir que o fluxo continue
};

module.exports = {
    injectTexts,
    loginRequired,
    csrfMiddleware,
    checkCsrfError
};
