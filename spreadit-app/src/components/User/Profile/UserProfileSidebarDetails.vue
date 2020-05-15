<template>
    <div>
        <div class="ui segment">

            <p v-if="user.bio">{{ user.bio }}</p>

            <div class="d-flex align-center">
                <div v-if="user.location">
                    <v-icon>mdi-map-marker</v-icon>
                    {{ user.location }}
                </div>
                <div class="mx-3" v-if="user.website_url">
                    <v-icon>mdi-link-variant</v-icon>
                    <a :href="user.website_url" target="_blank">{{ user.website_url.replace(/(^\w+:|^)\/\//, '') }}</a>
                </div>
                <div v-if="user.created_at">
                    <div>
                        <v-icon>mdi-calendar-month</v-icon>
                        Joined {{ user.created_at | joined }}
                    </div>
                </div>
                <div v-if="user.dob">
                    <div>
                        {{ user.dob | dob }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfileSidebarDetails',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
