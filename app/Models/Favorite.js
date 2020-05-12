'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Favorite extends Model {
  spread () {
    return this.belongsTo('App/Models/Spread')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Favorite
