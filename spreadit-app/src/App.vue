<template>
 <v-app>
  <TopNav :user="user" />
  <v-container fluid class="app_container pt-12 mt-4">
   <div id="app">
    <Notification />
    <router-view :user="user" />
   </div>
  </v-container>
 </v-app>
</template>

<script>
import Notification from './components/Notification'
import TopNav from './components/TopNav'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Notification,
    TopNav
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .get('/account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.user = response.data.data
        })
    }
  }
}
</script>
