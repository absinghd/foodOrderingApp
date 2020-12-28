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



  </v-app>
</template>

<script>
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
          }
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