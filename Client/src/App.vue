<template>
  <div id="app">


      <Navbar></Navbar>   


      <router-view></router-view>   

<br>
      <hr style="width:80%;">
      <div style="text-align:center;">
      Copyright © 07/2020, Recipedia.<br>
      All rights reserved<br><br>
      </div>
      
      </div>
</template>

<script>

import Navbar from "./components/Navbar.vue"


export default {
  name: 'App',
  data () {
    return {
      username: undefined,
      userLoggedIn: '',
    }
  },
  components: {
    Navbar
  },

}
</script>

<style>
@import "../style.css";
</style>
