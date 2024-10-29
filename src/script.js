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
    modalExcluir.showModal()
    let target = event.target
    
    document.getElementById('exclusao').addEventListener('click', ()=>{
        modalExcluir.close()
        modalProdutos.showModal()
        btnIncluirModal.desabled
        btnAlterarModal.desabled
    })

    document.getElementById('naoExclusao').addEventListener('click', ()=>{
        modalExcluir.close()
    })
})