<template>
    <div id="myRecipePreview">
      <div class="container-outer">
        <div class="container-row">
          <div class="container-cell" style="border-right: 2px dashed grey; width:80%;">
            <p class="recipeTitle" v-on:click="showFullRecipe"> {{ title }}</p><br><br>
            <div class="container-row">
            
                <b><u>Time:</u></b><br><br>
                <b><u>Likes:</u></b><br><br>
                <b><u>Servings:</u></b><br><br>
                <b><u>Vegan:</u></b><br><br>
                <b><u>Vegetarian:</u></b><br><br>
                <b><u>Gluten Free:</u></b><br><br>
              
               <div class="container-cell" style="padding:0px 30px;">
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
              </div>
            </div>
          </div>
          <div class="container-cell" style="width:20%;">
            <img :src="image" class="imageClass" v-on:click="showFullRecipe">
          </div>
            
        </div>
      </div>
    <br>
    <br>
    </div>
</template>

<script>

export default {
    name: "MyRecipePreview",

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
        isWatchedBefore: {
      type: String,
      required: false,
      default: 'V'
        },
        isFavorite: {
      type: String,
      required: false,
      default: 'V'
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

    methods:
    {
      showFullRecipe: function()
      {

          if (this.ingredients.constructor === Array)
          {
            this.ingredients = this.ingredients.join(", ");
          }

          let rec = {
            image: this.image,
            title: this.title,
            prepareTime: this.prepareTime,
            likes: this.likes,
            isVegan: this.isVegan,
            isVegetarian: this.isVegetarian,
            glutenFree: this.glutenFree,
            isWatchedBefore: "V",
            isFavorite: "V",
            ingredients: this.ingredients,
            instructions: this.instructions,
            recipeID: this.recipeID,
            servings: this.servings
          };


          this.$root.$router.push({name: "FullRecipe", params: {recipe: rec}});

      },

             
    
    }
    
}

</script>

<style>
</style>