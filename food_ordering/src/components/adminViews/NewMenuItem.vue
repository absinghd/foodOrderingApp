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


    <v-form>


            <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="price"
            :rules="priceRules"
            :counter="10"
            label="Price"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="ingredients"
            :rules="ingredientRules"
            label="Ingredients"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>


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
         valid: false,
         firstname: '',
         lastname: '',
         nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
         email: '',
         emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
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
</style>