
<template>

  <div id="login">
    <div style="width: 80%; margin: 0 auto;">
      
        <LoginComp/>

    </div>
  </div>
</template>


<script>
import VueCookies from 'vue-cookies';
import LoginComp from "../components/LoginComp.vue";


export default {
  name: "Login",

  data() {
    return{

    }
  },

  components: 
  {
    LoginComp
  },
}





</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>