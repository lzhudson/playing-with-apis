const inputCEP = document.querySelector('#js-input-cep');
const btnSendCEP = document.querySelector('#js-envia-cep');
const inputCidade = document.querySelector('#js-cidade-input');
const inputEstado = document.querySelector('#js-estado-input');
const form = document.querySelector('form');
btnSendCEP.addEventListener('click', (e) =>{
    e.preventDefault();
    const numberCEP = getInputValue();
    getDataWithAPI(numberCEP);

});

function getInputValue() {
    return inputCEP.value;
}
function getDataWithAPI(cep) {
    clearInputs();
    const api = `https://viacep.com.br/ws/${cep}/json/`;
    const apiData = fetch(api);
    apiData.then((data) =>{
        return data.json();
    }).then(dataJSON => {
        inputCidade.value = dataJSON.localidade;
        inputEstado.value = dataJSON.uf;
    }).catch(err =>{
        console.log(err);
    })
}

function clearInputs(){
    inputCidade.value = '';
    inputEstado.value = '';
}