const dataSource = require("../database/models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listaDeRegistrosAtualizados = dataSource[this.model].update(
      dadosAtualizados,
      {
        where: { ...where },
        transaction: transacao,
      }
    );

    if (listaDeRegistrosAtualizados[0] === 0) {
      return false;
    } else {
      return true;
    }
  }
  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }

  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }
}

module.exports = Services;
