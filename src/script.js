// Importações
import funcionarios from '../databases/banco.js';
import { atualizarTabela, consultaAPI, justLetters } from './funcionarios/funcionarios.js';


// Referências do DOM HTML
const btnIncluir = document.getElementById('btnIncluir');
const modalProdutos = document.getElementById('modalProdutos');
const modalExcluir = document.getElementById('modalExcluir');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnFiltrar = document.getElementById('btnFiltrar');
const inpFiltrarNome = document.getElementById('inpFiltrarNome');
const btnIncluirModal = document.getElementById('btnIncluirModal')
const inputId = document.getElementById('inputId');
const inputNome = document.getElementById('inputNome');
const inputDep = document.getElementById('inputDep');
const inputFunc = document.getElementById('inputFunc');
const inputSal = document.getElementById('inputSal');
// Lógica
consultaAPI();

btnIncluir.onclick = ()=>{
    modalProdutos.show();
};

btnFecharModal.onclick = ()=>{
    modalProdutos.close();
};

btnFiltrar.onclick = ()=>{
    const filtrados = funcionarios.banco.filter((v)=>{
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