<template>
 <div class="pt-12 mt-12">
  <Notification
   :message="notification.message"
   :type="notification.type"
   v-if="notification.message"
  />
  <div class="text-center pb-2">
    <Logo />
  </div>
  <p class="text-center pb-3 headline">A place to spread your knowledge and ask your most desired questions</p>
  <v-form>
   <v-container>
    <v-row justify="center" align="center">
     <v-col cols="12" sm="5">
      <h2 class="text-center pb-3 title">Log in to Spreadit</h2>
      <v-text-field type="email" label="Email" outlined required v-model="email"></v-text-field>
      <v-text-field type="password" label="Password" outlined required v-model="password"></v-text-field>
      <v-btn large @click="login" rounded block color="primary" dark>Login</v-btn>
      <p class="pt-3 text-center">
       Don't have an account?
       <v-btn text small>
        <router-link to="/signup">Sign Up</router-link>
       </v-btn>
      </p>
     </v-col>
    </v-row>
   </v-container>
  </v-form>
 </div>
</template>

<script>
import Notification from '@/components/Notification'
import Logo from '@/components/Logo'
import axios from 'axios'

export default {
  name: 'LogInForm',
  components: {
    Notification,
    Logo
  },
  data () {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')

    return token ? next('/') : next()
  },
  methods: {
    login () {
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // save token in localstorage
          localStorage.setItem('tweetr-token', response.data.data.token)

          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          // clear form inputs
          this.email = this.password = ''

          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>
