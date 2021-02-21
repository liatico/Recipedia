<template>
    <div id="recipePreview">

      <div class="container-outer">
        <div class="container-row">
          <div class="container-cell" style="border-right: 2px dashed grey; width:80%;">
            <p class="recipeTitle" v-on:click="showFullRecipe"> {{ title }}</p><br><br>
            <b><u>Time:</u></b> {{ prepareTime }} Minutes<br><br>
            <b><u>Likes:</u></b> {{ likes }}<br><br>
            <b><u>Servings:</u></b> {{ servings }}<br><br>
            <b><u>Owner:</u></b> {{ owner }}<br><br>
            <b><u>Making Time:</u></b> {{ usuallyMakingTime }}<br><br>
            <b><u>Ingredients:</u></b> {{ ingredients }}<br><br>
            <b><u>Instructions:</u></b> {{ instructions }}<br>
          </div>
          <div class="container-cell" style="width:20%;">
            <img :src="image" class="imageClass" v-on:click="showFullRecipe">
            <div class="container-row">
              
              <div class="container-cell">
                <b><u>Vegan:</u></b><br><br>
                <b><u>Vegetarian:</u></b><br><br>
                <b><u>Gluten Free:</u></b><br>
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
                <br>
              </div>
              </div>
          </div>
        </div>
      </div>
    <br>
    <br><br>
</div>

</template>

<script>


export default {
    name: "FamilyRecipe",

components:
{
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
        owner: {
      type: String,
      required: false,
      default: ''
        },
        usuallyMakingTime: {
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

.recipe-preview {
  display: inline-block;
  width: 260px;
  border: 1px solid #ccbba5;
  position: relative;
  margin: 10px 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
.recipe-preview .recipe-body {
  z-index: -1;
  width: 100%;
  height: 300px;
  position: relative;
}

.recipe-preview .recipe-footer {
  width: 100%;
  overflow: hidden;
}

.recipe-preview .recipe-body .recipe-image {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  /* min-height: 45px; */
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

</style>