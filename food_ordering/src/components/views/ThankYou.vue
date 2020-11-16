<template>
    <v-app class="mainContainer">

            <div class="drawer">

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
          <v-list-item @click="gotoOrders">
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoMenu">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item>

            <!-- <v-list-item @click="goCustomerHistory"> -->
            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Past Orders</v-list-item-title>
          </v-list-item>



            <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    </div>


        

        <a>Thanks placing your order {{this.user.displayName}}!</a>
        <p>Here is what you ordered from {{this.cook.name}}: <a>
            <p v-for="(item, i) in menuItems" :key="i">
            {{item.quantity}} of {{item.name}}
            </p>
            </a></p>

    </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'ThankYou',
    data(){
        return{
            user: this.$route.params.user,
            cook:this.$route.params.cook,
            menuItems: this.$route.params.menuItems,
            group: null,

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
        },
    },
    methods:{
        goCustomerHome(){
            this.$router.push({ name: "CustomerHome" })
        },
        goCustomerProfile(){
            this.$router.push({ name: "CustomerProfile" })
        },
        goCustomerHistory(){
            this.$router.push({ name: "CustomerHistory" })
        },
        goCurrentOrder(){
            this.$router.push({ name: "CurrentOrder" })
        },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
        });
        this.$router.push({ name: "Login" });
    },
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
}
</style>