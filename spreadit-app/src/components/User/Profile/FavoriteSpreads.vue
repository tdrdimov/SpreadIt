<template>
    <div>
        <UserProfileHeader
            :user="user"
            :auth-user="authUser"
        />
        <div class="ui stackable grid container">
            <div class="four wide column">
                <UserProfileSidebarDetails :user="user"/>
            </div>
            <div class="eight wide column">
                <div class="ui segment">
                    <h2 class="ui medium dividing header">Favorites</h2>

                    <Spreads
                        :spreads.sync="onlySpreads"
                        :auth-user="authUser"
                    />
                </div>
            </div>
            <div class="four wide column">
                <WhoToFollow v-if="isLoggedIn"/>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import Spreads from '@/components/Spread/Spreads'
import WhoToFollow from '@/components/User/WhoToFollow'
import profileMixin from '@/mixins/profileMixin'

export default {
  name: 'FavoriteSpreads',
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserProfileSidebarDetails,
    Spreads,
    WhoToFollow
  },
  data () {
    return {
      user: {},
      authUser: {}
    }
  },
  computed: {
    isLoggedIn () {
      return !!this.authUser
    },
    onlySpreads () {
      if (this.user.favorites && typeof this.user.favorites !== 'undefined') {
        return Array.from(this.user.favorites, favorite => favorite.spread).reverse()
      }
      return []
    }
  }
}
</script>
