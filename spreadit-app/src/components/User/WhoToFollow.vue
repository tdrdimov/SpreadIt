<template>
    <div class="">
        <h2 class="pb-5">Suggestions for you</h2>

        <v-card class="mb-3" outlined v-for="user in usersToFollow" :key="user.id">
          <v-card-actions>
             <v-list-item-avatar>
              <v-img
                class="elevation-6"
                src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-left">
                <router-link :to="`/${user.username}`">
                  <p class="mb-0">{{ user.name }}</p>
                  <p class="body-2 mb-0">{{ `@${user.username}` }}</p>
                </router-link>
              </v-list-item-title>
            </v-list-item-content>
            <v-btn color="primary" text rounded outlined small @click="followUser(user.id)">Follow</v-btn>
            </v-card-actions>
            
        </v-card>
       
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WhoToFollow',
  data () {
    return {
      usersToFollow: ''
    }
  },
  created () {
    this.fetchWhoToFollow()
  },
  methods: {
    fetchWhoToFollow () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .get('/users/users_to_follow', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.usersToFollow = response.data.data
        })
    },
    followUser (userId) {
      const token = localStorage.getItem('tweetr-token')

      axios
        .post(
          '/users/follow',
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          console.log(response)
          this.usersToFollow = this.usersToFollow.filter(u => {
            return u.id !== userId
          })
        })
    }
  }
}
</script>
