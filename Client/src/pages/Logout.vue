
<template>

  <div id="logout">
    
  </div>
</template>


<script>
import axios from 'axios';


export default {
  name: "Logout",

  data() {
    return{

    }
  },

 mounted()
  {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userDetails");

    window.$cookies.remove("userid");
    window.$cookies.remove("username");
    this.$root.$emit("logoutEvent");

    this.$router.push('/');
  }
}





</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>