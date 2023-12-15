import Login from "./FormLogin";
import CriaErro from "./criaErro";

const criaErro = new CriaErro()

export default class FormContato extends Login {
    constructor(classForm){
        super(classForm)
    }

    camposSaoValidos(form) {
        let valid = true

        for (let erroText of form.querySelectorAll('.error-text')){
            erroText.remove()
        }

        for (let campo of form.querySelectorAll('.validar')) {
            
            if(campo.classList.contains('nome')) {
                if(campo.value.trim().length <= 0) {
                    criaErro.criandoErro(campo, 'Nome não pode estar vazio.')
                    valid = false
                }
            }

            if(campo.classList.contains('email') && campo.value.trim().length > 0){
                if(!this.isValidEmail(campo)){
                    criaErro.criandoErro(campo, "E-mail inválido")
                    valid = false
                }
            }


        }

        const emailOuTelefonePreenchido = form.querySelector('.email').value.trim() || form.querySelector('.telefone').value.trim()
        
            if (!emailOuTelefonePreenchido) {
                criaErro.criandoErro(form.querySelector('.email'), 'Preencha pelo menos um dos campos: Email ou Telefone');
                criaErro.criandoErro(form.querySelector('.telefone'), 'Preencha pelo menos um dos campos: Email ou Telefone');
                valid = false;
            }

        return valid
    }
}