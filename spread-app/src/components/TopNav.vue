<template>
 <div class="top_nav_wrapper">
   <div class="top_nav">
  <v-app-bar fixed flat>
   <v-toolbar-title>
     <router-link class="item" to="/">
      <span class="font-weight-bold">SpreadIt</span>
   </router-link>
   </v-toolbar-title>

   <v-spacer></v-spacer>
   <v-text-field class="search" type="text" label="Search Spreadit" outlined rounded clearable dense>
     <v-icon slot="append">mdi-magnify</v-icon>
   </v-text-field>
   <v-spacer></v-spacer>

   <router-link class="item" to="/">
    <v-btn icon>
    <v-icon>mdi-home</v-icon>
   </v-btn>
   </router-link>
   <v-menu left bottom>
    <template v-slot:activator="{ on }">
     <v-btn icon v-on="on">
      <v-icon>mdi-account-circle</v-icon>
     </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>
        <router-link class="item" :to="`/${user.username}`">Account</router-link>
      </v-list-item-title>
      </v-list-item>
     <v-list-item>
      <v-list-item-title>
        <router-link class="item" to="/settings/profile">Settings</router-link>
      </v-list-item-title>
     </v-list-item>
     <v-list-item>
      <v-list-item-title>
        <a class="item" @click="logout">Sign out</a>
      </v-list-item-title>
     </v-list-item>
    </v-list>
   </v-menu>
  </v-app-bar>
 </div>
 </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('tweetr-token')

      this.$router.push('/login')
    }
  }
}
</script>

<style>
  .v-app-bar {
    border-bottom: 1px solid #ccc!important;
    background-color: #fff!important;
  }
  .top_nav {
    max-width: 1185px;
    margin: auto;
  }
  .v-toolbar__content {
    max-width: 1200px;
    margin: auto;
  }
  .search {
    max-height: 40px;
  }
</style>
