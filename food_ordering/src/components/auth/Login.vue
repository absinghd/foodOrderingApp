<template>
  <v-app class="mainContainer">
    <div class="login">
      <v-btn color="primary" elevation="4" large text @click="login">
        Google Login
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CustomerLogin",
  data() {
    return {
      user: null,
      token: null,
      cooks: null,
    };
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
          //log user data
          console.log(this.user);
          this.$store.commit("setUser");
          //save into users collections
          const db = firebase.firestore();
          let ref = db.collection("users").doc(this.user.uid);
          ref.get().then((doc) => {
            if (doc.exists) {
              //console.log("user already exists in collection");
              ref.update({
                name: this.user.displayName,
                email: this.user.email,
                uid: this.user.uid,
                photoUrl: this.user.photoURL,
                phoneNumber: this.user.phoneNumber,
              });
              let adminRef = db.collection("admin").doc(this.user.uid);
              adminRef.get().then((doc) => {
                if (doc.exists) {
                  this.$store.commit("setAdminTrue");
                  this.$router.push({
                    name: "Orders",
                    params: { user: this.user },
                  });
                } else {
                  this.$store.commit("setAdminFalse");
                  this.$router.push({
                    name: "CustomerHome",
                    params: { user: this.user },
                  });
                }
              });
            } else {
              ref.set({
                name: this.user.displayName,
                email: this.user.email,
                uid: this.user.uid,
                photoUrl: this.user.photoURL,
              });

              this.$router.push({
                name: "CustomerHome",
                params: { user: this.user },
              });
            }
          });
        })

        .catch((err) => {
          this.feedback = err.message;
        });
    },
  },
  // created(){

  // }
};
</script>

<style scoped>
.mainContainer {
  background-color: #ffe9ae;
}
.login {
  background-color: white;
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
