<template>
    <div class='display-players d-flex flex-column justify-content-center align-items-center m-4'>
      <h3 class="text-center">List of Players</h3>
      <div class='TeamA m-3 shadow'>
      <div v-if="state.TeamA.length === 0">
          No players in Team A to display
      </div>
      <div v-else>
          <!-- <p>{{state.TeamA}}</p> -->
          <div class=" text-primary">Team A Players</div>
          <table class="table table-hover ">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Balls played</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="player in state.TeamA" v-bind:class="{out: player.out}">
                      <td>{{player.firstName}}</td>
                      <td>{{player.score}}</td>
                      <td>{{player.noOfBalls}}</td>
                      <!-- <td>{{player.out}}</td> -->
                  </tr>
              </tbody>
          </table>
      </div>
      </div>
      <br>
      <div class='TeamB shadow'>
      <div v-if="state.TeamB.length === 0">
          No players in Team B to display
      </div>
      <div v-else>
          <!-- <p>{{state.TeamA}}</p> -->
          <div class="text-primary">Team B Players</div>
           <table class="table table-hover ">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Balls played</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="player in state.TeamB" v-bind:class="{out: player.out}">
                      <td>{{player.firstName}}</td>
                      <td>{{player.score}}</td>
                      <td>{{player.noOfBalls}}</td>
                      <!-- <td>{{player.out}}</td> -->
                  </tr>
              </tbody>
          </table>
      </div>
      </div>
    </div>
    <router-view></router-view>
  </template>
  
  <script>
  import {mapGetters} from "vuex";
  export default {
      name : 'DisplayPlayers',
      data(){
          return {
              state: null,
          }
      },
      computed: mapGetters(['getState']),
      created(){
          this.state=this.getState
          // console.log(this.state)
      },
  
  }
  </script>
  
  <style>
  
  .TeamA, .TeamB{
      border: rgb(124, 145, 138) solid 1px;
      border-radius: 5px;
      /* width: 350px; */
      
  }
  /*
  table, tr {
    border: 1px solid rgb(90, 137, 190);
    border-collapse: collapse;
  }
  table{
      margin: auto;
      
  }
  tr, td{
      text-align: left;
      width: 100px;
  }
  */
  .out{
      background-color: rgb(241, 134, 134);
  }
  </style>