const form = document.getElementById('login')
const email = document.querySelector('#email')
const senha = document.querySelector('#senha')

form.addEventListener ('submit', (event) => {
    event.preventDefault()
    if(email.value === '' && senha.value === ''){
        alert('Você precisa preencher todos os campos!')
        email.setAttribute('style', 'border-color: red')
        senha.setAttribute('style', 'border-color: red')
       
    } else if (validarEmail(email.value) === true && validarSenha(senha.value) === true) {

        let listaUsuario =  [ ]

        let usuarioValidado = {
            nome: '',
            email: '',
            senha: ''
        }
        listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'))
        
        listaUsuario.forEach ((item) => {
            if (email.value == item.email && senha.value == item.senha) {
                usuarioValidado =  {
                    nome: item.nome,
                    email: item.email,
                    senha: item.senha 
                }
            }
            
        })
        if(email.value == usuarioValidado.email && senha.value == usuarioValidado.senha) {
            window.location.href = ('../gerenciador.html')
        } else {
            alert('Email ou senha incorretos!')
            email.setAttribute('style', 'border-color: red')
            senha.setAttribute('style', 'border-color: red')
        }
        
    }
    else {
        alert('Email ou senha incorretos!')
        email.setAttribute('style', 'border-color: red')
        senha.setAttribute('style', 'border-color: red')
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
 
function validarEmail(email) {
    let emailPadrao =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPadrao.test(email);
}

function validarSenha(senha) {
    let senhaPadrao =
    /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
    return senhaPadrao.test(senha);
}
