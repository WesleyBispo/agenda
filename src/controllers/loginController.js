const Login = require("../models/LoginModel");

const index = (req, res) => {
    if (req.session?.User) {
        // A chave 'User' existe em req.session]
        res.render("login-logado")

    } else {
        // A chave 'User' não existe em req.session
        res.render('login')
    }

}

const register = async (req, res) => {
    if (req.session?.emailUser) {
        res.redirect('/login-logado')
        return
    }
    try {
        const login = new Login(req.body);
        await login.register();

        const flashType = login.errors.length > 0 ? 'errors' : 'success';
        const flashMessage = login.errors.length > 0 ? login.errors : login.success;

        req.flash(flashType, flashMessage);
        req.session.save(() => res.redirect('back'));
    } catch (error) {
        console.error(error);
        res.render('404')
    }
};

const login = async (req, res) => {
    try {
        const login = new Login(req.body);
        const dadosCorretos = await login.login();

        if (dadosCorretos) {
            req.session.User = req.body
            req.session.save(() => res.redirect('/home'));
            return;
        }

        req.flash('errors', login.errors);
        req.session.save(() => res.redirect('back'));
    } catch (erro) {
        console.log(erro);
        res.render('404');
    }
};


module.exports = {
    index,
    register,
    login
};
