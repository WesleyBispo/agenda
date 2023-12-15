const mongoose = require('mongoose')
const validator = require('validator')


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, default: "" },
    telefone: { type: String, default: "" },
    email: { type: String, default: "" },
    criadoEm:  {type: Date, default: Date.now() }

})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.success = []
        this.contato = null
    }

  async register() {
        this.valida()

        if (this.errors.length > 0) return

        try {
            this.contato = await this.salvandoContatoDB(this.body)
            this.success.push("Contato cadastrado com sucesso.")
        } catch (erro) {
            throw new Error("Erro ao salvar contato no DB", erro)
        }


    }

    valida() {
        //limpa o objeto
        this.cleanUp()
        
        //validações
        if (this.body.nome.trim() === "") this.errors.push("Nome é um campo obrigatório")
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if (!this.body.email && !this.body.telefone ) {
            this.errors.push("Pelo menos um contato deve ser enviado: E-mail ou Telefone")
        }
        


    }


    cleanUp() {

        for (const key in this.body) {
            if (typeof this.body[key] !== 'string' && typeof this.body[key] !== 'date') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email,
            
        }

    }

    

   async salvandoContatoDB(body) {
        const {nome, sobrenome, telefone, email} = body
      
        const novoContato = new ContatoModel({
            nome,
            sobrenome,
            telefone,
            email,
            criadoEm: Date.now()
        })
    
        try {
            const userSalvo = await novoContato.save()
            return userSalvo
        } catch (erro) {
            throw new Error("ERRO AO CRIAR CONTATO NO DB", erro)
        }
    }


    async contatoBuscaPorID(id) {
        if (typeof id !== 'string') return
       try {
            const contatoSalvo = ContatoModel.findById(id)
            return contatoSalvo
       } catch (error) {
            throw new Error("Erro ao encontrar Contato pelo ID")
       }
        
    }

    async update(id) {
        if (typeof id !== 'string') return
        this.valida()
        if(this.errors.length > 0) return
        try {
            this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
            this.success.push("Contato atualizado com sucesso")
        } catch (erro) {
            throw new Error("Erro ao atualizar no DB", erro)
        }
    }

   static async readContato() {
    try{
        const contatos = await ContatoModel.find({}).sort({nome : 1})
        return contatos
    }catch(erro){
        throw new Error("ERRO AO BUSCAR TODOS CONTATOS")
    }

    } 

    async remove(id) {
        try {
    
            // Certifique-se de que o ID seja um ObjectId válido do MongoDB
            const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;
    
            if (!objectId) {
                throw new Error("ID inválido");
            }
    
            const resposta = await ContatoModel.deleteOne({ _id: objectId });
    
            if (resposta.deletedCount > 0) {
                this.success.push("Contato excluído com sucesso");
            } else {
                throw new Error("Contato não encontrado para exclusão");
            }
        } catch (erro) {
            throw new Error(`Erro ao deletar contato do DB: ${erro.message}`);
        }
    }
    
    
}


module.exports = Contato