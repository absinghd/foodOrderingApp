<template>
  <v-app class="mainContainer">

    <span class="thankYou">
      <b>Thanks for placing your order {{ this.user.displayName }}!</b>
    </span> <br>
    <p class="order">
      Here is what you ordered:
      <span>
        <p v-for="(item, i) in menuItems" :key="i">
          <span v-if="item.quantity == 1">
            - {{ item.quantity }} order of {{ item.name }}
          </span>
          <span v-if="item.quantity > 1">
            - {{ item.quantity }} orders of {{ item.name }}s
          </span>
        </p>
      </span>
    </p>


<div class="stripePayment">

   <stripe-checkout
    ref="checkoutRef"
    :pk="this.publishableKey"
    :items="this.items"
    :successUrl="this.successUrl"
    :cancelUrl="this.cancelUrl"
  >
    <template slot="checkout-button">
      <v-btn @click="checkout">Shut up and take my money!</v-btn>
    </template>
  </stripe-checkout>


</div>


  </v-app>
</template>

<script>
import { StripeCheckout } from 'vue-stripe-checkout';

export default {
  name: "StripePayment",

  data: function() {
    return {
      user: this.$route.params.user,
      cook: this.$route.params.cook,
      menuItems: this.$route.params.menuItems,
      group: null,
      total: this.$route.params.total,
      loaded: false,
      paidFor: false,
      product: {
        price: this.$route.params.total,
        description: "local food ordered",
        img: null,
          },
      loading: false,
    publishableKey: "pk_test_51HpQXOGDIrQvF26nD17QCjCkN6C1x5mjSxaMRFayrv86r1d9oqozLRd2PvxcooAUPfazVz3ohjs2nVLFVUeFJzi700Ju3ASAzb",
    items: [
      {
        sku: 'sku_FdQKocNoVzznpJ', 
        quantity: 1
      }
    ],
    successUrl: 'https://www.google.com',
    cancelUrl: 'https://www.yahoo.com',
       }
  },
    components: {
    StripeCheckout
  },
  methods: {
      checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  },
}
</script>

<style scoped>
.mainContainer {
  background-color: #74cae0;
  padding: 10px;
}
.thankYou{
  text-align: center;
}
.paid{
  text-align: center;
}
</style>