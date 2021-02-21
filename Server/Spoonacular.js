const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.spooncular_apiKey;
const apiDomain = "https://api.spoonacular.com/recipes";
const dataAccess = require("./data/data_access.js");

async function getRandomRecipesIDs()
{
    let res = await axios.get(`${apiDomain}/random?number=3&apiKey=${apiKey}`)
        let data = await getDataFromAnswer(res);
        let recipesIDs = [];
    
        for (let recipe in data.recipes)
        {
            recipesIDs.push(data.recipes[recipe].id);
        }
    
        return recipesIDs;
    
};


async function getSpoonacularRecipePreview(recipeID, includeInstructions)
{
    let res = await axios.get(`${apiDomain}/${recipeID}/information?apiKey=${apiKey}`);
    let data = await getDataFromAnswer(res);
    let preview = {}
    preview.image = data.image;
    preview.title = data.title;
    preview.prepareTime = data.readyInMinutes;
    preview.likes = data.aggregateLikes;
    preview.isVegan = data.vegan;
    preview.isVegetarian = data.vegetarian;
    preview.glutenFree = data.glutenFree;
    preview.isWatchedBefore = false;
    preview.isFavorite = false;
    preview.ingredients = await getIngredients(data.extendedIngredients);
    preview.recipeID = recipeID;
    preview.servings = data.servings;

    if (includeInstructions)
    {
        preview.instructions = data.instructions;
    }

    return preview;

};

async function getSpoonacularFullRecipe(recipeID)
{
    let recID = Number(recipeID);

    if (isNaN(recID) || recID < 1)
    {
        return [];
    }
    let res = await axios.get(`${apiDomain}/${recipeID}/information?apiKey=${apiKey}`)
        let data = await getDataFromAnswer(res);
        let fullRecipe = {}
    
        fullRecipe.image = data.image;
        fullRecipe.title = data.title;
        fullRecipe.prepareTime = data.readyInMinutes;
        fullRecipe.likes = data.aggregateLikes;
        fullRecipe.isVegan = data.vegan;
        fullRecipe.isVegetarian = data.vegetarian;
        fullRecipe.glutenFree = data.glutenFree;
        fullRecipe.isWatchedBefore = false;
        fullRecipe.isFavorite = false;
        fullRecipe.numOfPortions = data.servings;
        fullRecipe.ingredients = await getIngredients(data.extendedIngredients);
        fullRecipe.instructions = data.instructions;
        fullRecipe.recipeID = recipeID;
        fullRecipe.servings = data.servings;

        return fullRecipe;
    
};


async function getIngredients(extendedIngredients)
{
    ingredients = [];

    for (let i = 0; i < extendedIngredients.length; i++)
    {
        ingredients.push(extendedIngredients[i].amount + " " + extendedIngredients[i].unit + " of " + extendedIngredients[i].name);
    }

    return ingredients;
};

async function searchRecipes(query, numOfResults, cuisine, diet, intolerances)
{
    parameters = {}
    parameters.query = query;
    parameters.number = numOfResults;
    parameters.instructionsRequired = true;

    if (cuisine && cuisine != '')
        parameters.cuisine = cuisine;

    if (diet &&  diet != '')
        parameters.diet = diet;

    if (intolerances && intolerances != '')
        parameters.intolerances = intolerances;
        
        let res = await axios.get(`${apiDomain}/search?apiKey=${apiKey}`,
        {
            params: parameters
        }
    );
        let data = await getDataFromAnswer(res);

        let recipesIDs = [];
    
        for (let recipe in data.results)
        {
            recipesIDs.push(data.results[recipe].id);
        }
    
        return recipesIDs;


};

async function getDataFromAnswer(dataToParse)
{
    let ans = [];
    ans.push(dataToParse);
    let promiseRes = await Promise.all(ans)
    return promiseRes[0].data;
};


exports.getRandomRecipesIDs = getRandomRecipesIDs;
exports.searchRecipes = searchRecipes;
exports.getSpoonacularRecipePreview = getSpoonacularRecipePreview;
exports.getSpoonacularFullRecipe = getSpoonacularFullRecipe;
