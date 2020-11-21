<template>
  <div class="cl-upload">
    <!-- supply h2 heading -->
    <h2 class="imgUpload">Upload an Image</h2>

    <!-- create a form that will not submit to a server but will prevent submit and
    use the upload function as a handle-->
    <form v-on:submit.prevent="upload">
      
      <input
        id="file-input"
        type="file"
        accept="image/png, image/jpeg"
        @change="handleFileChange($event)"
      />
      <!-- submit button is disabled until a file is selected -->
      <button type="submit" :disabled="filesSelected < 1">Upload</button>
    </form>

    <!-- display uploaded image if successful -->
    <section v-if="results && results.secure_url">
      <img :src="results.secure_url" :alt="results.public_id" />
    </section>

    <!-- display errors if not successful -->
    <section>
      <ul v-if="errors.length > 0">
        <li v-for="(error,index) in errors" :key="index">{{error}}</li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue'

Vue.use(axios)


export default {
  name: "CloudinaryUpload",
  components: {
    
  },
  data() {

    return {
      results: null,
      errors: [],
      file: null,
      filesSelected: 0,
      cloudName: "bicksteroo",
      preset: "foodAppPreset",
      tags: "browser-upload",
      progress: 0,
      showProgress: false,
      fileContents: null,
      formData: null,
      imageUrl: null
    };
  },
  methods: {
    // function to handle file info obtained from local
    // file system and set the file state
    handleFileChange: function(event) {
      //console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    prepareFormData: function() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
    },
    // function to handle form submit
    upload: function() {
      //no need to look at selected files if there is no cloudname or preset
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("You must enter a cloud name and preset to upload");
        return;
      }
      // clear errors
      else {
        this.errors = [];
      }
      //console.log("upload", this.file.name);
      let reader = new FileReader();
      // attach listener to be called when data from file
      reader.addEventListener(
        "load",
        function() {
          this.fileContents = reader.result;
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
            onUploadProgress: function(progressEvent) {
              //console.log("progress", progressEvent);
              this.progress = Math.round(
                (progressEvent.loaded * 100.0) / progressEvent.total
              );
              //console.log(this.progress);
            //bind "this" to access vue state during callback
            }.bind(this)
          };
          //show progress bar at beginning of post
          this.showProgress = true;
          axios(requestObj)
            .then(response => {
              this.results = response.data;
              //console.log(this.results);
              //console.log("public_id", this.results.public_id);
              this.imageUrl = this.results.secure_url;
              this.$store.commit("setUploadImageUrl", this.imageUrl)
            })
            .catch(error => {
              this.errors.push(error);
              console.log(this.error);
            })
            // .finally(() => {
            //   setTimeout(
            //     function() {
            //       this.showProgress = false;
            //     }.bind(this),
            //     1000
            //   );
            // });
        }.bind(this),
        false
      );
      // call for file read if there is a file
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: flex;
  padding: 1em;
  background: #f9f9f9;
  border: 1px solid #c1c1c1;
  margin: 1rem auto 0 auto;
  max-width: 500px;
  padding: 5px;
  border-radius: 8px;
}
form input {
  background: #fff;
  border: 1px solid #9c9c9c;
  border-radius: 5px;
  margin-top: 6px;
}
form button {
  background-color: #FE724C;
  color: white;
  font-size: 1em;
  font-weight: bold;
  width: 60%;
  height: 90%;
  border: 0;
  margin-left: 5px;
  margin-top: 20px;
  border-radius: 5px;
}
form button:hover {
  background: gold;
  color: black;
}
label {
  padding: 0.5em 0.5em 0.5em 0;
}
input {
  padding: 0.7em;
  margin-bottom: 0.5rem;
}
input:focus {
  outline: 3px solid gold;
}
@media (min-width: 400px) {
  form {
    grid-template-columns: 150px 1fr;
    grid-gap: 16px;
  }
  label {
    text-align: right;
    grid-column: 1 / 2;
  }
  input,
  button {
    grid-column: 2 / 3;
  }
}
button {
  background-color: blue;
  color: white;
  font-weight: bold;
  border-radius: 10px;
}
button:focus {
  outline: none;
}
form button:disabled,
form button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
section {
  margin: 10px 0;
}
img {
  max-width: 300px;
  height: auto;
}
.imgUpload{
    text-align: center;
    color: #424242;
}
.upload{
    margin-top: 7px;
}
</style>