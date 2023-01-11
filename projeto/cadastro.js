const form = document.getElementById('cadastro')
const nome = document.querySelector('#nome')
const email = document.querySelector('#email')
const senha = document.querySelector('#senha')

form.addEventListener ('submit', (event) => {
    event.preventDefault()
    if(nome.value === '' && email.value === '' && senha.value === ''){
        alert('você precisa preencher todos os campos')
        nome.setAttribute('style', 'border-color: red')
        email.setAttribute('style', 'border-color: red')
        senha.setAttribute('style', 'border-color: red')
     } else if (validarNome(nome.value) === true && validarEmail(email.value) === true && validarSenha(senha.value) === true) {
        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]')
         listaUsuario.push({
            nome: nome.value,
            email: email.value,
            senha: senha.value
        })
         localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario))
         window.location.href = ('http://127.0.0.1:5500/modulo1/projeto/idex.html')
     }
    else {
        alert('email ou senha incorretos!')
    }
})

nome.addEventListener('keyup', () => {
    if(validarNome(nome.value) !== true) {
    nome.setAttribute('style', 'border-color: red')
    } else {
    nome.setAttribute('style', 'border-color: green')
    }
})

email.addEventListener('keyup', () => {
    if(validarEmail(email.value) !== true) {
    email.setAttribute('style', 'border-color: red')
    } else {
    email.setAttribute('style', 'border-color: green')
    }
})

senha.addEventListener('keyup', () => {
    if(validarSenha (senha.value) !== true) {
        senha.setAttribute('style', 'border-color: red')
    } else {
        senha.setAttribute('style', 'border-color: green')
    }
    })


function validarNome(nome) { 
    let nomePadrao = /[A-z][ ][A-z]/; 
    return nomePadrao.test(nome); 
} 

function validarEmail(email) {
    let emailPadrao = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPadrao.test(email);
}

function validarSenha(senha) {
    let senhaPadrao = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return senhaPadrao.test(senha);
}

