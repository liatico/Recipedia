
<template>

  <div id="loginComp">
    <div style="width: 100%; margin: 0 auto">
      <h2>Login</h2>
      <br />
      <hr />
      <br />
         
<div class="container-row" style="display:flex;justify-content: center;">

    <div class="container-cell">
        <label for="userName">Username</label><br><br><br>
        <label for="password">Password</label><br><br>
    </div>

    <div class="container-cell">
        <input type="text" id="userName" style="width:150px;display:inline-block;" v-model="userName"/><br><br><br>
        <input type="password" id="password" style="width:150px;display:inline-block;" v-model="password" /><br><br>
    </div>
</div>

<div style="display:flex;justify-content: center;color:red;">
        {{ error }}<br><br>
    </div>
</div>

<div style="display:flex;justify-content: center;">
    <div style="padding:20px;">
        <button type="submit" v-on:click="handleLogin"><b>Login</b></button><br><br>
    </div>
</div>

  <div style="font-size:20px;text-align:center;">Click <router-link to="/register">Here</router-link> to sign-up</div>

    </div>
  
</template>


<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'



export default {
  name: "LoginComp",

  data() {
    return{
        userName: "",
        password: "",
        resp: "",
        error: "",
        flag: 0
    }
  },


  methods: {

    resetErrors: function() {
        this.error = "";
        this.message = "";
    },

    handleLogin: function() {

      event.preventDefault();
      this.resetErrors();

      let flag = false;

      if (!this.userName)
      {
          flag = true;
      }

      if (!this.password)
      {
          flag = true;
      }

      if (
        this.userName.length < 3 ||
        this.userName.length > 8 ||
        !/^[a-zA-Z]+$/.test(this.userName)
      ) {
          flag = true;
      }

      if (this.password.length < 5 || this.password.length > 10) {
          flag = true;
      }

      if (!/\d/.test(this.password)) {
          flag = true;
      }

      if (/^[a-zA-Z0-9]+$/.test(this.password)) {
          flag = true;
      }

      if (flag)
      {
        this.error = "Error: Invalid username or password";
        return;
      }

    this.tryLogin(this.userName, this.password);
    
    },

    tryLogin: function (user, pass) {

        const res = axios.post('http://localhost:3000/login', {username: user, password: pass}).then(response => {
            this.resp = response.data;
            sessionStorage.setItem("userDetails", [this.resp.username, this.resp.email, this.resp.last_name, this.resp.country, this.resp.profile_picture]);
                this.$root.$emit("loginEvent");

                this.message = "Login Successful";

                VueCookies.set('userid' , this.resp.user_id, "1h");
                VueCookies.set('username' , this.resp.first_name, "1h") 
                
                let name = this.$route.name;
                if (name === "Login")
                {
                  this.$router.push('/');

                }
                else
                {
                  this.$root.$emit("change");
                  this.$root.$router.push({name: "Home", params: {userLoggedIn: true}}).catch(()=>{});

                }



        }).
        catch(error => {
            this.error = "Error: Invalid username or password";
        })
        
            
        
    
    }

  }
};





</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>