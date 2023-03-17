'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorsSchema extends Schema {
  up () {
    this.create('professors', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('matricula', 60).notNullable().unique()
      table.date('datanascimento', { format: 'dd-MM-yyyy'}).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('professors')
  }
}

module.exports = ProfessorsSchema
