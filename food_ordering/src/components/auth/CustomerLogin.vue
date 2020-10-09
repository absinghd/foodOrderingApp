<template>
    <div>
        <div class="login">
            <v-btn
            color='primary'
            elevation="4"
            large
            text
            @click="login"
> Google Login</v-btn>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'CustomerLogin',
    data(){
        return{
            user: null,
            token: null,
            cooks:null
        }
    },
    methods: {
        login() {
    //create a google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //login with popup window
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
        this.token = result.credential.accessToken;
        this.user = result.user;
        console.log(this.user);
        this.$store.commit("setUser");
        this.$router.push({ 
    name: "CustomerHome",
    params:{user: this.user} });
    })
    .catch((err) => {
        this.feedback = err.message;
    });
        this.$store.commit("setUser"); 

},
},
// created(){
    
// }
}
</script>

<style scoped>
.login{
  margin: 0;
  position: absolute;
  top: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>