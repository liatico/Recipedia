require("dotenv").config();
const sql = require("mssql");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let nextID = 0;


const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

initNextID();

async function execQuery(query) {
    try {
      await poolConnect;
      var result = await pool.request().query(query);
      return result.recordset;
    } catch (err) {
      return [];
    }
  };


async function getUserByUsername(username){
    const query = 'select * from dbo.users where username=' + '\'' + username+ '\'';
    try {
        res = await execQuery(query);
        if(res) return res;
        else return false;
    } catch (error) {
        console.log(error.message);
    }
};

async function initNextID()
{
  nextID = await getLastID();
};

async function getLastID(){
  const query = 'select MAX(user_id) from dbo.users';
  try {
      res = await execQuery(query);
      res = await parseAnswer(res);
      if(res[0]) return res[0];
      else return false;
  } catch (error) {
      console.log(error.message);
  }
};


async function getUserByMail(email){
  const query = 'select * from dbo.users where email='+ '\''+email+ '\'';
  try {
        res = await execQuery(query);
        if(res) return res;
        else return false;
  } catch (error) {
      console.log(error.message);
  }
};

async function addUser(username, password, email, firstName, lastName, country, picture){
  nextID++;
    const query = 'INSERT INTO dbo.users (user_id , username , password , email, first_name, last_name, country ,profile_picture) VALUES ('+ nextID +', \''+username+ '\', \''+ password+ '\' , \''+ email+ '\', \''+ firstName+ '\', \''+ lastName+ '\', \''+ country+ '\', \''+ picture+ '\')';
    try {
        res = await execQuery(query);
        
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};



async function updateObject(tableName, columnName, condition ,toUpdete){
    const query = 'update '+tableName+' set '+columnName+'='+toUpdete+' where ' + condition;
    try {
      res = await execQuery(query);
      console.log("update object successesfully")
      return true;
  } catch (error) {
      console.log(error.message);
      return false;
  }
};

async function getFamilyRecipeByID(recipeId, userId){
  const query = 'select * from dbo.family_recipes where recipe_id='+  recipeId+ ' and user_id='+ userId;
  try {
      var res = await execQuery(query);
      res = await parseAnswer(res);
      return res;
  } catch (error) {
      console.log(error.message);
  }
};

async function getAllFamilyRecipes(userId){
  const query = 'select * from dbo.family_recipes where user_id=' + userId;
  try {
      var res = await execQuery(query);
      res = await parseAnswer(res);
      return res;
  } catch (error) {
      console.log(error.message);
  }
};

async function getPersonalRecipeByID(recipeId, userId){
  const query = 'select * from dbo.personal_recipes where recipe_id=' + recipeId + ' and user_id='+userId;
  try {
      var res = await execQuery(query);
      res = await parseAnswer(res);

      return res;
    } catch (error) {
      console.log(error.message);
  }
};

async function getAllPersonalRecipes(userId){
  const query = 'select * from dbo.personal_recipes where user_id='+ userId;
  try {
      var res = await execQuery(query);
      res = await parseAnswer(res);
      return res;
    } catch (error) {
      console.log(error.message);
  }
};


async function getAllFavoriteRecipes(userId){
  const query = 'select * from dbo.favorite_recipes where user_id =' +userId;
  try {
    let res = await execQuery(query);
    let recipesIDs = [];

    for (let i = 0; i < res.length; i++)
    {
      recipesIDs.push(res[i].recipe_id);
    }

    return recipesIDs;

  } catch (error) {
      console.log(error.message);
  }
};

async function addRecipeTofavorites(recipeId,userId){
  const query = 'insert into dbo.favorite_recipes (user_id, recipe_id) values ('+userId+', '+recipeId+')';
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function removeRecipeFromfavorites(recipeId,userId){
  const query = 'delete from dbo.favorite_recipes where user_id=' + userId + ' and recipe_id='+recipeId;
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function removeRecipeFromfavorites(recipeId,userId){
  const query = 'delete from dbo.favorite_recipes where user_id='+userId+'and recipe_id='+recipeId;
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function getLastViewedRecipes(userId){
  const query = 'select TOP 3 recipe_id from last_viewd_recipes where user_id =' +userId+ ' order by time_of_viewing DESC';
  try {
      let res = await execQuery(query);
      let recipesIDs = [];

      for (let i = 0; i < res.length; i++)
      {
        recipesIDs.push(res[i].recipe_id);
      }
      return recipesIDs;

  } catch (error) {
      console.log(error.message);
  }
};

//database = 0 - spoonecular
//database = 1 - ours
async function addViewedRecipe(recipeId ,userId){
  
  const query = 'insert into dbo.last_viewd_recipes (user_id,	recipe_id, time_of_viewing) values ('+userId+', '+recipeId+', GETDATE())';
  try {
      return res = await execQuery(query);
  } catch (error) {
    updateObject("dbo.last_viewd_recipes", "time_of_viewing", "user_id="+userId+" and recipe_id="+recipeId, "GETDATE()");
  }
};

async function addRecipeToMeal(recipeId, userId, database){
  const query = 'insert into dbo.meals (user_id, recipe_id, stage ,which_database) values ('+userId+', '+recipeId+',0 ,'+database+')';
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function removeRecipeFromMeal(recipeId, userId){
  const query = 'delete from dbo.meals where user_id='+userId+' and recipe_id='+recipeId;
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

//stage is numeric 1-5 reprsent the stage in prepration of recipe
async function changeRecipeStage(recipeId, userId, stage){
  updateObject("dbo.meals", "stage", 'user_id='+userId +' and recipe_id='+recipeId, stage)
};

async function getMeal(userId){
  const query = 'select * from meals where user_id='+userId;
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function deleteMeal(userId){
  const query = 'delete from dbo.maels where user_id='+ userId;
  try {
      return res = await execQuery(query);
  } catch (error) {
      console.log(error.message);
  }
};

async function isFavorite(userId, recipeID){
  const query = 'SELECT * FROM dbo.favorite_recipes WHERE user_id ='+ userId + ' AND recipe_id = '+recipeID;
  try {
      let res = await execQuery(query);
      if (res.length === 0)
      {
        return false;
      }
      else
      {
        return true;
      }

  } catch (error) {
      console.log(error.message);
  }
};

async function isLastWatched(userId, recipeID){
  const query = 'SELECT * FROM dbo.last_viewd_recipes WHERE user_id ='+ userId + ' AND recipe_id = '+recipeID;
  try {
      let res = await execQuery(query);

      if (res.length === 0)
      {
        return false;
      }
      else
      {

        return true;
      }

  } catch (error) {
      console.log(error.message);
  }
};

exports.getUserByUsername = getUserByUsername;
exports.getUserByMail = getUserByMail;
exports.addUser = addUser;
exports.getFamilyRecipeByID = getFamilyRecipeByID;
exports.getAllFamilyRecipes = getAllFamilyRecipes;
exports.getPersonalRecipeByID = getPersonalRecipeByID;
exports.getAllPersonalRecipes = getAllPersonalRecipes;
exports.getAllFavoriteRecipes = getAllFavoriteRecipes;
exports.addRecipeTofavorites = addRecipeTofavorites;
exports.removeRecipeFromfavorites = removeRecipeFromfavorites;
exports.getLastViewedRecipes = getLastViewedRecipes;
exports.addViewedRecipe = addViewedRecipe;
exports.addRecipeToMeal = addRecipeToMeal;
exports.removeRecipeFromMeal = removeRecipeFromMeal;
exports.changeRecipeStage = changeRecipeStage;
exports.getMeal = getMeal;
exports.deleteMeal = deleteMeal;
exports.isFavorite = isFavorite;
exports.isLastWatched = isLastWatched;

async function parseAnswer(res)
{
  var array = []

  for(let i of res){
    array.push(Object.keys(i).map(key => i[key]))
}

  return array;
};