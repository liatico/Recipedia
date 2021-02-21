
<template>

  <div id="home">
        <div style="width: 80%; margin: 0 auto">
      

      <div style="text-align:center;text-decoration:underline;font-size:20px;"><b>{{ welcomeMsg }}</b></div>
      <div class="container-row">
        <div class="container-cell" style="width:40%; min-width:40%;">

      <h2>Explore New Recipes</h2>
      <br />
      <hr />

      <HomeRecipePreview v-for="r in recipes"
      :key="r.id"
      :image="r.image"
      :title="r.title"
      :prepareTime="r.prepareTime"
      :likes="r.likes"
      :isVegan="r.isVegan"
      :isVegetarian="r.isVegetarian"
      :glutenFree="r.glutenFree"
      :ingredients="r.ingredients"
      :instructions="r.instructions"
      :isWatchedBefore="r.isWatchedBefore"
      :isFavorite="r.isFavorite"
      :recipeID="r.recipeID"
      :servings="r.servings"
      />

<div style="text-align:center;">
      <button type="button" v-on:click="getRandomRecipes"><b>Generate New Recipes</b></button>
      </div>
</div>

<div class="container-cell" style="width:40%; min-width:40%;">
<span v-if="!!userLoggedIn">

<div style="text-align:center;">
      <h2>Last Watched Recipes</h2>
      <br />
      <hr />

      <HomeRecipePreview v-for="r in lastWatched"
      :key="r.id"
      :image="r.image"
      :title="r.title"
      :prepareTime="r.prepareTime"
      :likes="r.likes"
      :isVegan="r.isVegan"
      :isVegetarian="r.isVegetarian"
      :glutenFree="r.glutenFree"
      :ingredients="r.ingredients"
      :instructions="r.instructions"
      :isWatchedBefore="r.isWatchedBefore"
      :isFavorite="r.isFavorite"
      :recipeID="r.recipeID"
      :servings="r.servings"
      />

      </div>
      

</span>
<span v-else>

  <LoginComp/>
  <br><br>
</span>

</div>
</div>
      </div>
  </div>
</template>


<script>
import axios from 'axios';
import HomeRecipePreview from "../components/HomeRecipePreview.vue";
import LoginComp from "../components/LoginComp.vue";

export default {
  name: "Home",

  data() {
    return{
      recipes: '',
      lastWatched: '',
      userLoggedIn: '',
      msg: 'Welcome Guest!',
      welcomeMsg: 'Welcome Guest!',
    }
  },

  components:
  {
    HomeRecipePreview, LoginComp
  },

  mounted()
  {
    this.userLoggedIn = this.$root.$route.params.userLoggedIn;

    if (this.userLoggedIn === undefined)
    {
          if (window.$cookies.isKey("userid"))
          {
            this.userLoggedIn = true;
            this.welcomeMsg = "";

          }
          else
          {
            this.userLoggedIn = false;
            this.welcomeMsg = this.msg;

          }
    }
    else
    {
        this.userLoggedIn = true;
        this.welcomeMsg = "";

    }
    
    this.$root.$on("change", () =>
    {
      window.location.reload();
      if (window.$cookies.isKey("userid"))
          {
            this.userLoggedIn = true;
            this.welcomeMsg = "";

  }
          else
          {
            this.userLoggedIn = false;
            this.welcomeMsg = this.msg;

          }
    });


      this.getLastWatchedRecipes();
      this.getRandomRecipes();
  },

  beforeDestroy()
  {
    this.$root.$off("change");
  },

  methods: {

      getRandomRecipes()
      {

        let params = {};

        if (window.$cookies.isKey("userid"))
          {
            params.user_id = window.$cookies.get("userid");
          }
        const res = axios.post('http://localhost:3000/recipes/randomRecipes', params).then(response => {
            this.recipes = response.data;

            for (var r in this.recipes)
            {


              if (this.recipes[r].isVegan)
                this.recipes[r].isVegan = "V";
              else
                this.recipes[r].isVegan = "X";


              if (this.recipes[r].isVegetarian)
                this.recipes[r].isVegetarian = "V";
              else
                this.recipes[r].isVegetarian = "X";


              if (this.recipes[r].glutenFree)
                this.recipes[r].glutenFree = "V";
              else
                this.recipes[r].glutenFree = "X";
              
              if (this.recipes[r].isFavorite)
                this.recipes[r].isFavorite = "V";
              else
                this.recipes[r].isFavorite = "X";

              if (this.recipes[r].isWatchedBefore)
                this.recipes[r].isWatchedBefore = "V";
              else
                this.recipes[r].isWatchedBefore = "X";


              this.recipes[r].recipeID += '';
              this.recipes[r].servings += '';


              if (this.recipes[r].ingredients.constructor === Array)
                  this.recipes[r].ingredients = this.recipes[r].ingredients.join(", ");
              
            }

        }).
        catch(error => {
          alert("Error: Change Spoonacular API-Key");
        })

      },

      getLastWatchedRecipes()
      {

          if (window.$cookies.isKey("userid"))
          {
            let uid = window.$cookies.get("userid");

            const res = axios.post('http://localhost:3000/user/lastWatchedRecipes', {user_id: uid}).then(response => {
            this.lastWatched = response.data;

            for (var r in this.lastWatched)
            {


              if (this.lastWatched[r].isVegan)
                this.lastWatched[r].isVegan = "V";
              else
                this.lastWatched[r].isVegan = "X";


              if (this.lastWatched[r].isVegetarian)
                this.lastWatched[r].isVegetarian = "V";
              else
                this.lastWatched[r].isVegetarian = "X";


              if (this.lastWatched[r].glutenFree)
                this.lastWatched[r].glutenFree = "V";
              else
                this.lastWatched[r].glutenFree = "X";
              
              if (this.lastWatched[r].isFavorite)
                this.lastWatched[r].isFavorite = "V";
              else
                this.lastWatched[r].isFavorite = "X";

              if (this.lastWatched[r].isWatchedBefore)
                this.lastWatched[r].isWatchedBefore = "V";
              else
                this.lastWatched[r].isWatchedBefore = "X";

              this.lastWatched[r].recipeID += '';
              this.lastWatched[r].servings += '';

              if (this.lastWatched[r].ingredients.constructor === Array)
                  this.lastWatched[r].ingredients = this.lastWatched[r].ingredients.join(", ");

            }

            }).
            catch(error => {
              alert(error);
            })
          }

      },   
    }

  
};





</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>