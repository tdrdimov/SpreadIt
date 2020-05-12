'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reply extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  spread() {
    return this.belongsTo('App/Models/Spread')
  }
}

module.exports = Reply
