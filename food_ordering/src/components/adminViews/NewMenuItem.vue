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
            <v-list-item >
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
 
<v-btn @click="addIng">Add</v-btn>
<v-icon>mdi-plus</v-icon> 

    <p>List of Ingredients:</p>
<div.ingList>
    <a v-for="(ing, i) in ingredients" :key="i">
        {{ing}} <br>
    </a>
</div.ingList>




</v-form>


    </v-app>
</template>


<script>

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
        listOfIng: null,
        }
    },
    methods:{
        logout(){
            this.$router.push({ 
            name: "Login"}) 
        },
        gotoOrders(){
            this.$router.push({ 
            name: "Orders"}) 
        },
        gotoMenu(){
            this.$router.push({ 
            name: "Menu"}) 
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
</style>