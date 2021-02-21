
<template>

  <div id="results">
    <div style="width: 80%; margin: 0 auto">
      <h2>Results</h2>
      <br />
      <hr />
      <br />
      


<span v-if="!!resultsFound">

      <RecipePreview v-for="r in recipes"
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


</span>
<span v-else>

    <div style="font-weight:bold; font-size:24px; text-align:center;">No Recipes Found!</div>

</span>

    </div>
  </div>
</template>


<script>
import RecipePreview from "../components/RecipePreview.vue"



export default {
  name: "Results",

  components: {
    RecipePreview
  },

  data() {
    return{
      recipes: '',
      resultsFound: false
    }
  },

  mounted()
  {
    this.recipes = this.$root.$route.params.resultRecipes;
    
    if (this.recipes === undefined || this.recipes.length === 0)
    {
      this.resultsFound = false;
    }
    else
    {
      this.resultsFound = true;

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



    }
    
  },

  methods:
  {

  }

}




</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>