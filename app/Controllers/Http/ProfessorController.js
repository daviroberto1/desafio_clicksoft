'use strict'

const Professor = use('App/Models/Professor');

class ProfessorController {
    async create({ request,response }) {

        const dataToCreate = request.only(['nome', 'email', 'matricula', 'datanascimento']);
        const professor = await Professor.findBy('matricula', request.qs.matricula);

        if(professor) {
            response.status(422).json({message: 'Número de matrícula já existe!'})
            return
        }
        
        await Professor.create(dataToCreate);
        
        response.status(201).json({message: "Professor criado!" })
    }

    async edit({ params, request }) {
        const professor = await Professor.find(params.id);

        if(!professor) {
            res.status(404).json({ message: "Professor não encontrado!"})
            return
        }

        const dataToUpdate = request.only(['nome', 'email', 'matricula', 'datanascimento']);
    
        professor.merge(dataToUpdate);

        await professor.save();
    
        response.status(200).json({ professor});
    
    }

    async remove({ params }) {
        const professor = await Professor.find(params.id);

        if(!professor) {
            res.status(404).json({ message: "Professor não encontrado!" })
            return
        }


        await professor.delete();

        res.status(200).json({ message: "Professor removido com sucesso!" })
    }

    async find({ params }) {
        const professor = await Professor.find(params.id);
        
        if(!professor) {
            res.status(404).json({ message: "Professor não encontrado!"})
            return
        }

        response.status(200).json({ professor});
    }
}

module.exports = ProfessorController
