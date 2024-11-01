// Importações
import funcionarios from '../databases/banco.js';
import { atualizarTabela, consultaAPI, justLetters } from './funcionarios/funcionarios.js';


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

// Lógica
let response = await consultaAPI();

btnIncluir.onclick = ()=>{
    modalProdutos.showModal();

    inputId.disabled = false
    inputNome.disabled = false
    inputDep.disabled = false
    inputFunc.disabled = false
    inputSal.disabled = false
    btnIncluirModal.disabled = false
    btnAlterarModal.disabled = true
    btnExcluirModal.disabled = true
    btnFecharModal.disabled = false
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
    funcionarios.banco.push({
        id: inputId.value, 
        nome: inputNome.value, 
        departamento: inputDep.value, 
        funcao: inputFunc.value, 
        salario: inputSal.value
    })
    
    atualizarTabela(funcionarios.banco)

    inputId.value = ''
    inputNome.value = ''
    inputDep.value = ''
    inputFunc.value = ''
    inputSal.value = ''

    modalProdutos.close();
}

tbodyList.addEventListener('click', (event)=>{
    let target = event.target
    console.log(target);
    
    if(target.id === 'btnTrash'){
        modalExcluir.showModal()
        
        document.getElementById('exclusao').addEventListener('click', ()=>{
            modalExcluir.close()
            modalProdutos.showModal()
            
            const row = target.closest('tr')

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
            btnExcluirModal.disabled = false
            btnFecharModal.disabled = false

            document.querySelector('#btnExcluirModal').onclick = ()=>{
                response.splice()
            }
        })

        document.getElementById('naoExclusao').addEventListener('click', ()=>{
            modalExcluir.close()
        })
    }

    if(target.id === 'btnEdit'){
        modalProdutos.showModal()

        const row = target.closest('tr')

            inputId.value = row.cells[0].textContent
            inputNome.value = row.cells[1].textContent
            inputDep.value = row.cells[2].textContent
            inputFunc.value = row.cells[3].textContent
            inputSal.value = row.cells[4].textContent
            
            inputId.disabled = false
            inputNome.disabled = false
            inputDep.disabled = false
            inputFunc.disabled = false
            inputSal.disabled = false
            btnIncluirModal.disabled = true
            btnAlterarModal.disabled = false
            btnExcluirModal.disabled = true
            btnFecharModal.disabled = false
    }
})