const main = (req, res) => {
    req.session.destroy((erro) => {
        if(erro) {
            console.log("ERRO AO FAZER O LOGOUT")
        } else {
            res.redirect('/login')
        }
    })
}

module.exports = {
    main
}