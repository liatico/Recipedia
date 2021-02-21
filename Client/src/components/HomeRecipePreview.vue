<template>
    <div id="HomeRecipePreview">
        <div class="container-row">
          <div class="container-cell">
      <div class="container-outer" style="width:100%;">
            <p class="recipeTitle" v-on:click="showFullRecipe"> {{ title }}</p><br><br>

        <div class="container-row">
          <div class="container-cell" style="border-right: 2px dashed grey; width:15%;overflow:hidden;white-space:nowrap;">
            <div class="container-row" style="overflow:hidden;white-space:nowrap;">
            
                <b><u>Time:</u></b><br><br>
                <b><u>Likes:</u></b><br><br>
                <b><u>Servings:</u></b><br><br>
                <b><u>Vegan:</u></b><br><br>
                <b><u>Vegetarian:</u></b><br><br>
                <b><u>Gluten Free:</u></b><br><br>
                <b><u>Seen Before:</u></b><br><br>
              
               <div class="container-cell" style="padding:0px 50px; width:60%">
                {{ prepareTime }} Minutes<br><br>
                {{ likes }}<br><br>
                {{ servings }}
                <br><br>
                <span v-if="isVegan == 'V'" class="t">V</span>
                <span v-if="isVegan == 'X'" class="f">X</span>
                <br><br>

                <span v-if="isVegetarian == 'V'" class="t">V</span>
                <span v-if="isVegetarian == 'X'" class="f">X</span>
                <br><br>

                <span v-if="glutenFree == 'V'" class="t">V</span>
                <span v-if="glutenFree == 'X'" class="f">X</span>
                <br><br>

                <span v-if="isWatchedBefore == 'V'" class="t">V</span>
                <span v-if="isWatchedBefore == 'X'" class="f">X</span>


                <br>
              </div>
            </div>
          </div>
          <div class="container-cell" style="width:20%;">
            <img :src="image" class="imageClass" v-on:click="showFullRecipe">

            <RecipeFavorites :isFavorite="this.isFavorite" :recipeID="this.recipeID"/>

          </div>
            
        </div>
      </div>
    </div>


        
        </div>

    <br>
    <br>
    </div>
</template>

<script>
import axios from 'axios';
import RecipeFavorites from "./RecipeFavorites.vue";

export default {
    name: "HomeRecipePreview",

    components:
    {
      RecipeFavorites
    },

    data() {
        return {

        }
    },

    props: {
        image: {
      type: String,
      required: false,
        },
        title: {
      type: String,
      required: false,
        },
        prepareTime: {
      type: Number,
      required: false,
      default: ''
        },
        likes: {
      type: Number,
      required: false,
      default: ''
        },
        isVegan: {
      type: String,
      required: false,
      default: ''
        },
        isVegetarian: {
      type: String,
      required: false,
      default: ''
        },
        glutenFree: {
      type: String,
      required: false,
      default: ''
        },
        isWatchedBefore: {
      type: String,
      required: false,
      default: ''
        },
        isFavorite: {
      type: String,
      required: false,
      default: ''
        },
        ingredients: {
      type: String,
      required: false,
      default: ''
        },
        instructions: {
      type: String,
      required: false,
      default: ''
        },
        recipeID: {
      type: String,
      required: false,
      default: ''
        },
        servings: {
      type: String,
      required: false,
      default: ''
        },

    },

    mounted()
    {

    },
  methods:{
      showFullRecipe: function()
      {


          let rec = {
            image: this.image,
            title: this.title,
            prepareTime: this.prepareTime,
            likes: this.likes,
            isVegan: this.isVegan,
            isVegetarian: this.isVegetarian,
            glutenFree: this.glutenFree,
            isWatchedBefore: this.isWatchedBefore,
            isFavorite: this.isFavorite,
            ingredients: this.ingredients,
            instructions: this.instructions,
            recipeID: this.recipeID,
            servings: this.servings
          };


          if (window.$cookies.isKey("userid"))
          {
            let uid = window.$cookies.get("userid");

            const res = axios.post('http://localhost:3000/user/addViewedRecipe', {recipeID: this.recipeID, user_id: uid}).then(response => {
            }).
            catch(error => {
              alert(error);
            })
          }
          this.$root.$router.push({name: "FullRecipe", params: {recipe: rec}});

      },




}
    
    
}

</script>

<style>
</style>