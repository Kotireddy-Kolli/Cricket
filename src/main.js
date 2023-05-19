import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import store from "../store/index";

//import components
import AddTeam from "./components/AddTeam.vue";
import DisplayPlayers from "./components/DisplayPlayers.vue";
//Lazy load unnessary components
const PlayGame = () => import("./components/PlayGame.vue");
const Error_404 = () => import("./components/Error_404.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: AddTeam,
    children: [{ path: "", name: "Display", component: DisplayPlayers }]
  },
  {
    path: "/play",
    name: "play",
    component: DisplayPlayers,
    children: [{ path: "", component: PlayGame }]
  },
  {
    path: "/:catchAll(.*)",
    name: "error-404",
    component: Error_404
  }
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
});
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
// Let app know that store is available

// console.log(store);
// new Vue({
//     el: '#app',
//     store,
//     render: h => h(App)
//   });
