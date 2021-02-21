var express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dataAccess = require("./data/data_access.js");
const crypto = require('crypto');
const cookieParser = require("cookie-parser");
require('dotenv').config();

var app = express();
var port = 3000;

recipesRoute = require("./routes/recipes");
userRoute = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan(":method :url :status  :response-time ms"));


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.use("/recipes", recipesRoute);
app.use("/user", userRoute);

app.post("/login", async function(req, res) {


  if (req.query === undefined || req.body.username === undefined || req.body.password === undefined)
  {
    res.status(401).send("Invalid number of fields, username and password required");
  }
  else
  {
    var user = await dataAccess.getUserByUsername(req.body.username);

    if (user.length === 0)
    {
      res.status(402).send("Invalid username or password");
    }
    else
    {
      var password = user[0].password;
      if (await hash(req.body.password) == password)
      {

        res.status(200).send(user[0]);
    
      }
      else
      {
        res.status(402).send("Invalid username or password");
      }
    }
  }
});


app.post("/register", async function(req, res) {

  if (req.query === undefined || req.body.username === undefined || req.body.firstName === undefined || req.body.lastName === undefined || req.body.country === undefined || req.body.password === undefined || req.body.passwordConfirmation === undefined || req.body.email === undefined || req.body.profilePictureURL === undefined)
  {
    res.status(401).send("Invalid number of arguments, please check the API");
  }
  else
  {

    var username = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var country = req.body.country;
    var password = req.body.password;
    var passwordConfirmation = req.body.passwordConfirmation;
    var email = req.body.email;
    var profilePictureURL = req.body.profilePictureURL;

    var user = await dataAccess.getUserByUsername(username);
    var userMail = await dataAccess.getUserByMail(email);

    if (user.length !== 0 || userMail.length !== 0)
    {
      res.status(402).send("Username or Email already exists");
    }
    else
    {

      if (password !== passwordConfirmation)
        res.status(403).send("Passwords are not the same");
        else
        {
          var newPassword = await hash(password);
          dataAccess.addUser(username, newPassword, email, firstName, lastName, country, profilePictureURL);
          res.status(200).send("Registration Succeed");

        }

    }
  }


});

app.get("/about", function(req, res) {
  var about = "About\n\nWritten by: Liat Cohen & Adir Biran\nISE 2020";
  res.status(200).send(about);
});



app.get("*", function(req, res) {
   res.status(404).send("Page Not Found: Invalid URL was entered");
 });
app.post("*", function(req, res) {
  res.status(404).send("Page Not Found: Invalid URL was entered");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

async function hash(str)
{
  var hash = await crypto.createHash('md5').update(str).digest('hex');
  return hash;
};