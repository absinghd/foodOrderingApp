<template>
    <v-app class="mainContainer">
        
<div class="cards">
<div class="menuItems" v-for="(item, i) in menuItems" :key="i">
    <v-card elevation='2' class="card">
        <v-card-title><a class="itemTitle">{{item.name}}</a></v-card-title>
        <v-img class="image" :src="item.imageUrl" max-height="150" max-width='100'></v-img>
       
       <div class="ingredients">
        <a>Ingredients: </a>
        <a class="ingredient" v-for="(ingredient,i) in item.ingredients" :key="i"> {{ingredient}} | </a>
        </div>


        <div class="price">
        <a>Price: </a><span class="ingredient">${{item.price}}</span>
        </div>

        <div class="counter">
           <v-btn
            color="#ffb3aa"
            elevation="2"
            rounded
            
            >
            <a class="minus" @click="minusItemQuantity(item.name, item.quantity, i)"> <v-icon color="#424242">mdi-minus</v-icon> </a>
            <a class="quantity"> {{item.quantity}}</a>
            <a class="plus" @click="plusItemQuantity(item.name, item.quantity, i)"> <v-icon color="#424242">mdi-plus</v-icon> </a>
            </v-btn>
        </div>

    </v-card>
</div>

<div class="total">
<a class="total">Total: ${{this.total}}</a> <br>
</div>

<div class="notes">
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
          v-model="notes"
            label="Additional Notes"
            placeholder="Delivery preferences, allergies, etc."
            outlined
          ></v-text-field>
        </v-col>
</div>

<div class="placeOrder">
    <a class="submit"><v-btn
    @click="placeOrder"
  elevation="2"
  color="#ff8f80"
  class="placeOrderText"

>
Place Order
</v-btn>
</a>

</div>

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
//import { format } from "date-fns";

export default {
    name: 'CookMenu',
    data(){
        return{
            cook: this.$store.getters.getCook,
            group: null,
            title: null,
            navbarTitle: this.$store.getters.getNavbarTitle,
            menuItems: [],
            originalMenu: [],
            user: this.$store.getters.getUser,
            quantity:0,
            total: 0,
            itemImage: "https://cdn.shopify.com/s/files/1/0918/4570/products/noimage_ac50db86-66f8-45a1-87dd-b4b23746ce06_540x.gif?v=1597171830",
            notes: null,
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
        minusItemQuantity(item, quantity, i){
           if(quantity > 0){
          quantity--;
          this.menuItems[i].quantity = quantity
          //console.log('order '+quantity +" "+ item);          
          //console.log(this.menuItems);
          let price = this.menuItems[i].price
          this.total = this.total - (1 * price)
          console.log(this.total);
           }
        },
        plusItemQuantity(item, quantity, i){
          quantity++;
          this.menuItems[i].quantity = quantity
          //console.log('order '+quantity +" "+ item);
          let price = this.menuItems[i].price
          this.total = this.total + (1 * price)
          console.log(this.total);
          //console.log(this.menuItems);        
        },
        placeOrder(){
          //console.log('order');
            //console.log(this.menuItems);
           const db = firebase.firestore();
           const orderdRef = db.collection('orders').doc();
           const orderId = orderdRef.id;
           orderdRef
           .set({
               customerName: this.user.displayName,
               customer_uid: this.user.uid,
               customerEmail: this.user.email,
               customerPhoneNumber: this.user.phoneNumber,
               cutomerPhoto: this.user.photoURL,
               cook_uid: this.cook.uid,
               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
               menuItems: this.menuItems,
               completed: false,
               orderId: orderId,
               cookName: this.cook.name,
               total: this.total,
               notes: this.notes
               
           })
           this.$store.commit("setCurrentOrder", this.menuItems)
           //console.log('original');
            //console.log(this.originalMenu);
            //console.log(this.cook);
          this.$router.push({
        // //to the thank you page
        // name: "ThankYou",
        //to the paypal page
        name: "Test",
        params: { user: this.user, cook: this.cook, menuItems: this.menuItems, total: this.total},
      })
        },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
        });
        this.$store.commit("setAdminFalse")
        this.$router.push({ name: "Login" });
    },
    },
    created(){
        this.$store.commit("setNavbarTitle", this.cook.name);
        this.navbarTitle = this.$store.getters.getNavbarTitle;
        //console.log(this.navbarTitle);
        const db = firebase.firestore();
        //get all active menu items for cook
        const de = db.collection("menu").where("active", "==", 'true');
        de.where("cook_uid", "==", this.cook.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let item = doc.data();
            this.menuItems.push(item)
            this.originalMenu.push(item)
          })})
          //console.log(this.quantity);
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #74cae0;
}
.cards{
    padding: 15px;
    text-align: center;
    margin-top: 10px;
}
.card{
  background-color: #d9f5fc;
}
.menuItems{
    margin-top: 10px;
}
.ingredients{
    text-align: left;
    margin-left: 5px;
}
.ingredient{
    color: #424242;
}
.price{
    text-align: left;
    margin-left: 5px;
}
.counter{
    padding-bottom: 10px;
    text-align: right;
    padding-right: 10px
}
.quantity{
    font-size: 1.7em;
    color: #424242;
}
.placeOrder{
    padding: 0px;
    margin-top: -20px;
}
.placeOrderText{
    color: #424242;
}
.submit{
    text-align: center;    
}
.total{
  text-align: left;
    color: white;
    margin-top: 7px;
    font-size: 22px;
    margin-left: 3px;
}
.image{
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.minus{
  margin-right: 7px;
}
.plus{
  margin-left: 7px;
}
.itemTitle{
  font-size: .9em;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 320px){
.itemTitle{
  font-size: .7em;
}
}
@media (max-width: 360px){
.itemTitle{
  font-size: .82em;
}
}
</style>