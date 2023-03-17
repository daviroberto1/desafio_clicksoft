'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalasSchema extends Schema {
  up () {
    this.create('salas', (table) => {
      table.increments()
      table.string('numero', 20).notNullable()
      table.integer('capacidade').notNullable()
      table.boolean('disponibilidade').defaultTo(true)
      table.integer('professor_id').unsigned().references('id').inTable('professors')
      table.timestamps()
    })
  }

  down () {
    this.drop('salas')
  }
}

module.exports = SalasSchema
