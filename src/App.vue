<template>
  <div class="">
    <!-- <AddTeam />
    <hr>
    <DisplayPlayers />
    <hr>
    <PlayGame /> -->
    <nav class="navbar sticky-top justify-content-center p-2" style="background-color: #e3f2fd;">
    <router-link to="/" class="nav-item nav-link mx-4 "><strong>HOME</strong></router-link>
    <router-link to="/play" class="nav-item nav-link  mx-4 "><strong>PLAY</strong></router-link><hr>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script >
import AddTeam from './components/AddTeam.vue'
import DisplayPlayers from "./components/DisplayPlayers.vue"
import PlayGame from "./components/PlayGame.vue"

export default{
  name: 'App',
  components:{
    AddTeam,
    DisplayPlayers,
    PlayGame
  }
}
</script>

<style scoped>
/* .container{
  background-color: aquamarine;
}
strong{
  padding: 20px;
  font-size: 20px;
}*/
.nav-item{
  padding: 0 3rem;
}
.router-link-active{
  opacity: 0.7;
  cursor:default;
  color: rgb(30, 23, 124);
} 

</style>
