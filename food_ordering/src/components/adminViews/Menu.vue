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


<a>Menu</a>

<a v-for="(item,i) in menu" :key="i">
  {{item.name}} 
  <a v-if="item.active=='true'" class="active">is active

      <v-switch
      v-model="activeItems"
      :label="item.name"
      :value="item.name"
      @click="printActive"
    ></v-switch>

  </a>
  <a v-if="item.active=='false'" class="notActive">is not active

      <v-switch
      v-model="activeItems"
      :label="item.name"
      :value="item.name"
      @click="printActive"
    ></v-switch>

  </a>
</a>


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
    printActive(){
      console.log(this.activeItems);
    },
    logout() {
      this.$router.push({
        name: "Login",
      });
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
    console.log(this.activeItems);
  },
};
</script>

<style scoped>
.mainContainer {
  background-color: #ffe9ae;
}
.active{
  color: green;
}
.notActive{
  color: red;
}
</style>
