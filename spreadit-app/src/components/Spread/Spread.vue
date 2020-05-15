<template>
  <div class="spread">
    <div class="py-5">
      <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="mr-3">
          <v-img
            class="elevation-6"
            src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
          ></v-img>
        </v-avatar>

            <div class="text-left">
              <router-link class="d-flex align-center" :to="`/${spread.user.username}`">
                <p class="mb-0">{{ spread.user.name }}</p>
                <p class="mb-0 ml-3 text--secondary">{{ `@${spread.user.username}` }}</p>
                <span class="px-2">-</span>
                <div class="text--secondary">
                  {{  spread.created_at | timeAgo }}
                </div>
              </router-link>
            </div>
      </div>
      <v-menu v-if="canDeleteSpread" bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                light
                icon
                v-on="on"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="deleteSpread(spread.id)">
                <v-list-item-title>
                  <v-icon>mdi-delete</v-icon>
                    Delete spread
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </div>

      <div class="headline font-weight-bold">
        <router-link :to="`/${spread.user.username}/status/${spread.id}`">
          <div class="py-5">
            {{ spread.spread }}
          </div>
        </router-link>
      </div>

      <div>
        <div class="grow">
          <v-row class="pl-2">
            <SpreadReactions
              :spread="spread"
              :replies="spread.replies"
              :favorites.sync="spread.favorites"
              :auth-user="authUser"
            />
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpreadReactions from '@/components/Spread/SpreadReactions'
import axios from 'axios'

export default {
  name: 'Spread',
  components: {
    SpreadReactions
  },
  props: {
    spread: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  computed: {
    canDeleteSpread () {
      return this.spread.user_id === this.authUser.id
    }
  },
  methods: {
    deleteSpread (spreadId) {
      const token = localStorage.getItem('tweetr-token')
      const deleteConfirmed = confirm('Are you sure?')

      if (deleteConfirmed) {
        axios
          .delete(`/spreads/destroy/${spreadId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response);
            this.$emit('delete', spreadId)
          })
      }
    }
  }
}
</script>
