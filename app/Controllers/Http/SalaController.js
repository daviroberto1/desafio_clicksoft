"use strict";

const Sala = use("App/Models/Sala");

class SalaController {
  // Criar sala
  async create({ request, response }) {
    const dataToCreate = request.only([
      "numero",
      "capacidade",
      "disponibilidade",
      "professor_id",
    ]);

    await Sala.create(dataToCreate);

    response.status(201).json({ message: "Sala criada!" });
  }

  // Editar sala
  async edit({ params, request, response }) {
    const sala = await Sala.find(params.id);

    const professor_id = params.professor_id; // Pega o id do professor que fez a solicitação pelo parâmetro.

    if (!sala) {
      response.status(404).json({ message: "Sala não encontrada!" });
      return;
    }

    // Caso o professor que requisitou a atualização não seja o criador da sala, retorna um erro.
    if (professor_id != sala.professor_id) {
      response
        .status(401)
        .json({
          message:
            "Acesso restrito! Você não possui permissão para editar essa sala!",
        });
      return;
    }

    const dataToUpdate = request.only([
      "numero",
      "capacidade",
      "disponibilidade",
    ]);

    sala.merge(dataToUpdate);

    await sala.save();
    response
      .status(200)
      .json({ sala: sala, message: "Sala atualizada com sucesso!" });
  }

  // Remove sala
  async remove({ params, response }) {
    const sala = await Sala.find(params.id);

    const professor_id = params.professor_id; // Pega o id do professor que fez a solicitação pelo parâmetro.

    if (!sala) {
      response.status(404).json({ message: "Sala não encontrada!" });
      return;
    }

    // Caso o professor que requisitou a atualização não seja o criador da sala, retorna um erro.
    if (professor_id != sala.professor_id) {
      response
        .status(401)
        .json({
          message:
            "Acesso restrito! Você não possui permissão para remover essa sala!",
        });
      return;
    }

    await sala.delete();

    response.status(200).json({ message: "Sala removida com sucesso!" });
  }

  // Busca dados da sala
  async find({ params, response }) {
    const sala = await Sala.find(params.id);
    if (!sala) {
      response.status(404).json({ message: "Sala não encontrada!" });
      return;
    }

    return sala;
  }
}

module.exports = SalaController;
