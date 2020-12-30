<template>
    <v-app class="mainContainer">


<div class="content">
<v-img
class="image"
contain
position="center"
  lazy-src="https://picsum.photos/id/11/10/6"
  max-height="150"
  max-width="150"
 :src="userPhotoURL"
></v-img>
</div>


<div class="userInfo">
 <p>{{this.user.displayName}}</p>
 <p>{{this.user.email}}</p>
</div>



<StripeChefConnect></StripeChefConnect>

    <div class="drawer">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-orange--text text--accent-3"
          >
            <v-list-item @click="gotoOrders">
              <v-list-item-icon>
                <v-icon>mdi-home-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item @click="gotoMenu">
              <v-list-item-icon>
                <v-icon>mdi-clipboard-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Menu Items</v-list-item-title>
            </v-list-item>

            
            <v-list-item @click="gotoPastOrders">
              <v-list-item-icon>
                <v-icon>mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Past Orders</v-list-item-title>
            </v-list-item>

            <v-list-item @click="gotoChefProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
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


    </v-app>
</template>

<script>
import firebase from 'firebase'
import StripeChefConnect from '../payment/StripeChefConnect'
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
    components: {
        StripeChefConnect
  },
    methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
        });
        this.$store.commit("setAdminFalse")
        this.$store.commit("setUserLogout")
        this.$router.push({ name: "Login" });
    },
    gotoOrders() {
      this.$router.push({
        name: "Orders",
      });
    },
    gotoMenu() {
      this.$router.push({
        name: "Menu",
      });
    },
    gotoPastOrders(){
        this.$router.push({ 
        name: "PastOrders"}) 
    },
    goToAddNew(){
      this.$router.push({
      name: "NewMenuItem",
      params: { user: this.user },
    })
    },
    gotoChefProfile(){
        this.$router.push({ name: "ChefProfile" })
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
    background-color: #74cae0;
    padding: 10px;
}
.image{
    margin-top: 10px;
    border: #a2e2f0;
    border-style: solid;
}
.userInfo{
    text-align: center;
    margin-top: 50px;
    color: #d9f5fc;
}
.content{
    display: flex;
    justify-content: center;
}
</style>