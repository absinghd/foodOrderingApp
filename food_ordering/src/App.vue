<template>
  <v-app class="mainContainer"> 
    <div v-if="admin">
 <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="#FE724C"
      dark
    >
      <v-app-bar-nav-icon @click="setDrawerTrue"></v-app-bar-nav-icon>

      <v-toolbar-title>Admin Navbar</v-toolbar-title>
    </v-app-bar>
    

  </v-card>
    </div>


    <div v-if="!admin">
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
      //drawer: this.$store.getters.getDrawer,
      group:null,
    }
  },
  components: {
    Navbar, 
  },
  methods:{
    setDrawerTrue(){
      this.$store.commit("setDrawerTrue");
      // this.drawer = this.$store.getters.getDrawer
    }
  }
}
</script>

<style scoped>
.mainContainer{
  background-color: #FFE9AE;
}
</style>
