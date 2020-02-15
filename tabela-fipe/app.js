const selectMarcas = document.getElementById('marcas');

const listaCarros = document.getElementById('lista-carros');

const btnListarCarros = document.getElementById('listar-carros');

const marcasSelect = document.getElementById('marcas');

const modelosSelect = document.getElementById('modelos');

const anosSelect = document.getElementById('anos');

const infoCarOutput = document.querySelector('.inforCar');

const fipe = new Fipe();

window.addEventListener('load', (e) => {
  loadingSelect();
  fipe.getMarcas()
     .then(data => {
       hideLoading();
       showMarcasOnSelectElement(data);
     });
})

marcasSelect.addEventListener('change', (e) => {
  const marcaId = marcasSelect.options[marcasSelect.selectedIndex].value;
  fipe.getModelos(marcaId)
      .then(data => {
        modelosSelect.innerHTML = '';
        showModelosOnSelect(data.modelos);
      })
})

modelosSelect.addEventListener('change', (e) => {
  const marcaId = marcasSelect.options[marcasSelect.selectedIndex].value;
  const modeloId = modelosSelect.options[modelosSelect.selectedIndex].value;
  fipe.getYears(marcaId, modeloId)
      .then(data => {
        anosSelect.innerHTML = '';
        showYearsOnSelect(data)
      });
})

anosSelect.addEventListener('change', (e) => {
  const marcaId = marcasSelect.options[marcasSelect.selectedIndex].value;
  const modeloId = modelosSelect.options[modelosSelect.selectedIndex].value;
  const anoId = anosSelect.options[anosSelect.selectedIndex].value;

  fipe.getCarValue(marcaId, modeloId, anoId)
      .then(data => showCarInfo(data));
})

btnListarCarros.addEventListener('click', (e) => {
  e.preventDefault();

  const modeloId = marcasSelect.options[marcasSelect.selectedIndex].value;

  fipe.getModelos(modeloId)
      .then(data => {
        listaCarros.innerHTML = '';
        htmlModelos(data.modelos)
      });
})


function showMarcasOnSelectElement(marcas) {
  marcas.forEach((marca) => {
    const option = document.createElement('option');
    option.setAttribute("value", marca.codigo);
    const textoMarca = document.createTextNode(marca.nome)
    option.appendChild(textoMarca);
    selectMarcas.appendChild(option);
  })
}

function loadingSelect() {
  const option = document.createElement('option');
  const textOption = document.createTextNode('Carregando...');
  option.appendChild(textOption);
  selectMarcas.appendChild(option);
}

function hideLoading() {
  selectMarcas.innerHTML = '';
}

function htmlModelos(modelos) {
  modelos.forEach((modelo, index) => {
      const li = document.createElement('li');
      const modeloCarro = document.createTextNode(modelo.nome);
      li.appendChild(modeloCarro);
      listaCarros.appendChild(li);
  })
}

function showModelosOnSelect(modelos) {
  modelos.forEach((modelo) => {
    const option = document.createElement('option');
    const textModelo = document.createTextNode(modelo.nome);
    option.setAttribute('value', modelo.codigo);
    option.appendChild(textModelo);
    modelosSelect.appendChild(option);
  })
}

function showYearsOnSelect(anos) {
  anos.forEach(ano => {
    const option = document.createElement('option');
    const anoModelo = document.createTextNode(ano.nome);
    option.setAttribute('value', ano.codigo);
    option.appendChild(anoModelo);
    anosSelect.appendChild(option);
  })
}

function showCarInfo(carInfo) {
  infoCarOutput.innerHTML = `
  <h1>Modelo:${carInfo.Modelo}</h1>
  <h2>Marca:${carInfo.Marca}</h2>
  <p>Valor: ${carInfo.Valor}</p>
  <p>Ano:${carInfo.AnoModelo}</p>
  `
}