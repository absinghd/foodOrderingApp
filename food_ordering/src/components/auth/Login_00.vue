<template>
  <v-app class="mainContainer">
    <div class="login">
<p class="title">firebase ui auth</p>

<section id="firebaseui-auth-container"></section>

    </div>

  </v-app>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login_00",
  data() {
    return {
      user: null,
      token: null,
      cooks: null,
      //progress: this.$store.getters.getProgress,
    };
},
created() {
       firebase.auth().onAuthStateChanged(user => {
           if (user) {
               this.user = user;
           }
       });
   },
mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
          if (!ui) {
              ui = new firebaseui.auth.AuthUI(firebase.auth());
          }
        const uiConfig = {
            signInSuccessUrl: "/home",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }

}
</script>

<style scoped>
.mainContainer {
  background-color: #74cae0;
}
.title{
  text-align: center;
  padding: 10px;
}
</style>
