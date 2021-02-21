
<template>

  <div id="userNavbar">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="recipedia">Recipedia</router-link>
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
              <li><div class="dropdown">
                <div class="dropbtn" style="cursor:pointer;">Personal</div>
                <div class="dropdown-content">
                  <router-link to="/favorites">Favorites</router-link>
                  <router-link to="/myRecipes">My Recipes</router-link>
                  <router-link to="/familyRecipes">Family Recipes</router-link>
                </div>
              </div></li>
                <li><router-link to="/profile"><span class="userNameTitle"> {{ this.username }} </span></router-link></li>
                <li><router-link to="/logout"><span class="glyphicon glyphicon-log-in"></span> Logout</router-link></li>
            </ul>
        </div>
    </nav> 




  </div>
  
</template>


<script>





export default {
  name: "UserNavbar",

  data() {
    return{
      username: "",
    }
  },


  methods: {

   
    },

    mounted()
    {
        this.username = window.$cookies.get("username");
    }

  
};





</script>

<style>

@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";

.dropbtn {
  background-color: transparent;
  color: grey;
  padding: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {color:white;background-color: #333;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {color:white;background-color: transparent;}


</style>