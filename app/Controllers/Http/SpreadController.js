'use strict'
const Spread = use('App/Models/Spread')
const Reply = use('App/Models/Reply')

class SpreadController {
async spread ({ request, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // Save spread to database
    const spread = await Spread.create({
        user_id: user.id,
        spread: request.input('spread')
    })

    // fetch spread's relations
    await spread.loadMany(['user', 'favorites', 'replies'])

    return response.json({
        status: 'success',
        message: 'You spreaded your thoughts!',
        data: spread
    })
  }
  async show ({ params, response }) {
    try {
        const spread = await Spread.query()
            .where('id', params.id)
            .with('user')
            .with('replies')
            .with('replies.user')
            .with('favorites')
            .firstOrFail()

        return response.json({
            status: 'success',
            data: spread
        })
    } catch (error) {
        return response.status(404).json({
            status: 'error',
            message: 'Spread not found'
        })
    }
  }
  async reply ({ request, auth, params, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // get spread with the specified ID
    const spread = await Spread.find(params.id)

    // persist to database
    const reply = await Reply.create({
        user_id: user.id,
        spread_id: spread.id,
        reply: request.input('reply')
    })

    // fetch user that made the reply
    await reply.load('user')

    return response.json({
        status: 'success',
        message: 'Reply posted!',
        data: reply
    })
  }
  async destroy ({ request, auth, params, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // get spread with the specified ID
    const spread = await Spread.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

    await spread.delete()

    return response.json({
        status: 'success',
        message: 'Spread deleted!',
        data: null
    })
  }
}

module.exports = SpreadController
