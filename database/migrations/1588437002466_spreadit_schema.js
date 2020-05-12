'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpreaditSchema extends Schema {
  up () {
    this.create('spreadits', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('spreadits')
  }
}

module.exports = SpreaditSchema
