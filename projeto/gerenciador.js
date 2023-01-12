const modal = document.getElementById('modal')
const form = document.getElementById('adicionar-tarefa')
let tarefaAtual = null

const openModal = () => {
    modal.style.display = "block"
}

const closeModal = () => {
    modal.style.display = "none"
    document.getElementById("numero").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
    document.getElementById("status").value = "";
}


window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const numero = form.elements['numero'].value
    const descricao = form.elements['descricao'].value
    const data = form.elements['data'].value
    const status = form.elements['status'].value

    const tarefaCriada = {
        numero,
        descricao,
        data,
        status
    }

    salvarTarefa(tarefaCriada)
})


const criarTarefa = async (tarefas) => {
    await fetch('https://api-json.herokuapp.com/task', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */* ',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "numero": tarefas.numero,
            "descricao": tarefas.descricao,
            "data": tarefas.data,
            "status": tarefas.status
        })
    })
}

const getTarefas = async () => {
    const apiResposta = await fetch('https://api-json.herokuapp.com/task')
    const tarefas = await apiResposta.json()
    const tarefasTbory = document.getElementById('tbory-conteudo')
    tarefasTbory.innerHTML = ''

    tarefas.forEach((tarefa) => {
        tarefasTbory.innerHTML = tarefasTbory.innerHTML +
            `<tr>
        <td scope="col">${tarefa.numero}</td>
        <td scope="col" id="quebra-linha">${tarefa.descricao}</td>
        <td scope="col">${new Date(tarefa.data).toLocaleDateString('pt-BR')}</td>
        <td scope="col" class="${tarefa.status.toLowerCase().replaceAll(" ","-")}">${tarefa.status}</td>
            <td>
                <button type="button" id="button" onclick="editTarefa(${tarefa.id})"><svg width="15" height="15" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.5625 42.9844H2.4375C1.40039 42.9844 0.5625 43.8223 0.5625 44.8594V46.9688C0.5625 47.2266 0.773438 47.4375 1.03125 47.4375H46.9688C47.2266 47.4375 47.4375 47.2266 47.4375 46.9688V44.8594C47.4375 43.8223 46.5996 42.9844 45.5625 42.9844ZM9.09961 38.0625C9.2168 38.0625 9.33399 38.0508 9.45117 38.0332L19.3066 36.3047C19.4238 36.2812 19.5352 36.2285 19.6172 36.1406L44.4551 11.3027C44.5094 11.2485 44.5525 11.1841 44.5819 11.1133C44.6113 11.0424 44.6264 10.9664 44.6264 10.8896C44.6264 10.8129 44.6113 10.7369 44.5819 10.666C44.5525 10.5952 44.5094 10.5308 44.4551 10.4766L34.7168 0.732422C34.6055 0.621094 34.459 0.5625 34.3008 0.5625C34.1426 0.5625 33.9961 0.621094 33.8848 0.732422L9.04687 25.5703C8.95898 25.6582 8.90625 25.7637 8.88281 25.8809L7.1543 35.7363C7.0973 36.0502 7.11766 36.3733 7.21363 36.6775C7.30961 36.9818 7.47829 37.258 7.70508 37.4824C8.0918 37.8574 8.57813 38.0625 9.09961 38.0625Z" id="editar"/>
                </svg></button>
                <button type="button" id="button" onclick="deletarTarefa(${tarefa.id})"><img src="IMAGENS/apagar.png"></button>
            </td>
        </tr>`
    })
}

const salvarTarefa = async (tarefas) => {
    if (tarefaAtual === null) {
        await criarTarefa(tarefas)
    } else {
        await edicaoTarefa(tarefaAtual.id, tarefas)
        tarefaAtual = null
    }
    closeModal()
    getTarefas()
}

const getTarefa = async (id) => {
    const apiResposta = await fetch(`https://api-json.herokuapp.com/task/${id}`)
    const tarefa = await apiResposta.json()
    return tarefa
}


const editTarefa = async (id) => {
    tarefaAtual = await getTarefa(id)
    document.getElementById("numero").value = tarefaAtual.numero
    document.getElementById("descricao").value = tarefaAtual.descricao
    document.getElementById("data").value = tarefaAtual.data
    document.getElementById("status").value = tarefaAtual.status
    openModal()
}


const edicaoTarefa = async (id, tarefas) => {
    await fetch(`https://api-json.herokuapp.com/task/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */* ',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "numero": tarefas.numero,
            "descricao": tarefas.descricao,
            "data": tarefas.data,
            "status": tarefas.status
        })
    })
}

const deletarTarefa = async (id) => {
    await fetch(`https://api-json.herokuapp.com/task/${id}`, {
        method: "DELETE"
    })
    getTarefas()
}


const verificarCampos = () => {
    const numero = document.getElementById("numero").value
    const descricao = document.getElementById("descricao").value 
    const data = document.getElementById("data").value 
    const status =  document.getElementById("status").value 

    const botao = document.getElementById("submit")
    if (numero !== "" && descricao !=="" && data !== "" && status !== "") {
        botao.disabled = false 
        botao.classList.add ("submitAtivado")
        return
    } 
    botao.disabled = true
    botao.classList.remove ("submitAtivado")
}

const inputContainer = document.querySelector("#checkbox")
const rootElemento = document.documentElement

const modoClaro = {
    '--color-F5F5F5': '#F5F5F5',
    '--color-68519D': '#68519D',
    '--color-68519D-retangulo': '#68519D',
    '--color-D7CAE5': '#D7CAE5',
    '--color-F8B04E': '#F8B04E',
    '--color-FFFFFF': '#FFFFFF',
    '--color-000000': '#000000',
    '--color-828282': '#828282',
    '--color-2C2661': '#2C2661',
    '--color-2C2661-img':'#2C2661'
}

const modoEscuro = {
    '--color-F5F5F5': '#1A1A1A',
    '--color-68519D': '#fbb04d',
    '--color-68519D-retangulo': '#2C2661',
    '--color-D7CAE5': '#bc8ac2',
    '--color-F8B04E': '#b38900',
    '--color-FFFFFF': '#2C2661',
    '--color-000000': '#FFFFFF',
    '--color-828282': '#FFFFFF',
    '--color-2C2661': '#FFFFFF',
    '--color-2C2661-img': '#bc8ac2',
}

inputContainer.addEventListener('change', function() {
    const checado = inputContainer.checked
    if (checado) {
        mudarTema(modoEscuro)
    } else {
        mudarTema(modoClaro)
    }
})

function mudarTema(tema) {
    for (let prop in tema)
    mudancaPropriedade(prop, tema[prop])
}

function mudancaPropriedade (propriedade, valor) {
    rootElemento.style.setProperty(propriedade, valor)
} 
