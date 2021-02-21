<template>

  <div id="guestNavbar">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" style="color:#034F67;font-size:28px;">Recipedia</router-link>
                <img src="../assets/logo.png" width="45px" height="50px">
                <img src="../assets/sep.png" height="40px" style="padding:0px 15px;">
            </div>
            <ul class="nav navbar-nav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/search">Search</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>


            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li><router-link to="/register"><span class="glyphicon glyphicon-user"></span> Register</router-link></li>
                <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>

            </ul>
        </div>
    </nav> 

  </div>
</template>


<script>


export default {
  name: "GuestNavbar",

  data() {
    return{

    }
  },

  methods: {

   
    }

  
};





</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>