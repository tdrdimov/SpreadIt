<template>
 <div>
   <v-timeline v-if="replies.length" :align-top="true" dense>
    <v-timeline-item
      v-for="reply in replies"
      :key="reply.id"
      :right="true"
      class="mb-5"
    >
      <template v-slot:icon>
        <v-avatar>
          <v-img class="elevation-6" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"></v-img>
        </v-avatar>
      </template>
      <div>
      <div v-if="reply.user" class="text-left">
      <router-link class="d-flex align-center" :to="`/${reply.user.username}`">
       <p class="mr-2 title mb-0">{{ reply.user.name }}</p>
       <p class="mb-0 text--secondary">{{ `@${reply.user.username}` }}</p>
       <span class="px-2">-</span>
       <p class="mb-0">{{ reply.created_at | timeAgo }}</p>
      </router-link>
     </div>
     <div class="subheading">{{ reply.reply }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
 </div>
</template>

<script>
export default {
  name: 'Replies',
  props: {
    replies: {
      type: Array,
      required: true
    }
  }
}
</script>
