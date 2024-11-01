// Importações
import  funcionarios from '../databases/banco.js';
import { atualizarTabela, consultaAPI, justLetters } from './funcionarios/funcionarios.js';
import { setInputs, setButtons } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');
const modalProdutos = document.getElementById('modalProdutos');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnFiltrar = document.getElementById('btnFiltrar');
const inpFiltrarNome = document.getElementById('inpFiltrarNome');
const btnIncluirModal = document.getElementById('btnIncluirModal');
const btnAlterarModal = document.getElementById('btnAlterarModal')
const btnExcluirModal = document.getElementById('btnExcluirModal')
const inputId = document.getElementById('inputId');
const inputNome = document.getElementById('inputNome');
const inputDep = document.getElementById('inputDep');
const inputFunc = document.getElementById('inputFunc');
const inputSal = document.getElementById('inputSal');
const tbodyList = document.getElementById('tbodyList');
const modalExcluir = document.getElementById('modalExcluir');
const inputLimpar = document.querySelectorAll('#containerInput input')
const btnLimpar = document.querySelectorAll('#modalProdutos button')

// Lógica
let response = await consultaAPI();
console.log(response[0]);


btnIncluir.onclick = ()=>{
    modalProdutos.showModal();
    setInputs(inputLimpar)
    setButtons(btnLimpar)

    btnAlterarModal.disabled = true
    btnExcluirModal.disabled = true
};

btnFecharModal.onclick = ()=>{
    modalProdutos.close();
};

btnFiltrar.onclick = ()=>{
    const filtrados = response.filter((v)=>{
        if(justLetters(v.nome).includes(justLetters(inpFiltrarNome.value)) ||
           v.id == inpFiltrarNome.value ||
           justLetters(v.departamento).includes(justLetters(inpFiltrarNome.value)) ||
           justLetters(v.funcao).includes(justLetters(inpFiltrarNome.value)) ||
           v.salario == inpFiltrarNome.value
        ){
            return true
        }
        else {
            return false
        }
    })

    inpFiltrarNome.value = ''
    atualizarTabela(filtrados)
};

btnIncluirModal.onclick = ()=>{
    response.push({
        id: inputId.value, 
        nome: inputNome.value, 
        departamento: inputDep.value, 
        funcao: inputFunc.value, 
        salario: inputSal.value
    })
    
    atualizarTabela(response)

    inputId.value = ''
    inputNome.value = ''
    inputDep.value = ''
    inputFunc.value = ''
    inputSal.value = ''

    modalProdutos.close();
}

tbodyList.addEventListener('click', (event)=>{
    let target = event.target
    const row = target.closest('tr')

    const dados = {
        id: parseInt(row.cells[0].innerHTML),
        nome: row.cells[1].textContent, 
        departamento: row.cells[2].textContent,
        funcao: row.cells[3].textContent,
        salario: parseInt(row.cells[4].innerHTML) 
    }

    console.log(dados);
    
    
    if(target.id === 'btnTrash'){
        modalExcluir.showModal()
        
        document.getElementById('exclusao').addEventListener('click', ()=>{
            modalExcluir.close()
            modalProdutos.showModal()
            setButtons(btnLimpar)
            
            inputId.value = row.cells[0].textContent
            inputNome.value = row.cells[1].textContent
            inputDep.value = row.cells[2].textContent
            inputFunc.value = row.cells[3].textContent
            inputSal.value = row.cells[4].textContent
            
            inputId.disabled = true
            inputNome.disabled = true
            inputDep.disabled = true
            inputFunc.disabled = true
            inputSal.disabled = true
            btnIncluirModal.disabled = true
            btnAlterarModal.disabled = true

            document.querySelector('#btnExcluirModal').onclick = ()=>{
                
                for (let i = 0; i < response.length; i++) {
                    if(response[i].nome == dados.nome && response[i].id == dados.id){
                        response.splice(i, 1) 
                        atualizarTabela(response)
                    }
                }
                modalProdutos.close()
            }
        })

        document.getElementById('naoExclusao').addEventListener('click', ()=>{
            modalExcluir.close()
        })
    }

    if(target.id === 'btnEdit'){
        modalProdutos.showModal()
        setInputs(inputLimpar)
        setButtons(btnLimpar)

        const row = target.closest('tr')

            inputId.value = row.cells[0].textContent
            inputNome.value = row.cells[1].textContent
            inputDep.value = row.cells[2].textContent
            inputFunc.value = row.cells[3].textContent
            inputSal.value = row.cells[4].textContent
            
            btnIncluirModal.disabled = true
            btnExcluirModal.disabled = true
    }
})