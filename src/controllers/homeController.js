const Contato = require("../models/ContatoModel")

const index = async (req, res) => {
    
    if (!req.session.User) return res.render('login')
    try{
        const contatos = await Contato.readContato()
        res.render("index", {contatos})
    } catch(erro) {

    }
}



module.exports = {
    index
}
