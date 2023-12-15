export default class CriaErro {
    constructor(campo, erro) {
        this.campo = campo
        this.erro = erro
    }

    criandoErro(campo, erro) {
            const div = document.createElement('div');
            div.innerHTML = erro;
            div.classList.add('error-text');
            campo.insertAdjacentElement('afterend', div);

    }

}