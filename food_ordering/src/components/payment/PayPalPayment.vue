<template>
<v-app class="mainContainer">
<p class="title">PayPal Payment Component</p>

<div>
  <div id="paypal-button-container"></div>
  <div v-if="success" class="alert alert-success">
     <strong>Success!</strong> Payment successfuly done
  </div>
  <div v-if="error" class="alert alert-danger">
     <strong>Ooops!</strong>  something went wrong
  </div>
</div>


</v-app>
</template>
 
<script>
export default {
  name:'PayPalPayment',
  data(){
    return{

    }
  },
}
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