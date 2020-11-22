    printActive(status,i){
      console.log(this.activeItems);
      const db = firebase.firestore();
      let active = 'false'
      if(status !== 'true'){
        active = 'true'
      }
    db.collection("menu")
      .doc(this.menu[i].menu_id)
      .update({
        active
      })
      this.menu = [];
      db.collection("menu")
      .where("cook_uid", "==", this.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          this.menu.push(item);
        });
      });