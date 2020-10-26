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

            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

<div class="button">
<div class="cooks" v-for="(cook, i) in cooks" :key="i" @click="cookMenu(cook)">
    <v-btn elevation="2"
  large block color="#FFC529"> {{cook.name}}</v-btn>
  </div>
  </div>

  </v-app>

</template>

<script>
import firebase from 'firebase'

export default {
    name: 'CustomerHome',
    data(){
        return{
            user: this.$store.getters.getUser,
            group:null,
            cooks:[]
           

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
    methods:{
        cookMenu(cook){
      this.$router.push({
        name: "CookMenu",
        params: { user: this.user, cook: cook, },
      })
        },
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
        logout(){
        this.$router.push({ 
        name: "Login"}) 
        },
    },
    created(){
        const db = firebase.firestore();
        //get all the cooks
        db.collection("admin")     
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let cook = doc.data();
            this.cooks.push(cook)
          })})
        console.log(this.cooks);
        this.user = this.$store.getters.getUser;
        this.$store.commit("setCooks", this.cooks);
        //
    }
    
}

</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
}
.button{
    padding: 15px;
    text-align: center;
    margin-top: 10px;
}
.cooks{
    margin-top: 15px;
}
</style>