<template>
  <div class="single_spread px-5 py-5">
    <div class="mb-5 page_title pb-5 d-flex align-center">
      <a class="mr-3" @click="back">
         <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </a>
      <h2>Spread</h2>
    </div>
    <div>
      <div>
        <div class="d-flex align-center">
            <v-avatar class="mr-3">
              <v-img
                class="elevation-6"
                src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
              ></v-img>
            </v-avatar>
            <div v-if="spread.user" class="text-left">
                <router-link :to="`/${spread.user.username}`">
                  <p class="mb-0 headline">{{ spread.user.name }}</p>
                  <p class="mb-0 text--secondary">
                    {{ `@${spread.user.username}` }}
                  </p>
                </router-link>
              </div>
              </div>
          <div>
            <div class="headline py-5">{{ spread.spread }}</div>
            <SpreadReactions
              :spread="spread"
              :replies="replies"
              :favorites.sync="spread.favorites"
              :auth-user="authUser"
            />
          </div>

      </div>
      <form class="mt-5" @submit.prevent="replySpread">
        <div>
          <v-text-field
            @keyup.enter="replySpread"
            type="text"
            label="Spread your reply"
            v-model="reply"
            outlined
            rounded
            dense
          >
            <v-icon @click="replySpread" slot="append">mdi-send</v-icon>
          </v-text-field>
        </div>
      </form>

      <Replies :replies="replies" />
    </div>
  </div>
</template>

<script>
import Replies from '@/components/Spread/Replies'
import axios from 'axios'
import SpreadReactions from '@/components/Spread/SpreadReactions'

export default {
  name: 'SingleSpread',
  components: {
    Replies,
    SpreadReactions
  },
  data () {
    return {
      spread: {},
      replies: [],
      reply: '',
      authUser: {}
    }
  },
  computed: {
    isFormValid () {
      return !!this.reply
    }
  },
  created () {
    this.fetchSpread()
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.authUser = response.data.data
        })
    },
    fetchSpread () {
      axios.get(`/spreads/${this.$route.params.id}`).then(response => {
        this.spread = response.data.data
        this.replies = response.data.data.replies.reverse()
      })
    },
    back () {
      this.$router.go(-1)
    },
    replySpread () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .post(
          `/spreads/reply/${this.spread.id}`,
          { reply: this.reply },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.reply = ''

          this.replies.unshift(response.data.data)
        })
    }
  }
}
</script>

<style>
.single_spread {
  max-width: 600px;
  margin: auto;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.single_spread .page_title {
  border-bottom: 1px solid #ccc;
}
</style>
