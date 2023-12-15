import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './assets/css/style.css'

import Login from "./modules/FormLogin"
import FormContato from './modules/FormContato'

// Função para obter o nome da página atual
function getCurrentPage() {
    return window.location.pathname.split('/').pop(); // Pode precisar de ajustes dependendo da estrutura do seu projeto
}

const currentPage = getCurrentPage();
console.log(currentPage)
if (currentPage === 'login') {
    const register = new Login(".form-register")
    register.init()
    const login = new Login(".form-login");
    login.init();
} else if  (currentPage === 'contato') {
    const contato = new FormContato(".form-contato");
    contato.init();
} else {
    const contato = new FormContato(".form-contato");
    contato.init();
}


// Verifica se a página foi acessada usando o botão de voltar
if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
    // Recarrega a página se foi acessada usando o botão de voltar
    location.reload(true);
}
