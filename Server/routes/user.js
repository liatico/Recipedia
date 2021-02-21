var express = require("express");
var router = express.Router();
const dataAccess = require("../data/data_access.js")
const spoonacular = require("../Spoonacular.js");
  

router.post("/favoriteRecipes", async function (req, res) {
  if (!req.body.user_id)
  {
    res.status(405).send("Session expired, please login to continue");
  }
  else
  {
    let favoritesIDs = await dataAccess.getAllFavoriteRecipes(req.body.user_id);
    let results = [];

    if (favoritesIDs.length === 0)
    {
      res.status(404).send("No favorite recipes found");
    }
    else
    {
      for (let i = 0; i < favoritesIDs.length; i++)
      {
        let preview = await spoonacular.getSpoonacularFullRecipe(favoritesIDs[i]);
                
        results.push(preview);
      }
      res.status(200).send(results);
    }

  }
});


router.post("/addFavoriteRecipe", async function (req, res) {
  if (!req.body.user_id)
  {
    res.status(405).send("Session expired, please login to continue");
  }
  else
  {
    
    await dataAccess.addRecipeTofavorites(req.body.recipeID, req.body.user_id);
    res.status(200).send("Recipe add successfully");

  }
});

router.post("/isUsernameExists", async function (req, res) {

    let re = await dataAccess.getUserByUsername(req.body.username);
    if(re.length === 0)
    {
      res.status(200).send(false);

    }
    else
    {
      res.status(200).send(true);

    }
  
});

router.post("/removeFavoriteRecipe", async function (req, res) {
  if (!req.body.user_id)
  {
    res.status(405).send("Session expired, please login to continue");
  }
  else
  {
    
    await dataAccess.removeRecipeFromfavorites(req.body.recipeID, req.body.user_id);
    res.status(200).send("Recipe removed successfully");

  }
});

router.post("/lastWatchedRecipes", async function (req, res) {
  if (!req.body.user_id)
  {
    res.status(405).send("Session expired, please login to continue");
  }
  else
  {
    var results = await dataAccess.getLastViewedRecipes(req.body.user_id);
    previews = [];

    if (results.length === 0)
    {
      res.status(404).send("No recently watched recipes found");
    }
    else
    {
      for (let i = 0; i < results.length; i++)
      {
        let preview = await spoonacular.getSpoonacularRecipePreview(results[i], false);

        if (req.body.user_id)
        {
            preview.isFavorite = await dataAccess.isFavorite(req.body.user_id, results[i]);
            preview.isWatchedBefore = await dataAccess.isLastWatched(req.body.user_id, results[i]);
            if (preview.ingredients.constructor === Array)
              preview.ingredients = preview.ingredients.join(", ");
        }

        previews.push(preview);
      }
      
      res.status(200).send(previews);
    }

  }
});

router.post("/addViewedRecipe", async function (req, res) {
  if (!req.body.user_id)
  {
    res.status(405).send("Session expired, please login to continue");
  }
  else
  {
    await dataAccess.addViewedRecipe(req.body.recipeID, req.body.user_id);

      res.status(200).send("Recipe was viewed");
    

  }
});

router.get("*", function(req, res) {
  res.status(404).send("Page Not Found: Invalid URL was entered");
});
router.post("*", function(req, res) {
 res.status(404).send("Page Not Found: Invalid URL was entered");
});

module.exports = router;
