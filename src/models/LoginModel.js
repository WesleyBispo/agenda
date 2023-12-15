const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.success = []
        this.errors = []
        this.user = null
    }

    async login() {
        this.valida();
    
        try {
            const userDB = await this.verificandoExistenciaUserDB(this.body.email);
    
            if (!userDB) {
                this.errors.push("Esse usuário ainda não é cadastrado!");
                return false
            }
    
            const { _id: id, email, password } = userDB;
            const senhasCorrespondem = bcryptjs.compareSync(this.body.password, password);
    
            if (!senhasCorrespondem) {
                this.errors.push("SENHA INCORRETA");
                return false
            }
    
            return true;
        } catch (erro) {
            throw new Error("Erro ao verificar a existência do usuário no DB", erro)
        }
    
    }
    

    async register() {
        this.valida()

        try {
            const existeUser = await this.verificandoExistenciaUserDB(this.body.email)
            if (existeUser)  this.errors.push("Esse e-mail já está associado a um usuário!")
        } catch (erro) {
            console.log(erro)
        }

        if (this.errors.length > 0) return


        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        try {
            this.user = await this.salvandoUserDB(this.body)
            this.success.push('SEU CADASTRO FOI CONCLUÍDO COM SUCESSO!!!')
            return this.user
        } catch (erro) {
            throw new Error("Erro ao verificar a existência do usuário no DB", erro)
        }
    }

    valida() {
        //limpa o objeto
        this.cleanUp()

        //validações
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres")
        }

    }


    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    async salvandoUserDB(body) {
        const { email, password } = body
        const novoUser = new LoginModel({
            email,
            password,
        })
        try {
            const userSalvo = await novoUser.save()
            return userSalvo
        } catch (erro) {
            throw new Error("ERRO AO CRIAR USUÁRIO NO DB", erro)
        }
    }


    async verificandoExistenciaUserDB(email) {
        try {
            const usuarioExistente = await LoginModel.findOne({ email })
            return usuarioExistente
        } catch (erro) {
            throw new Error("ERRO AO BUSCAR USER EM DB", erro)
        }
    }
}

module.exports =  Login