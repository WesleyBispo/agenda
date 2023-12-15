import validator from "validator"
import CriaErro from "./criaErro"

const criaErro = new CriaErro()

export default class Login {
    constructor(classForm) {
        this.form = document.querySelector(classForm);

        if (this.form) {
            this.init();
        } else {
            console.error(`Elemento com a classe ${classForm} não encontrado no DOM.`);
        }
    }


    init() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault()
            if (this.validate()) this.form.submit()
        })
    }


    validate() {
        const valid = this.camposSaoValidos(this.form)
        return valid
    }


    camposSaoValidos(form) {
        let valid = true;

        for (let errotText of form.querySelectorAll('.error-text')) {
            errotText.remove();
        }

        for (let campo of form.querySelectorAll('.validar')) {

            if (!campo.value.trim()) {
                criaErro.criandoErro(campo, `Esse campo não pode estar em branco`);
                valid = false;
            }


            if (campo.classList.contains('email')) {
                if (!this.isValidEmail(campo)) {
                    criaErro.criandoErro(campo, `Seu email é inválido.`);
                    valid = false
                }
            }

            if (campo.classList.contains('senha')) {
                if (!this.isValidPassword(campo)) {
                    criaErro.criandoErro(campo, "Sua senha deve ter de 3 a 50 caracteres.")
                    valid = false

                }

            }
        }

        return valid
    }

    isValidEmail(emailInput) {
        let valid = false
        if (validator.isEmail(emailInput.value)) valid = true
        return valid
    }

    isValidPassword(passwordInput) {
        let valid = false
    
        if (passwordInput.value.length > 2 && passwordInput.value.length < 50) valid = true
        return valid
    }
}