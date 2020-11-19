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
            <v-list-item @click="gotoPastOrder">
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



<v-form class="form">
    <v-text-field
    v-model="name"
    label=" Name"
    >  
    </v-text-field>

    <v-text-field
    v-model="price"
    label="Price"
    prefix="$"
    >  
    </v-text-field>
    

    <v-text-field class="ingList"
    @keydown.tab.prevent="addIng"
    v-model="another"
    label="Ingredients"
    >

    </v-text-field>

<v-icon class="plusIcon" @click="addIng">mdi-plus</v-icon> 

<div class="ingsList">
    <a class="listTitle">List of Ingredients:</a><br>
    <a class="list" v-for="(ing, i) in ingredients" :key="i">
        {{ing}} <br>
    </a>
</div>

<div class="image">

<UploadPic></UploadPic>

</div>


<v-btn class="submit" @click="addMenuItem">Add</v-btn>

</v-form>


    </v-app>
</template>


<script>
import firebase from 'firebase'
import UploadPic from './UploadPic'

export default {
    name: 'NewMenuItem',
    data(){
      return{
        group: null,
        user: this.$store.getters.getUser,
        name: null,
        another: null,
        ingredients: [],
        price: null,
        feedback: null,
        imageUrl: this.$store.getters.getUploadImageUrl,
        listOfIng: null,
        }
    },
    components: {
        UploadPic
  },
    methods:{

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
        gotoOrders(){
            this.$router.push({ 
            name: "Orders"}) 
        },
        gotoMenu(){
            this.$router.push({ 
            name: "Menu"}) 
        },
        gotoPastOrder(){
            this.$router.push({ 
            name: "PastOrders"}) 
        },
        addIng(){
          if(this.another){
            this.ingredients.push(this.another)
            this.another = null
            this.feedback = null
            this.listOfIng= "List of Ingredients:"
            }else{
            this.feedback = "You must enter a value to add an ingredient"
            }   
      },
      addMenuItem(){
          const db = firebase.firestore();
          db.collection('menu').add({
                  name: this.name,
                  active: "true",
                  cook_uid: this.user.uid,
                  ingredients:this.ingredients,
                  price: this.price,
                  menu_id:null,
                  quantity: 0,
                  imageUrl: this.imageUrl,
                  cookName: this.user.displayName
              })
              .then(function(docRef) {
                //console.log("Document written with ID: ", docRef.id)
                db.collection('menu').doc(docRef.id).update({
                    menu_id: docRef.id,
                })
                
                })
              .then(() => {
              this.$router.push({
        name: "Menu",
        // params: { exercise:this.title, time: this.time },
      })
      })
    },
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
}
</script>

<style scoped>
.mainContainer {
  background-color: #ffe9ae;
}
.form{
    padding: 10px;
}
.ingList{
    margin-right: 35%;
}
.submit{
    margin-top: 20px;
    margin-left: 42%;
    margin-right:42%;
}
.plusIcon{
    margin-top: -80px;
    margin-left: 68%
}
.ingsList{
    margin-top: -40px;
}
.listTitle{
    color: black;
}
.list{
    color: #424242;
}
.image{
    padding: 0px;
    margin-top: 25px;
    text-align: left;
}
</style>