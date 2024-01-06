const dataSource = require("../database/models");
const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
    this.matriculaServices = new Services("Matricula");
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
  async cancelaPessoaEMatriculas(estudanteId) {
    //O transactions garante que atualização seja realizada por completo, caso de um erro, nenhuma alteração é executada
    return dataSource.sequelize.transactions(async (transcao) => {
      await super.atualizaRegistro(
        { ativo: false },
        { id: estudanteId },
        transcao
      );
      await this.matriculaServices.atualizaRegistro(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        transcao
      );
    });
  }
}

module.exports = PessoaServices;
