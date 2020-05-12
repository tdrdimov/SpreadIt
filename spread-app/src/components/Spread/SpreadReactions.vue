<template>
 <div class="meta d-flex align-center">
  <a class="reply mr-5">
   <v-btn icon>
     <v-icon class="reply icon">mdi-message-text</v-icon>
   </v-btn>
   {{ replies.length }}
  </a>
  <span v-if="favorites">
    <a class="like d-flex align-center" v-if="isFavoritedByUser" @click="unFavoriteSpread">
   <v-btn icon>
     <v-icon>mdi-heart</v-icon>
   </v-btn>
   {{ favorites.length }}
  </a>
  <a class="like d-flex align-center" v-else @click="favoriteSpread">
   <v-btn icon>
     <v-icon>mdi-heart</v-icon>
   </v-btn>
   {{ favorites.length }}
  </a>
  </span>
 </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpreadReactions',
  props: {
    spread: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      required: true
    },
    favorites: {
      type: Array,
      required: false
    }
  },

  computed: {
    isFavoritedByUser () {
      if (this.favorites) {
        for (const favorite of this.favorites) {
          if (favorite.user_id === this.authUser.id) {
            return true
          }
        }
      }

      return false
    }
  },
  methods: {
    favoriteSpread () {
      const token = localStorage.getItem('tweetr-token')

      if (!token) {
        alert('You must be logged in to perform the action.')
        return
      }

      axios
        .post(
          '/favorites/create',
          { spread_id: this.spread.id },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.favorites.push(response.data.data)
        })
    },
    unFavoriteSpread () {
      const token = localStorage.getItem('tweetr-token')

      if (!token) {
        alert('You must be logged in to perform the action.')
        return
      }

      axios
        .delete(`/favorites/destroy/${this.spread.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const filteredFavorites = this.favorites.filter(favorite => {
            return favorite.user_id !== this.authUser.id
          })

          this.$emit('update:favorites', filteredFavorites)
        })
    }
  }
}
</script>
