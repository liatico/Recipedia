
<template>

  <div id="search">
    <div style="width: 80%; margin: 0 auto">
      <h2>Search</h2>
      <br />
      <hr />
      <br />
      
<form>
  <div class="form-group">
    <label for="recipeSearch">Search a Recipe</label>
    <input type="text" class="form-control" id="recipeSearch" v-model="searchQuery">
  </div>

    <div class="form-group">
    <label for="resultsNum">Number of Results</label>
    <select class="form-control" id="resultsNum" v-model="numOfResults">
      <option value=5 selected>5</option>
      <option value=10>10</option>
      <option value=15>15</option>
    </select>
  </div>

    <div class="form-group">

<div class="container-row">

        <div class="container-cell">

    <label for="cuisines">Cuisine</label>
    <select class="form-control" id="cuisines" v-model="cuisine">
      <option value='' selected>No Filter</option>
      <option value='African'>African</option>
      <option value='American'>American</option>
      <option value='British'>British</option>
      <option value='Cajun'>Cajun</option>
      <option value='Caribbean'>Caribbean</option>
      <option value='Chinese'>Chinese</option>
      <option value='Eastern European'>Eastern European</option>
      <option value='European'>European</option>
      <option value='French'>French</option>
      <option value='German'>German</option>
      <option value='Greek'>Greek</option>
      <option value='Indian'>Indian</option>
      <option value='Irish'>Irish</option>
      <option value='Italian'>Italian</option>
      <option value='Japanese'>Japanese</option>
      <option value='Jewish'>Jewish</option>
      <option value='Korean'>Korean</option>
      <option value='Latin American'>Latin American</option>
      <option value='Mediterranean'>Mediterranean</option>
      <option value='Mexican'>Mexican</option>
      <option value='Middle Eastern'>Middle Eastern</option>
      <option value='Nordic'>Nordic</option>
      <option value='Southern'>Southern</option>
      <option value='Spanish'>Spanish</option>
      <option value='Thai'>Thai</option>
      <option value='Vietnamese'>Vietnamese</option>
    </select>
    </div>

    <div class="container-cell">
    <label for="diets">Diet</label>
    <select class="form-control" id="diets" v-model="diet">
      <option value='' selected>No Filter</option>
      <option value='Gluten Free'>Gluten Free</option>
      <option value='Ketogenic'>Ketogenic</option>
      <option value='Vegetarian'>Vegetarian</option>
      <option value='Lacto-Vegetarian'>Lacto-Vegetarian</option>
      <option value='Ovo-Vegetarian'>Ovo-Vegetarian</option>
      <option value='Vegan'>Vegan</option>
      <option value='Pescetarian'>Pescetarian</option>
      <option value='Paleo'>Paleo</option>
      <option value='Primal'>Primal</option>
      <option value='Whole30'>Whole30</option>
    </select>
    </div>

    <div class="container-cell">
        <label for="intolerances">Intolerances</label>
        <select class="form-control" id="intolerances" v-model="intolerances">
      <option value='' selected>No Filter</option>
      <option value='Dairy'>Dairy</option>
      <option value='Egg'>Egg</option>
      <option value='Gluten'>Gluten</option>
      <option value='Grain'>Grain</option>
      <option value='Peanut'>Peanut</option>
      <option value='Seafood'>Seafood</option>
      <option value='Sesame'>Sesame</option>
      <option value='Shellfish'>Shellfish</option>
      <option value='Soy'>Soy</option>
      <option value='Sulfite'>Sulfite</option>
      <option value='Tree Nut'>Tree Nut</option>
      <option value='Wheat'>Wheat</option>
    </select>
  </div>

  </div>
  </div>

  <label>Sort by:</label>
  <div style="padding: 0px 30px;">
  <input type="radio" name="sort" value="none" v-model="sort" checked="checked"> None<br>
  <input type="radio" name="sort" value="likes" v-model="sort"> Likes<br>
  <input type="radio" name="sort" value="time" v-model="sort"> Time<br><br>
</div>

<br>
  <b>Last Recipe Search:</b> {{ this.lastSearch }}

<br><br>
<div style="display:flex;justify-content: center;">

  <div style="padding:20px;">
    <button type="submit" v-on:click="search"><b>Search</b></button>
  </div>
  <div style="padding:20px;">
    <button type="reset" v-on:click="reset"><b>Reset</b></button>
  </div>

  </div>
</form>
      

    </div>
  </div>
</template>


<script>



import axios from 'axios';


const asyncLocalStorage = {

    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            return sessionStorage.setItem(key, value);
        });
    },
};


export default {
  name: "Search",

  data() {
    return{
        searchQuery: '',
        numOfResults: 5,
        cuisine: '',
        diet: '',
        intolerances: '',
        lastSearch: '',
        sort: 'none',
    }
  },

  created() {
    if ((this.lastSearch = sessionStorage.getItem("lastSearch")) === null)
    {
      this.lastSearch = "---";
    }

  },

  methods:
  {

    compareByLikes(a, b)
    {
      if ( a.likes < b.likes ){
        return 1;
      }
      if ( a.likes > b.likes ){
        return -1;
      }
      return 0;
    
    },

    compareByTime(a, b)
    {
      if ( a.prepareTime < b.prepareTime ){
        return -1;
      }
      if ( a.prepareTime > b.prepareTime ){
        return 1;
      }
      return 0;
    
    },

    search()
    {
      event.preventDefault();



      if (this.searchQuery === "")
      {
          this.$root.$router.push({name: "Results", params: {}});        
      }
      else
      {
      sessionStorage.setItem("lastSearch", this.searchQuery);

      let params = {
          user_id: this.user_id,
          searchQuery: this.searchQuery,
          num: this.numOfResults,
          cuisine: this.cuisine,
          diet: this.diet,
          intolerances: this.intolerances
      };

    if (window.$cookies.isKey("userid"))
        params.user_id = window.$cookies.get("userid");

    


      const res = axios.post('http://localhost:3000/recipes/search', params
        
        ).then(response => {

          let results = [];

          for (let r in response.data)
          {
            let recipe = response.data[r];

            results.push({
              title: recipe.title,
              image: recipe.image,
              prepareTime: recipe.prepareTime,
              likes: recipe.likes,
              isVegan: recipe.isVegan,
              isVegetarian: recipe.isVegetarian,
              glutenFree: recipe.glutenFree,
              isWatchedBefore: recipe.isWatchedBefore,
              isFavorite: recipe.isFavorite,
              instructions: recipe.instructions,
              ingredients: recipe.ingredients,
              recipeID: recipe.recipeID,
              servings: recipe.servings
            });


          }

          if (this.sort === "likes")
          {
            results.sort(this.compareByLikes);
          }

          if (this.sort === "time")
          {
            results.sort(this.compareByTime);
          }

        asyncLocalStorage.setItem("searchResults", JSON.stringify(results)).then(() => {
          this.$root.$router.push({name: "Results", params: {resultRecipes: results}});

        });


        }).
        catch(error => {
          alert("Error: Change Spoonacular API-Key");
        })

      }

      

    },

    reset()
    {
        this.searchQuery = '';
        this.numOfResults = 5;
        this.cuisine = '';
        this.diet = '';
        this.intolerance = '';
        this.sort = 'none';
    }

  }

}




</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";


option
{
  width:150px;
}
</style>