<template>
  <v-app class="mainContainer">
    
    
    <div class="drawer">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
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


<p class="title">Menu</p>

<a v-for="(item,i) in menu" :key="i">

  <a v-if="item.active=='true'" class="active">

      <v-switch
      v-model="activeItems"
      :label="item.name"
      :value="item.name"
      @click="printActive('true',i)"
    ></v-switch>
    <v-icon class="delete" @click="deleteMenuItem(item.menu_id)">mdi-delete-outline</v-icon>

  </a>
  <a v-if="item.active=='false'" class="notActive">

      <v-switch
      v-model="activeItems"
      :label="item.name"
      :value="item.name"
      @click="printActive('false',i)"
    ></v-switch>
    <v-icon class="delete" @click="deleteMenuItem(item.menu_id)">mdi-delete-outline</v-icon>
  </a>
</a>

<v-btn class="button" primary @click="goToAddNew">
  Add new item
</v-btn>

  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Menu",
  data() {
    return {
      group: null,
      user: this.$store.getters.getUser,
      menu: [],
      activeItems:[],
      switch1:true,
      switch2:false,
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.getDrawer;
      },
      set() {
        return null;
      },
    },
  },
  methods: {
    printActive(status,i){
      //console.log(this.activeItems);
      //console.log(`status was ${status} for index = ${i}`);
      const db = firebase.firestore();
      if(status == 'true'){
    db.collection("menu")
      .doc(this.menu[i].menu_id)
      .update({
        active:'false'
      })
      } else{
    db.collection("menu")
      .doc(this.menu[i].menu_id)
      .update({
        active:'true'
      })
      }
      this.menu = [];
      db.collection("menu")
      .where("cook_uid", "==", this.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          this.menu.push(item);
        });
      });

     // console.log(`user_id: ${this.user.uid}`);
      // console.log(`this menu item: ${this[i]`);
    },
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
    deleteMenuItem(id) {
      const db = firebase.firestore();
      //delete doc from firestore
      db.collection('menu').doc(id).delete()
      .then(()=> {
      this.menu = [];
      db.collection("menu")
      .where("cook_uid", "==", this.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          this.menu.push(item);
        });
      });
      
      })
    }
  },
  created() {
    const db = firebase.firestore();
    //get the menu
    db.collection("menu")
      .where("cook_uid", "==", this.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          this.menu.push(item);
          if(item.active=='true'){
            this.activeItems.push(item.name)
          }
        });
      });
    //console.log(this.activeItems);
  },
};
</script>

<style scoped>
.mainContainer {
  background-color: #74cae0;
  padding: 10px;
}
.active{
  color: green;
  margin-right: 25px;
}
.notActive{
  color: red;
  margin-right: 25px;
}
.button{
  margin-left: 30%;
  margin-right: 30%;
}
.title{
    text-align: center;
    margin-bottom: -10px;
}
.delete{
  margin-left: 80%;
  margin-top: -87px;
}
</style>
