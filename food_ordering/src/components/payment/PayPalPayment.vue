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


    <div v-if="!paidFor">
      <h1> Price: ${{ this.total }} </h1>

      <div ref="paypal"></div>
      <!-- 
      <p>{{ product.description }}</p> -->

    </div>

    <div v-if="paidFor">
       <h1 class="paid">Thanks, {{this.cook.name}} will begin working on your order!</h1>
    </div>

   <!-- <div ref="paypal"></div>
   -->
  </v-app>
</template>

<script>
export default {
  name: "PayPalPayment",

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
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
    //&disable-funding=credit,card
      "https://www.paypal.com/sdk/js?client-id=ARReLv-LJcOC813HUXOc_xsA6GajOhZPMgZ69QDVPZwAMPOTWVYXT2CPj6kk7fxM47bK2ymEV3oFD0Xi&disable-funding=credit";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.total
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
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