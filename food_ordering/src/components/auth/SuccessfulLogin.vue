<template>
  <v-app class="mainContainer">
    <div class="login">
<p class="title">Login Successful</p>


    </div>

  </v-app>
</template>

<script>
import firebase from "firebase";


export default {
  name: "Login_00",
  data() {
    return {
      user: null,
      token: null,
      cooks: null,
      admin: false,
    };
},
created() {

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
