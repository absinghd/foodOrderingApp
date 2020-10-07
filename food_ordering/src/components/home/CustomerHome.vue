<template>

  <v-app class="mainContainer">
          <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-orange--text text--accent-3"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>

            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Current Order</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
      <v-toolbar-title app class="headline">
        <span>foodOrdering app</span>
      </v-toolbar-title>
    <router-view/>
  </v-app>

</template>

<script>
export default {
    name: 'CustomerHome',
    data(){
        return{
            user: this.$store.getters.getUser,
            group:null,

        }
    },
    computed:{
        // drawer(){
        //     return this.$store.getters.getDrawer;

        drawer: {
           get(){
             return this.$store.getters.getDrawer;
           },
           set(){
             return null
           } 
        }
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
}

</style>