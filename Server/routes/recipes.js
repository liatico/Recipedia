var express = require("express");
var router = express.Router();
const spoonacular = require("../Spoonacular.js");
const dataAccess = require("../data/data_access.js");



router.post("/search", async function (req, res) {

    
    if (!req.body.searchQuery || !req.body.num)
    {
        res.status(401).send("Invalid arguments, please check API");
    }

    let numb = Number(req.body.num);

    if (isNaN(numb) || numb < 0)
    {
        res.status(401).send("Invalid arguments, please check API");
    }

    if (numb === 0)
        res.status(200).send();
    

    else
    {

        let recipes = await spoonacular.searchRecipes(req.body.searchQuery, req.body.num, req.body.cuisine, req.body.diet, req.body.intolerances);
        let searchResults = [];

        for (let i = 0; i < recipes.length; i++)
        {
            let preview = await spoonacular.getSpoonacularRecipePreview(recipes[i], true);
            preview.recipeID = recipes[i];
            if (req.body.user_id)
            {
                preview.isFavorite = await dataAccess.isFavorite(req.body.user_id, recipes[i]);
                preview.isWatchedBefore = await dataAccess.isLastWatched(req.body.user_id, recipes[i]);
            }
            
            searchResults.push(preview);
        }
        
        res.status(200).send(searchResults);
    }

});

router.post("/randomRecipes", async function (req, res) {
    let recipes = await spoonacular.getRandomRecipesIDs();
    let randoms = [];

    for (let i = 0; i < recipes.length; i++)
    {
        let preview = await spoonacular.getSpoonacularRecipePreview(recipes[i], true);

        if (req.body.user_id)
        {
            preview.isFavorite = await dataAccess.isFavorite(req.body.user_id, recipes[i]);
            preview.isWatchedBefore = await dataAccess.isLastWatched(req.body.user_id, recipes[i]);
        }

        randoms.push(preview);
    }
    res.status(200).send(randoms);
});

router.post("/myFamilyRecipes", async function (req, res) {

    if (!req.body.user_id)
    {
        res.status(405).send("Session expired, please login to continue");
    }
    else
    {
        let results = await dataAccess.getAllFamilyRecipes(req.body.user_id);
        results = await getFamilyPreviews(results);
        if (results.length === 0)
        {
            res.status(404).send("No recipes found under Family recipes");
        }
        else
        {
            res.send(results);
        }
    }
});

router.post("/personalRecipes", async function (req, res) {
    if (!req.body.user_id)
    {
      res.status(405).send("Session expired, please login to continue");
    }
    else
    {
        var results = await dataAccess.getAllPersonalRecipes(req.body.user_id);
        if (results.length === 0)
        {
            res.status(404).send("No recipes found under Personal recipes");
        }
        else
        {
            res.status(200).send(results);
        }    }
});


async function personalToFullRecipe(recipe)
{
    recipe = recipe[0];
    fullRecipe = {};


    fullRecipe.image = recipe[3];
    fullRecipe.title = recipe[2];
    fullRecipe.prepareTime = recipe[4];
    fullRecipe.likes = recipe[5];
    fullRecipe.isVegan = recipe[6];
    fullRecipe.isVegetarian = recipe[7];
    fullRecipe.glutenFree = recipe[8];
    fullRecipe.numOfPortions = recipe[11];
    fullRecipe.ingredients = recipe[9];
    fullRecipe.instructions = recipe[10];

    return fullRecipe;
};

async function familyToFullRecipe(recipe)
{
    recipe = recipe[0];
    fullRecipe = {};

    fullRecipe.image = recipe[2];
    fullRecipe.title = recipe[1];
    fullRecipe.prepareTime = recipe[3];
    fullRecipe.likes = recipe[4];
    fullRecipe.isVegan = recipe[5];
    fullRecipe.isVegetarian = recipe[6];
    fullRecipe.glutenFree = recipe[7];
    fullRecipe.glutenFree = recipe[8];
    fullRecipe.Owner = recipe[10];
    fullRecipe.usuallyMakingTime = recipe[11];
    fullRecipe.numOfPortions = recipe[13];
    fullRecipe.ingredients = recipe[8];
    fullRecipe.instructions = recipe[9];

    return fullRecipe;
};

async function getFamilyPreviews(results)
{

    previews = [];
    for (let i = 0; i < results.length; i++)
    {
        let preview = {};

        preview.image = results[i][2];
        preview.title = results[i][1];
        preview.prepareTime = results[i][3];
        preview.likes = results[i][4];
        preview.isVegan = results[i][5];
        preview.isVegetarian = results[i][6];
        preview.glutenFree = results[i][7];
        preview.Owner = results[i][10];
        preview.usuallyMakingTime = results[i][11];
        preview.ingredients = results[i][8];
        preview.instructions = results[i][9];
        preview.servings = results[i][13];
        previews.push(preview);
    }

    return previews;
};

router.get("*", function(req, res) {
    res.status(404).send("Page Not Found: Invalid URL was entered");
  });
  router.post("*", function(req, res) {
   res.status(404).send("Page Not Found: Invalid URL was entered");
 });

module.exports = router;
