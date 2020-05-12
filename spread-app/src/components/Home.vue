<template>
    <div class="d-flex justify-space-between">
      <div class="sidebar">
            <div class="fixed">
              <UserSidebar :user="user"/>
            </div>
        </div>
        <div class="spread_feed mx-4 px-5 py-5">
            <h2 class="pb-5 page_title">Home</h2>
            <Spreads
              :spreads.sync="spreads"
              :auth-user="user"
            />
          </div>
        <div class="suggestions">
            <div class="fixed">
              <WhoToFollow/>
            </div>
        </div>
    </div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Spreads from '@/components/Spread/Spreads'
import axios from 'axios'
import WhoToFollow from '@/components/User/WhoToFollow'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    Spreads,
    WhoToFollow
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      spreads: []
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')

    return token ? next() : next('/login')
  },
  created () {
    this.fetchUserTimeline()
  },
  methods: {
    fetchUserTimeline () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .get('/users/timeline', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.spreads = response.data.data.reverse()
        })
    }
  }
}
</script>
