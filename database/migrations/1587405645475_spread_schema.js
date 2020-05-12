'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpreadSchema extends Schema {
  up () {
    this.create('spreads', (table) => {
        table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.text('spread').notNullable()
        table.timestamps()
    })
}

  down () {
    this.drop('spreads')
  }
}

module.exports = SpreadSchema
