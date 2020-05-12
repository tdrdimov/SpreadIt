<template>
    <v-alert
      v-if="type"
      border="right"
      colored-border
      :type="type"
      elevation="2"
      dismissible
    >
    {{ message }}
    </v-alert>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
    }
  }
}
</script>
