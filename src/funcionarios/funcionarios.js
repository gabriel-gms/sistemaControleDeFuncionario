import funcionarios from '../../databases/banco.js';

// Referências do DOM HTM
const tbodyList = document.getElementById('tbodyList');


//Lógica

export async function consultaAPI(){
    const response = await funcionarios;
    atualizarTabela(response.banco);
    return response.banco
}


export function atualizarTabela(dados){
    if(dados.length === 0){
        alert('Não encontrado')
    } 
    else {
    let rows='';
    for (let i=0; i < dados.length; i++){
        let tr = '<tr>' +
                        '<td>' + dados[i].id + '</td>' +
                        '<td>' + dados[i].nome + '</td>' +
                        '<td>' + dados[i].departamento + '</td>' +
                        '<td>' + dados[i].funcao + '</td>' +
                        '<td>' + dados[i].salario + '</td>' +
                        '<td>' +
                            '<img id="btnTrash" src="assets/trash.png" class="icons">' +
                            '<img id="btnEdit" src="assets/edit2.png" class="icons">' +
                        '</td>' +
                  '</tr>'
        rows += tr;   
    }
    tbodyList.innerHTML = rows
    }

}

export function justLetters(text){
    let textMin = text.toLowerCase()
    return textMin.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export function setInputs(values){
    values.forEach( v => {
        v.value = ''
        v.disabled = false
    } )
}

export function setButtons(btns){
    btns.forEach( v => {
        console.log(v)
        v.disabled = false
    } )
}