
<template>

  <div id="profile">



<span v-if="!!userLoggedIn">

    <div style="width: 80%; margin: 0 auto">
      <h2>{{ this.firstName }} {{ this.lastName }}</h2>
      <br />
      <hr />
      <br />
      
      <div class="container-row" style="display: flex; justify-content: space-around">

      <div class="container-cell">
        <u>Username:</u><br><br><br>
        <u>Email:</u><br><br><br>
        <u>Country:</u><br>
      </div>
      <div class="container-cell">
        {{ this.userName }}<br><br><br>
        {{ this.email }}<br><br><br>
        {{ this.country }}<br>
      </div>


          <div class="container-cell">
            <img :src="profilePicture" class="imageClass" v-on:click="open_win" style="cursor:default;opacity:1;">

        </div>
    </div>




    </div>

</span>
<span v-else>

    <div style="font-weight:bold; font-size:24px; text-align:center;">Please log-in to continue</div>

</span>

  </div>
</template>


<script>

const asyncLocalStorage = {

    getItem: function (key) {
        return Promise.resolve().then(function () {
            return sessionStorage.getItem(key);
        });
    },
};

export default {
  name: "Profile",

  data() {
    return{
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        country: '',
        profilePicture: '',
        userLoggedIn: '',
    }
  },

  methods:
  {

    
    open_win: function()
    {
        var img = document.createElement("img");
        img.src = this.profilePicture;

    }
  },

  mounted()
  {

    if (window.$cookies.isKey("username"))
    {
      this.firstName = window.$cookies.get("username");
      this.userLoggedIn = true;

      asyncLocalStorage.getItem("userDetails").then(details => {
            details = details.split(",");

            this.userName = details[0];
            this.email = details[1];
            this.lastName = details[2];
            this.country = details[3];
            this.profilePicture = details[4];
            })

    }
    else
    {
        this.userLoggedIn = false;
    }
        
  }

}




</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.css";
</style>