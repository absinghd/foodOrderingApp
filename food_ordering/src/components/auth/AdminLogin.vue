<template>
    <div>
        
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'AdminLogin',
    data(){
        return{
            user: null,
            token: null,
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
}
</script>