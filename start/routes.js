'use strict'

const Route = use('Route')

// user signup
Route.post('/signup', 'UserController.signup').prefix('api')
// user login
Route.post('/login', 'UserController.login').prefix('api')
// user account
Route.group(() => {
  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
  Route.put('/change_password', 'UserController.changePassword')
})
  .prefix('api/account')
  .middleware(['auth:jwt'])

Route.group(() => {
  Route.get('/timeline', 'UserController.timeline')
  Route.get('/users_to_follow', 'UserController.usersToFollow')
  Route.post('/follow', 'UserController.follow')
  Route.delete('/unfollow/:id', 'UserController.unFollow')
})
  .prefix('api/users')
  .middleware(['auth:jwt'])

Route.post('/spread', 'SpreadController.spread').prefix('api').middleware(['auth:jwt'])
Route.get('/spreads/:id', 'SpreadController.show').prefix('api')
Route.post('/spreads/reply/:id', 'SpreadController.reply').prefix('api').middleware([
  'auth:jwt'
])
// Delete spread
Route.delete('/spreads/destroy/:id', 'SpreadController.destroy').prefix('api').middleware([
  'auth:jwt'
])

// spread reactions
Route.group(() => {
  // favorite spread
  Route.post('/create', 'FavoriteController.favorite')
  // unfavorite spread
  Route.delete('/destroy/:id', 'FavoriteController.unFavorite')
})
  .prefix('api/favorites')
  .middleware(['auth:jwt'])

// User profile
Route.get(':username', 'UserController.showProfile').prefix('api')

Route.any('*', ({view}) =>  {
  return view.render('index')
})