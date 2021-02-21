<template>
    <div id="recipeFavorites">

    <br><br>

    
      <span v-if="userLoggedIn == true && favo == 'V'" v-on:click="removeFromFavorites"><img src="../assets/remove.jpg" class="favoriteButton"></span>
      <span v-if="userLoggedIn == true && favo == 'X'" v-on:click="addToFavorites"><img src="../assets/add.jpg" class="favoriteButton"></span>
<br><br>
</div>

</template>

<script>
import axios from 'axios';

const asyncLocalStorage = {
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return sessionStorage.getItem(key);
        });
    }
};

export default {
    name: "RecipeFavorites",

components:
{
},
    data() {
        return {
          userLoggedIn: '',
          user_id: '',
          favo: '',

        }
    },


    props: {
        recipeID: {
      type: String,
      required: false,
        },
      isFavorite: {
        type: String,
        required: false,
      },

        

    },

    mounted()
    {
      this.favo = this.isFavorite;

    if (window.$cookies.isKey("userid"))
    {
      this.userLoggedIn = true;
      this.user_id = window.$cookies.get("userid");

    }
    else
    {
        this.userLoggedIn = false;
        this.user_id = '';
    }

      
    },

    methods:
    {
      
     
      addToFavorites: function()
      {

        const res = axios.post('http://localhost:3000/user/addFavoriteRecipe', {recipeID: this.recipeID, user_id: this.user_id}).then(response => {
          this.favo = "V";
          alert("Recipe was added to Favorites");
        }).
        catch(error => {
          alert(error);
        })
      },   

      
      removeFromFavorites: function()
      {

        const res = axios.post('http://localhost:3000/user/removeFavoriteRecipe', {recipeID: this.recipeID, user_id: this.user_id}).then(response => {
          this.favo = "X";
          alert("Recipe was removed from Favorites");
        }).
        catch(error => {
          alert(error);
        })
      }
    }
    
}

</script>

<style>


</style>