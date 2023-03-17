'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CadeirasSchema extends Schema {
  up () {
    this.create('cadeiras', (table) => {
      table.increments()
      table.integer('numero').notNullable()
      table.integer('aluno_id').unsigned().references('id').inTable('alunos')
      table.integer('sala_id').unsigned().references('id').inTable('salas')
      table.timestamps()
    })
  }

  down () {
    this.drop('cadeiras')
  }
}

module.exports = CadeirasSchema
