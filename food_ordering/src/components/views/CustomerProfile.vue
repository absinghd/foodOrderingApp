<template>
    <v-app class="mainContainer">


<v-col class="content" align-self="center">
<v-img
class="image"
contain
position="center"
  lazy-src="https://picsum.photos/id/11/10/6"
  max-height="150"
  max-width="250"
 :src="userPhotoURL"
></v-img>
</v-col>


<div class="userInfo">
 <p>{{this.user.displayName}}</p>
 <p>{{this.user.email}}</p>
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

            <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'CustomerProfile',
    data(){
        return{
            user: this.$store.getters.getUser,
            navbarTitle: this.$store.getters.getNavbarTitle,
            cook: this.$route.params.cook,
            group: null,
            userPhotoURL:null

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
    methods: {
        goCustomerHome(){
            this.$router.push({ name: "CustomerHome" })
        },
        goCustomerProfile(){
            this.$router.push({ name: "CustomerProfile" })
        },
        goCustomerHistory(){
            this.$router.push({ name: "History" })
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
    },
    created(){
        console.log(this.user);
        this.userPhotoURL = this.user.photoURL
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
    padding: 10px;
}
.image{
    margin-top: 10px;
}
.userInfo{
    text-align: center;
    margin-top: 50px;
}
.content{
    display: flex;
    justify-content: center;
}
</style>