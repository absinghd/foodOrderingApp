<template>
  <v-app class="mainContainer"> 
    <div v-if="!admin">
 <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="#FE724C"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue" v-click-outside="setDrawerFalse"></v-app-bar-nav-icon>

      <v-toolbar-title>Customer Navbar</v-toolbar-title>
    </v-app-bar>
    

  </v-card>
    </div>


    <div v-if="admin">
      <Navbar></Navbar>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar';


export default {
  name: 'App',
  data(){
    return{
      admin: this.$store.getters.getAdmin,
      drawer: this.$store.getters.getDrawer,
      navbarTitle: this.$store.getters.getNavbarTitle,
    }
  },
  components: {
    Navbar, 
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
  }
}
</script>

<style scoped>
.mainContainer{
  background-color: #FFE9AE;
}
</style>
