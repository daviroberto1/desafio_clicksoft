'use strict'

const Aluno = use('App/Models/Aluno');

class AlunoController {
    async create({ request,response }) {

        const dataToCreate = request.only(['nome', 'email', 'matricula', 'datanascimento']);
        const aluno = await Aluno.findBy('matricula', request.qs.matricula);
  
        if(aluno) {
            response.status(422).json({message: 'Número de matrícula já existe!'})
            return
        }

        await Aluno.create(dataToCreate);

        response.status(201).json({message: "Aluno criado!" })
    }

    async edit({ params, request }) {
        const aluno = await Aluno.find(params.id);

        if(!aluno) {
            response.status(422).json({message: "Aluno não encontrado!"})
            return
        }

        const dataToUpdate = request.only(['nome', 'email', 'matricula', 'datanascimento']);

        aluno.merge(dataToUpdate);

        await aluno.save();
        
        response.status(200).json({ aluno })
    }

    async remove({ params }) {
        const aluno = await Aluno.find(params.id);

        if(!aluno) {
            res.status(404).json({ message: 'Aluno não encontrado!' })
            return
        }

        await aluno.delete();

        res.status(200).json({ message: 'Aluno removido com sucesso!' })
    }

    async find({ params }) {
        const aluno = await Aluno.find(params.id);

        if(!aluno) {
            res.status(404).json({ message: 'Aluno não encontrado!' })
            return
        }
        res.status(200).json({aluno});
    }

}

module.exports = AlunoController
