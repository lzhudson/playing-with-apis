class Fipe {
  async getMarcas(){
    const marcasResponse = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');

    const marcas = await marcasResponse.json();

    return marcas;
  }

  async getModelos(marca) {
    const responseMarcas = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`);

    const modelos = await responseMarcas.json();

    return modelos;
  }

  async getYears(marca, modelo) {

    const responseMarcas = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`);

    const modelos = await responseMarcas.json();

    return modelos;

  }

  async getCarValue(marca, modelo, ano) {

    const responseMarcas = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos/${ano}`);

    const modelos = await responseMarcas.json();

    return modelos;

  }
}