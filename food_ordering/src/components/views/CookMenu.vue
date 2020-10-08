<template>
    <v-app class="mainContainer">
        

<div class="cards">
<div class="menuItems">
    <v-card elevation='2'>
        <v-card-title>{{title}}</v-card-title>
        <v-img src="https://www.handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg" max-height="150" max-width='100'></v-img>
        <v-card-text>ingredients: milk, flour, sugar</v-card-text>
    </v-card>
</div>
</div>

        <div>
            <p>{{this.cook}} </p>
            
        </div>


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
          <v-list-item @click="goCustomerHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="goCustomerProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

            <v-list-item @click="goCustomerHistory">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>

            <v-list-item @click="goCurrentOrder">
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Current Order</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    </v-app>
</template>

<script>
export default {
    name: 'CookMenu',
    data(){
        return{
            cook:this.$route.params.cook,
            group: null,
            title: 'cake',
            
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
    },
    methods: {
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
        }
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
}
.cards{
    padding: 15px;
    text-align: center;
    margin-top: 10px;
}
.menuItems{
    margin-top: 10px;
}
</style>