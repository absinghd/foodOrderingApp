<template>
  <v-app class="mainContainer">
    <div class="login">
<p class="title">Order Local Food</p>

<section id="firebaseui-auth-container"></section>

    </div>

  </v-app>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "CustomerLogin",
  data() {
    return {
      user: null,
      token: null,
      cooks: null,
      admin: false,
      //progress: this.$store.getters.getProgress,
    };
},
created() {
       firebase.auth().onAuthStateChanged(user => {
           if (user) {
               this.user = user;
               this.$store.commit("setUser");
               console.log('user exists');
      //      }
      //  });
          //save into users collections
          console.log(this.user.displayName);
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

                  this.admin = true;
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

                     }
       });
          //console.log(`login created ${this.user.displayName}`);
   },
mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
          if (!ui) {
              ui = new firebaseui.auth.AuthUI(firebase.auth());
          }

    //       if(this.admin === true){
    //         const uiConfig = {
    //         signInSuccessUrl: "/orders",
    //         signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID]
    //     };
    //     ui.start("#firebaseui-auth-container", uiConfig);
    // }
    //      else{

        const uiConfig = {
            signInSuccessUrl: "/",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID,
             //firebase.auth.FacebookAuthProvider.PROVIDER_ID
             ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
   // }
  
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
