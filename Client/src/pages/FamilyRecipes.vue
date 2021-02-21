
<template>

  <div id="familyRecipes">
    <div style="width: 80%; margin: 0 auto">
      <h2>Family Recipes</h2>
      <br />
      <hr />
      <br />

      <span v-if="!!userLoggedIn">

      <FamilyRecipe v-for="r in recipes"
      :key="r.id"
      :image="r.image"
      :title="r.title"
      :prepareTime="r.prepareTime"
      :likes="r.likes"
      :isVegan="r.isVegan"
      :isVegetarian="r.isVegetarian"
      :glutenFree="r.glutenFree"
      :owner="r.Owner"
      :usuallyMakingTime="r.usuallyMakingTime"
      :ingredients="r.ingredients"
      :instructions="r.instructions"
      :servings="r.servings"
      />

</span>
<span v-else>

    <div style="font-weight:bold; font-size:24px; text-align:center;">Please log-in to continue</div>

</span>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import FamilyRecipe from "../components/FamilyRecipe.vue"

const asyncLocalStorage = {

    getItem: function (key) {
        return Promise.resolve().then(function () {
            return sessionStorage.getItem(key);
        });
    },
};

export default {
  name: "FamilyRecipes",

components:
{
  FamilyRecipe
}, 
data() {
        return{

            recipes: '',
            userLoggedIn: '',
            user_id: '',

        }
    },

    mounted()
    {
    if (window.$cookies.isKey("userid"))
        {
          this.user_id = window.$cookies.get("userid");
          this.userLoggedIn = true;
          this.getFamilyRecipes();
        }
        else
        {
            this.userLoggedIn = false;
        }
    },

    methods: {

    getFamilyRecipes: function()
    {
            const res = axios.post('http://localhost:3000/recipes/myFamilyRecipes', {user_id: this.user_id}).then(response => {
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

              this.recipes[r].recipeID += '';
              this.recipes[r].servings += '';

              if (this.recipes[r].ingredients.constructor === Array)
                  this.recipes[r].ingredients = this.recipes[r].ingredients.join(", ");
              

            }
            }).catch(error => {
                alert(error);

            })
        
        },

    },

}




</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>