
<template>

  <div id="navbar">


<span v-if="!!userLoggedIn">


      <UserNavbar></UserNavbar>

</span>
<span v-else>
      <GuestNavbar></GuestNavbar>


</span>

  </div>
  
</template>


<script>



import UserNavbar from "./UserNavbar.vue";
import GuestNavbar from "./GuestNavbar.vue";


export default {
  name: "Navbar",

  data() {
    return{
      username: '',
      userLoggedIn: ''
    }
  },

  components:
  {
      GuestNavbar, UserNavbar
  },


  methods: {

   
    },

    mounted()
    {
        if (window.$cookies.isKey("userid"))
          {
            this.userLoggedIn = true;

          }
          else
          {
            this.userLoggedIn = false;
          }

        this.$root.$on("loginEvent", () => {
            this.userLoggedIn = true;
        });

        this.$root.$on("logoutEvent", () => {
            this.userLoggedIn = false;
        });

    },

    beforeDestroy()
    {
        this.$root.$off("loginEvent");
        this.$root.$off("logoutEvent");
    }

  
};





</script>

<style>

@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";

</style>