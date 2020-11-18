<template>
  <v-app class="mainContainer"> 
    <div v-if="!admin">
 <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="#d7a4a4"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue" v-click-outside="setDrawerFalse"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.navbarTitle }}</v-toolbar-title>
    </v-app-bar>
    

  </v-card>
    </div>


    <div v-if="admin">
     
      <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="#d7a4a4"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue" v-click-outside="setDrawerFalse"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.navbarTitle }}</v-toolbar-title>
    </v-app-bar>
    

  </v-card>

    </div>
    <router-view/>
  </v-app>
</template>

<script>
//import Navbar from './components/layout/Navbar';


export default {
  name: 'App',
  data(){
    return{
      admin: this.$store.getters.getAdmin,
      drawer: this.$store.getters.getDrawer,
      navbarTitle: this.$store.getters.getNavbarTitle,
      user: this.$store.getters.getUser,
    }
  },
  components: {
   // Navbar, 
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
  background-color: #FFE9AE;
}
</style>
