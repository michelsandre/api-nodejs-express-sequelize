const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaRegistroPorId(id);

    //função do sequelize pra buscar campos relacionados, mixins
    const listaMatriculas = await estudante.getAulasMatriculadas();

    return listaMatriculas;
  }

  async pegaTodasMatriculasPorEstudante(id) {
    const estudante = await super.pegaRegistroPorId(id);

    //função do sequelize pra buscar campos relacionados, mixins
    const listaMatriculas = await estudante.getTodasAsMatriculas();

    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo("todosOsRegistros");
    return listaPessoas;
  }
}

module.exports = PessoaServices;
