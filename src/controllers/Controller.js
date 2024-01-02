class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistros =
        await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaPorId(req, res) {
    try {
      const { id } = req.params;
      const registroPorId = await this.entidadeService.pegaRegistroPorId(
        Number(id)
      );
      return res.status(200).json(registroPorId);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(
        dadosParaCriacao
      );
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        Number(id)
      );
      if (!foiAtualizado) {
        return res
          .status(400)
          .json({ mensagem: `registro não foi atualizado` });
      } else {
        return res.status(200).json({ mensagem: `Atualizado com sucesso` });
      }
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}
module.exports = Controller;
