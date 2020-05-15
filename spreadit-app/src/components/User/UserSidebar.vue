<template>
 <div>
  <div>
   <v-form>
    <v-textarea
     v-model="spread"
     :auto-grow="true"
     :clearable="true"
     :filled="false"
     :flat="true"
     :outlined="true"
     placeholder="Spread your thoughts..."
     :rounded="true"
     :rowHeight="24"
     :shaped="false"
     :single-line="true"
    ></v-textarea>

    <v-btn @click="postSpread" large rounded block color="primary" dark>Spread it</v-btn>
   </v-form>
  </div>
 </div>
</template>

<script>
import EventBus from '@/eventBus'
import axios from 'axios'

export default {
  name: 'UserSidebar',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      spread: ''
    }
  },
  computed: {
    isFormValid () {
      return !!this.spread
    }
  },
  methods: {
    postSpread () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .post(
          '/spread',
          { spread: this.spread },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          // fire an event to the event bus
          EventBus.$emit('spreadAdded', response.data.data)

          // clear input field
          this.spread = ''
        })
    }
  }
}
</script>
