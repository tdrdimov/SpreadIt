<template>
  <div>
    <div>
      <div class="d-flex align-center justify-space-between">
        <v-avatar size="134">
        <v-img
            class="elevation-6"
            src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
          ></v-img>
      </v-avatar>
       <div class="ui right floated horizontal list" v-if="isOwner">

          <v-btn color="primary" text rounded outlined small>
            <router-link to="/settings/profile">Edit profile</router-link>
          </v-btn>
        </div>
      </div>
      <h3 class="font-weight-bold">{{user.name}}</h3>
      <p>@{{user.username}}</p>
      <UserProfileSidebarDetails :user="user"/>
      <div>
        <div>
          <div>

          </div>
          <div class="d-flex align-center pt-3 pl-2">
            <div v-if="user.following" class="mr-3">
              <router-link :to="isOwner ? `/following` : `/${user.username}/following`">
                <strong class="title">{{ user.following.length }}</strong>
                Following
              </router-link>
            </div>
             <div v-if="user.followers" class="content">
              <router-link :to="isOwner ? `/followers` : `/${user.username}/followers`">

                <strong class="title">{{ user.followers.length }}</strong>
                Followers
              </router-link>
            </div>
          </div>
          <div class="item">
            <div v-if="user.favorites" class="content">
              <router-link :to="`/${user.username}/favorites`">
                <strong>{{ user.favorites.length }}</strong>
                Favorites
              </router-link>
            </div>
          </div>
        </div>

        <div class="ui right floated horizontal list" v-if="isLoggedIn && !isOwner">
          <button class="ui tiny primary button" v-if="isFollowing" @click="unFollow(user.id)">Unfollow</button>
          <button class="ui tiny primary button" v-else @click="follow(user.id)">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'

export default {
  name: 'UserProfileHeader',
  components: {
    UserProfileSidebarDetails
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  computed: {
    isOwner () {
      return this.user.id === this.authUser.id
    },
    isLoggedIn () {
      return !!this.authUser
    },
    isFollowing () {
      if (this.authUser.following) {
        for (const following of this.authUser.following) {
          if (following.id === this.user.id) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    follow (userId) {
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
          this.authUser.following.push({ id: userId })
        })
    },
    unFollow (userId) {
      const token = localStorage.getItem('tweetr-token')

      axios
        .delete(`/users/unfollow/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log(response)
          this.authUser.following = this.authUser.following.filter(u => {
            return u.id !== userId
          })
        })
    }
  }
}
</script>

<style lang="css">
  .user_profile {
    max-width: 600px;
    margin: auto;
  }
</style>
