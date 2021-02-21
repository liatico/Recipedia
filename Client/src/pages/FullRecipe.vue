
<template>

  <div id="fullRecipe">
    <div style="width: 80%; margin: 0 auto">
      <h2>Full Recipe</h2>
      <br />
      <hr />
      <br />
      
      <span v-if="initiated == true">

      <div class="container-outer">
        <div class="container-row">
          <div class="container-cell" style="border-right: 2px dashed grey; width:80%;">
            <p class="recipeTitle" style="cursor:default;"> {{ title }}</p><br><br>
            <b><u>Time:</u></b> {{ prepareTime }} Minutes<br><br>
            <b><u>Likes:</u></b> {{ likes }}<br><br>
            <b><u>Servings:</u></b> {{ servings }}<br><br>
            <b><u>Ingredients:</u></b> {{ ingredients }}<br><br>
            <b><u>Instructions:</u></b> {{ instructions }}<br>
          </div>
          <div class="container-cell" style="width:20%;">
            <img :src="image" class="imageClass" style="cursor:default;opacity:1;">
            <div class="container-row">
              
              <div class="container-cell">
                <b><u>Vegan:</u></b><br><br>
                <b><u>Vegetarian:</u></b><br><br>
                <b><u>Gluten Free:</u></b><br><br>
                <b><u>Favorite:</u></b><br><br>
                <b><u>Seen Before:</u></b><br>
              </div>
               <div class="container-cell">
                <span v-if="isVegan == 'V'" class="t">V</span>
                <span v-if="isVegan == 'X'" class="f">X</span>
                <br><br>

                <span v-if="isVegetarian == 'V'" class="t">V</span>
                <span v-if="isVegetarian == 'X'" class="f">X</span>
                <br><br>

                <span v-if="glutenFree == 'V'" class="t">V</span>
                <span v-if="glutenFree == 'X'" class="f">X</span>
                <br><br>

                <span v-if="isFavorite == 'V'" class="t">V</span>
                <span v-if="isFavorite == 'X'" class="f">X</span>
                <br><br>

                <span v-if="isWatchedBefore == 'V'" class="t">V</span>
                <span v-if="isWatchedBefore == 'X'" class="f">X</span>
                <br>
              </div>
              </div>
          </div>
        </div>
      </div>
    <br>
    <br><br>

    <div style="text-align:center;">
      <button v-on:click="back">
        <img src="../assets/back.png" width="18" height="18" alt=""/> <b>Back</b>
        </button>
      </div>

</span>
    </div>
  </div>
</template>


<script>

const asyncLocalStorage = {

    getItem: function (key) {
        return Promise.resolve().then(function () {
            return sessionStorage.getItem(key);
        });
    },

    removeItem: function (key) {
    return Promise.resolve().then(function () {
        return sessionStorage.removeItem(key);
    });
},
};

export default {
  name: "FullRecipe",

  data() {
    return{
      lastRouteName: '',
      initiated: true,
      image: '',
      title: '',
      prepareTime: '',
      likes: '',
      isVegan: '',
      isVegetarian: '',
      glutenFree: '',
      ingredients: '',
      instructions: '',
      isFavorite: '',
      isWatchedBefore: '',
      recipeID: '',
      servings: ''
    }
  },


  methods:
  {

  },

  mounted()
  {

    let recipe = this.$root.$route.params.recipe;


    if (recipe === undefined)
    {
      this.initiated = false;
    }
    else
    {
      this.image = recipe.image;
      this.title = recipe.title;
      this.prepareTime = recipe.prepareTime;
      this.likes = recipe.likes;
      this.isVegan = recipe.isVegan;
      this.isVegetarian = recipe.isVegetarian;
      this.glutenFree = recipe.glutenFree;
      this.isFavorite = recipe.isFavorite;
      this.isWatchedBefore = recipe.isWatchedBefore;
      this.ingredients = recipe.ingredients;
      this.instructions = recipe.instructions;
      this.recipeID = recipe.recipeID;
      this.servings = recipe.servings;
    }



  },

  methods:
  {
    back()
    {
          if (this.lastRouteName === "Results")
          {
          asyncLocalStorage.getItem("searchResults").then(res => {
              
              let results = JSON.parse(res);

              for (var i in results)
              {
                if (results[i].recipeID + '' === this.recipeID + '')
                {
                  results[i].isWatchedBefore = "V";
                }
              }
              
              this.$root.$router.push({name: "Results", params: {resultRecipes: results}});
        });
        }
          else
          {
            this.$router.go(-1);

          }

    },

  },

  beforeRouteEnter(to, from, next)
  {
    next(vm => vm.lastRouteName = from.name);
  },



}




</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>