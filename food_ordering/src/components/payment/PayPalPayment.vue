<template>
<v-app class="mainContainer">
  <script src="https://www.paypal.com/sdk/js?client-id=ARReLv-LJcOC813HUXOc_xsA6GajOhZPMgZ69QDVPZwAMPOTWVYXT2CPj6kk7fxM47bK2ymEV3oFD0Xi"></script>
<p class="title">PayPal Payment Component</p>

  <div>
    <div v-if="!paidFor">
      <h1>Buy this Lamp - ${{ product.price }} OBO</h1>

      <p>{{ product.description }}</p>

    </div>

    <div v-if="paidFor">
      <h1>Noice, you bought a beautiful lamp!</h1>
    </div>

    <div ref="paypal"></div>
  </div>


</v-app>
</template>
 
<script>

export default {
  name:'PayPalPayment',
  data(){
         return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARReLv-LJcOC813HUXOc_xsA6GajOhZPMgZ69QDVPZwAMPOTWVYXT2CPj6kk7fxM47bK2ymEV3oFD0Xi";
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
                    value: this.product.price
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
.mainContainer{
    background-color: #74cae0;
    padding: 10px;
    box-shadow: 3px 5px 5px 5px;
}
.title{
    text-align: center;
}
</style>