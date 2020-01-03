const form = document.querySelector('form');
const moeda = document.querySelector('#moeda');
const op = document.getElementsByName('op');
// console.log(moeda, op);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let coin = moeda.value;
    let operation = 'ticker';
    getDataFromAPI(coin, operation);

});

/* function getValueRadio() {
    op.forEach(element => {
        if(element.checked) {
            return element.value;
        }
    })
}
 */
function getDataFromAPI(coin, operation) {
    const api = fetch(`https://www.mercadobitcoin.net/api/${coin}/${operation}/`);
    api.then(data => {
        return data.json();
    }).then(dataJSON =>{
        console.log(dataJSON.ticker);
        const infos = [];
        for (const key in dataJSON.ticker) {
            infos.push(dataJSON.ticker[key]);
        }
        const outputHTML = createParagraphsInfo(infos);
        document.querySelector('.output').innerHTML = outputHTML;
    })
}
function createParagraphsInfo(infos) {
    const output = `
    <p>Maior preço unitário de negociação das últimas 24 horas: <span>R$ ${Number(infos[0]).toFixed(2)}</span></p>
    <p>Menor preço unitário de negociação das últimas 24 horas: <span>R$ ${Number(infos[1]).toFixed(2)}</span></p>
    <p>Quantidade negociada nas últimas 24 horas: <span>${Number(infos[2]).toFixed(2)} unidades.</span></p>
    <p>Preço unitário da última negociação: <span>R$ ${Number(infos[3]).toFixed(2)}</span></p>
    <p>Maior preço de oferta de compra das últimas 24 horas: <span>R$ ${Number(infos[4]).toFixed(2)}</span></p>
    <p>Menor preço de oferta de venda das últimas 24 horas:<span>R$ ${Number(infos[5]).toFixed(2)}</span></p>
    `;
    return output;
}
