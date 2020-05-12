import Vue from 'vue'
import VueRouter from 'vue-router'
// Routes
import SignUpForm from './components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings'
import Home from '@/components/Home'
import SingleSpread from '@/components/Spread/SingleSpread'
import UserProfile from '@/components/User/Profile/UserProfile'
import UsersFollowing from '@/components/User/Profile/UsersFollowing'
import UserFollowers from '@/components/User/Profile/UserFollowers'
import FavoriteSpreads from '@/components/User/Profile/FavoriteSpreads'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUpForm },
  { path: '/login', component: LogInForm },
  { path: '/settings/profile', component: UserProfileSettings },
  { path: '/settings/password', component: UserPasswordSettings },
  { path: '/:username/status/:id', component: SingleSpread, props: true },
  { path: '/:username', component: UserProfile, props: true },
  { path: '/following', component: UsersFollowing },
  { path: '/:username/following', component: UsersFollowing, props: true },
  { path: '/followers', component: UserFollowers },
  { path: '/:username/followers', component: UserFollowers, props: true },
  { path: '/favorites', component: FavoriteSpreads },
  { path: '/:username/favorites', component: FavoriteSpreads, props: true }
]

export const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})
