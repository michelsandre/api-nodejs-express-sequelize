const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
  }

  async pegaMatriculasPorEstudante(id) {
    const estudante = await super.pegaRegistroPorId(id);

    //função do sequelize pra buscar campos relacionados, mixins
    const listaMatriculas = await estudante.getAulasMatriculadas();

    return listaMatriculas;
  }
}

module.exports = PessoaServices;