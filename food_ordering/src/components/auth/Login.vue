<template>
  <v-app class="mainContainer">
    <div class="login">
      <v-btn color="primary" elevation="4" large text @click="login">
        Google Login
      </v-btn>
    </div>
       
       <div v-if="this.progress == true" class="progress">
         <span>You're being logged in...</span>  &nbsp; &nbsp;
        <v-progress-circular
      indeterminate
      color="amber"
    ></v-progress-circular>
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
      progress: this.$store.getters.getProgress,
    };
  },
  methods: {
    login() {
      //create a google provider object
      const provider = new firebase.auth.GoogleAuthProvider();
      //login with popup window
      firebase
        .auth()
        .signInWithRedirect(provider)
        .catch((err) => {
          this.feedback = err.message;
        });
        this.$store.commit("setProgressTrue")
    },
  },
   created(){
     this.progress =this.$store.getters.getProgress
     console.log(this.progress);
          firebase.auth().getRedirectResult().then((result) => {
          if(result.credential){
          this.token = result.credential.accessToken;
          this.user = result.user;
          }
          this.$store.commit("setProgressFalse")
          //log user data
          //console.log(this.user);
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
              //let adminRef = db.collection("admin").doc(this.user.uid);
              // adminRef.get().then((doc) => {
              let rolesRef = db.collection('roles').doc(this.user.uid);
              rolesRef.get().then((doc) => {
                const rolesData = doc.data();
                if (rolesData && rolesData.cook === true) {
                  // check if role cook === true

                  this.$store.commit("setAdminTrue");
                  this.$router.push({
                    name: "Orders",
                    params: { user: this.user },
                  })
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

   }
};
</script>

<style scoped>
.mainContainer {
  background-color: #74cae0;
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
.progress{
  margin-left: auto;
  margin-right: auto;
  margin-top: 25%;

}
</style>
