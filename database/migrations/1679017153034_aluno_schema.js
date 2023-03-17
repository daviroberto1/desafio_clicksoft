'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunosSchema extends Schema {
  up () {
    this.create('alunos', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('matricula', 60).notNullable().unique()
      table.date('datanascimento', { format: 'dd-MM-yyyy'}).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('alunos')
  }
}

module.exports = AlunosSchema
