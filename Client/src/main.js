import App from './App.vue'
import VueRouter from 'vue-router'

import Register from "./pages/Register.vue"
import Login from "./pages/Login.vue"
import Logout from "./pages/Logout.vue"
import Home from "./pages/Home.vue"
import About from "./pages/About.vue"
import Search from "./pages/Search.vue"
import Favorites from "./pages/Favorites.vue"
import MyRecipes from "./pages/MyRecipes.vue"
import FamilyRecipes from "./pages/FamilyRecipes.vue"
import FullRecipe from "./pages/FullRecipe.vue"
import Contact from "./pages/Contact.vue"
import Profile from "./pages/Profile.vue"
import Results from "./pages/Results.vue"


Vue.use(VueRouter);

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Register', path: '/register', component: Register },
  { name: 'Logout', path: '/logout', component: Logout },
  { name: 'About', path: '/about', component: About },
  { name: 'Search', path: '/search', component: Search },
  { name: 'Favorites', path: '/favorites', component: Favorites },
  { name: 'MyRecipes', path: '/myRecipes', component: MyRecipes },
  { name: 'FamilyRecipes', path: '/familyRecipes', component: FamilyRecipes },
  { name: 'FullRecipe', path: '/fullRecipe', component: FullRecipe },
  { name: 'Contact', path: '/contact', component: Contact },
  { name: 'Profile', path: '/profile', component: Profile },
  { name: 'Results', path: '/results', component: Results },

];

export default routes;

const router = new VueRouter({routes});

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  alert(info);
  alert(err);
}

new Vue({
  router,
  el: '#main',
  render: h => h(App)
})


