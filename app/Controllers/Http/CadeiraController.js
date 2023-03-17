"use strict";
const Database = use("Database");
const Cadeira = use("App/Models/Cadeira");
const Professor = use("App/models/Professor");
const Sala = use("App/models/Sala");
const Aluno = use("App/models/Aluno");

class CadeiraController {
  // Alocar aluno em sala
  async allocate({ params, request, response }) {
    // Pega o id do professor pelo parâmetro
    const professor_id = params.professor_id;

    // Pega o id do aluno,sala e o número pelo corpo da req
    const sala_id = request.qs.sala_id;
    const aluno_id = request.qs.aluno_id;
    const numero = request.qs.numero;

    // Encontra a sala pelo parâmetro informado
    const sala = await Sala.find(sala_id);

    const aluno = await Aluno.find(aluno_id);

    // const cadeira = await Cadeira.findBy('aluno_id',aluno_id);
    const cadeira = await Database.table("Cadeiras")
      .where("sala_id", sala_id)
      .andWhere("aluno_id", aluno_id);

    console.log(cadeira);
    const cadeiraQTD = await Database.table("Cadeiras").where(
      "sala_id",
      sala_id
    );

    const cadeiraOcup = await Cadeira.findBy("numero", numero);

    if (!sala) return { message: "Sala não encontrada!" };

    if (sala.professor_id != professor_id) {
      response
        .status(401)
        .json({
          message:
            "Acesso restrito! Você não possui permissão para alocar o aluno nessa sala!",
        });
      return;
    }

    if (cadeiraQTD.length >= sala.capacidade) {
      response.status(422).json({ message: "Sala Cheia!" });
      return;
    }

    if (!aluno) return { message: "Aluno inexistente!" };

    if (cadeira.length > 0) {
      response.status(422).json({ message: "Aluno já cadastrado nesta sala!" });
      return;
    }
    if (cadeiraOcup) {
      response.status(422).json({ message: "Cadeira já ocupada!" });
      return;
    }

    const dataToCreate = request.only(["numero", "aluno_id", "sala_id"]);

    await Cadeira.create(dataToCreate);

    if (cadeiraQTD.length + 1 >= sala.capacidade) {
      sala.disponibilidade = 0;
      await sala.save();
      response
        .status(201)
        .json({
          message:
            `Aluno alocado na cadeira ${numero} da sala ${sala_id}!  ` +
            "    Sala com capacidade máxima!",
        });
      return;
    } else {
      sala.disponibilidade = 1;
      await sala.save();
    }

    response
      .status(201)
      .json({
        message: `Aluno alocado na cadeira ${numero} da sala ${sala_id}!`,
      });
  }

  async findAllInSala({ params, response }) {
    const cadeira = await Database.table("Cadeiras").where(
      "sala_id",
      params.sala_id
    );

    if (cadeira.length == 0) {
      response.status(404).json({ message: "Sala vazia ou inexistente!" });
      return;
    }
    response.status(200).json({ cadeira });
  }

  async remove({ params, response }) {
    const cadeira = Database.from("Cadeiras")
      .where((query) => {
        query.where("aluno_id", params.aluno_id);
      })
      .andWhere((query) => {
        query.where("sala_id", params.sala_id);
      });

    // Encontra a sala pelo parâmetro informado
    const sala = await Sala.find(params.sala_id);

    const professor_id = params.professor_id; // Pega o id do professor que fez a solicitação pelo parâmetro.

    if (cadeira == 0) return { message: "Aluno não encontrado!" };

    // Caso o professor que requisitou a atualização não seja o criador da sala, retorna um erro.
    if (professor_id != sala.professor_id) {
      response
        .status(401)
        .json({
          message:
            "Acesso restrito! Você não possui permissão para remover esse aluno!",
        });
      return;
    }

    await cadeira.delete();
    response
      .status(200)
      .json({ message: `Aluno removido da sala ${params.sala_id}!` });
  }

  async findAllSalas({ params, response }) {
    const cadeira = await Database.table("Cadeiras").where(
      "aluno_id",
      params.aluno_id
    );

    if (cadeira.length == 0) {
      response
        .status(422)
        .json({ message: "O aluno não possui sala ou não existe!" });
      return;
    }
    const aluno = await Aluno.find(params.aluno_id);

    let salasOcupadas = [];
    salasOcupadas.push(aluno.nome);
    for (let i = 0; i < cadeira.length; i++) {
      const el = cadeira[i];
      const sala = await Sala.find(el.sala_id);
      const professor = await Professor.find(sala.professor_id);
      salasOcupadas.push({ Professor: professor.nome, sala: sala.numero });
    }

    response.status(200).json({ salasOcupadas });
  }
}

module.exports = CadeiraController;
