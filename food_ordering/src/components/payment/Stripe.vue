<template>
  <stripe-checkout
    ref="checkoutRef"
    :pk="publishableKey"
    :items="items"
    :successUrl="successUrl"
    :cancelUrl="cancelUrl"
  >
    <template slot="checkout-button">
      <button @click="checkout">Shut up and take my money!</button>
    </template>
  </stripe-checkout>
</template>
 
<script>
import { StripeCheckout } from 'vue-stripe-checkout';
export default {
  components: {
    StripeCheckout
  },
  data: () => ({
    loading: false,
    publishableKey: process.env.pk_test_51HpQXOGDIrQvF26nD17QCjCkN6C1x5mjSxaMRFayrv86r1d9oqozLRd2PvxcooAUPfazVz3ohjs2nVLFVUeFJzi700Ju3ASAzb,
    items: [
      {
        sku: 'sku_FdQKocNoVzznpJ', 
        quantity: 1
      }
    ],
    successUrl: 'your-success-url',
    cancelUrl: 'your-cancel-url',
  }),
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
}
</script>