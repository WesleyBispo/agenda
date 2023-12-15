const Contato = require("../models/ContatoModel")

const indexRegister = (req, res) => {
    contatoEncontrado = ''
    res.render('contato', { contatoEncontrado })
}


const register = async (req, res) => {
    const contato = new Contato(req.body)
    try {
        await contato.register()

        const flashType = contato.errors.length > 0 ? "errors" : "success"
        const flashMessage = contato.errors.length > 0 ? contato.errors : contato.success

        const redirectUrl = flashType === "success" ? `/contato/${contato.contato._id}` : 'back'

        req.flash(flashType, flashMessage)
        req.session.save(() => res.redirect(redirectUrl))
    } catch (erro) {
        res.render('404')
    }
}


const UpdateIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')
    try {
        const contato = new Contato()
        const contatoEncontrado = await contato.contatoBuscaPorID(req.params.id)
        if (!contatoEncontrado) return res.render('404')
        res.render('contato', { contatoEncontrado })
    } catch (erro) {
        console.log(erro)
    }
}

const update = async (req, res) => {
    if (!req.params.id) return res.render('404')

    try {
        const contato = new Contato(req.body)
        await contato.update(req.params.id)

        const flashType = contato.errors.length > 0 ? "errors" : "success"
        const flashMessage = contato.errors.length > 0 ? contato.errors : contato.success

        const redirectUrl = flashType === "success" ? `/contato/${contato.contato._id}` : 'back'

        req.flash(flashType, flashMessage)

        req.session.save(() => res.redirect(redirectUrl))

    } catch (erro) {
        console.log(erro)
        res.render('404')
    }


}

const remove = async (req, res) => {
    if (!req.params.id) return res.render('404');
    try {
        const contato = new Contato();
        await contato.remove(req.params.id);

        req.flash("success", contato.success);
        req.session.save(() => res.redirect('back'))

    } catch (erro) {
        console.log(erro)
        req.session.save(() => res.render('404'));
    }
}




module.exports = {
    indexRegister,
    register,
    UpdateIndex,
    update,
    remove
}