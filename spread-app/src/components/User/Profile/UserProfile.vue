<template>
    <div class="d-flex justify-space-between">
      <div style="width: 100%;">
        Empty space here!
      </div>
       <div class="spread_feed mx-4 px-5 py-5">
      <div class="mb-5 page_title pb-5 d-flex align-center">
          <a class="mr-3" @click="back">
            <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </a>
          <div>
            <h2 class="mb-0">{{user.name}}</h2>
            <div class="subtitle-2 text--secondary" v-if="user.spreads">
              <strong>{{ user.spreads.length }}</strong>
                Spreads
            </div>
          </div>
        </div>
        <UserProfileHeader
            :user="user"
            :auth-user="authUser"
        />
        <div class="ui stackable grid container">
            <div class="eight wide column">
                <div class="ui segment">
                    <h2 class="ui medium dividing header">Spreads</h2>

                    <Spreads
                      :spreads.sync="spreads"
                      :auth-user="authUser"
                    />
                </div>
            </div>

        </div>

    </div>
    <div>
                <WhoToFollow v-if="isLoggedIn"/>
            </div>
    </div>

</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import WhoToFollow from '@/components/User/WhoToFollow'
import Spreads from '@/components/Spread/Spreads'
import axios from 'axios'

export default {
  name: 'UserProfile',
  components: {
    UserProfileHeader,
    WhoToFollow,
    Spreads
  },
  data () {
    return {
      user: {},
      authUser: {},
      spreads: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchUser(to.params.username)

    next()
  },
  computed: {
    isLoggedIn () {
      return !!this.authUser
    }
  },
  created () {
    this.fetchUser(this.$route.params.username)

    const token = localStorage.getItem('tweetr-token')

    if (token) {
      this.fetchAuthenticatedUser(token)
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    fetchUser (username) {
      axios.get(`/${username}`).then(response => {
        this.user = response.data.data
        this.spreads = response.data.data.spreads.reverse()
      })
    },
    fetchAuthenticatedUser (token) {
      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.authUser = response.data.data
        })
    }
  }
}
</script>
