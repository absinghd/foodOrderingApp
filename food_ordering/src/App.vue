<template>
  <v-app class="mainContainer"> 

    <div v-if="!admin">
 <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar 
      color="#ff8f80"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue" v-click-outside="setDrawerFalse"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.ENV }}</v-toolbar-title>
      
    </v-app-bar>
    

  </v-card>
    </div>

    <div v-if="admin">
     
      <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar 
      color="#ff8f80"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue" v-click-outside="setDrawerFalse"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.ENV }}</v-toolbar-title>


    </v-app-bar>
    

  </v-card>

    </div>

    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      admin: this.$store.getters.getAdmin,
      drawer: this.$store.getters.getDrawer,
      navbarTitle: this.$store.getters.getNavbarTitle,
      user: this.$store.getters.getUser,
      ENV: process.env.VUE_APP_ENV === 'dev' ? 'DEV MODE' : null,
    }
  },
  methods:{
    setDrawerTrue(){
      if (this.drawer == false){ 
      this.$store.commit('setDrawerTrue');
      this.drawer= this.$store.getters.getDrawer;
      //console.log(this.drawer)
      }
      else{
      this.$store.commit('setDrawerFalse');
      this.drawer= this.$store.getters.getDrawer;
      //console.log(this.drawer);
      }
    },
      setDrawerFalse(){
      this.$store.commit('setDrawerFalse');
      this.drawer= this.$store.getters.getDrawer;
      //console.log(this.drawer);
    }
  },
  created(){
    this.user = this.$store.getters.getUser;
    this.navbarTitle = this.$store.getters.getNavbarTitle;
    //console.log(this.navbarTitle);
  }
}
</script>

<style scoped>
.mainContainer{
  background-color: #74cae0;
}
</style>
