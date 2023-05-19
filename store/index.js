// import Vuex from "vuex";
// import Vue from "vue";
// import cricketStore from "./cricketStore"

// //Load Vuex
// Vue.use(Vuex);

// // Create store(Just like root reducer)
// export default new Vuex.Store({
//     modules:{
//         cricketStore,
//     }
// })

// // export default new Vuex.Store({...cricketStore})

import { createStore } from "vuex";

const store = createStore({
  state: {
    TeamA: [],
    TeamB: [],
    playing: "",
    currentBatsman: "",
    currentBowler: "",
    hasTeamABattingCompleted: false,
    hasTeamBBattingCompleted: false,
    totalScoreTeamA: 0,
    totalScoreTeamB: 0
  },
  getters: {
    getState: (state) => state,
    getPlayersLeftInTeamA: (state) => {
      let count = 0;
      state.TeamA.forEach((player) => {
        if (!player.out) {
          count += 1;
        }
      });
      return count;
    },
    getPlayersLeftInTeamB: (state) => {
      let count = 0;
      state.TeamB.forEach((player) => {
        if (!player.out) {
          count += 1;
        }
      });
      return count;
    },
    getNoOfBallsPlayed: (state) => {
      let count = 0;
      if (state.playing === "TeamA") {
        state.TeamA.forEach((player) => {
          count += player.noOfBalls;
        });
      } else {
        state.TeamB.forEach((player) => {
          count += player.noOfBalls;
        });
      }
      return `${Math.floor(count / 6)}.${count % 6}`;
    }
  },
  actions: {
    firstNameValidation({ commit }, playload) {
      // console.log(playload);
      let index = 1;
      this.state.TeamA.forEach((player) => {
        if (player.firstName === playload.firstName) {
          index = 0;
        }
      });
      this.state.TeamB.forEach((player) => {
        if (player.firstName === playload.firstName) {
          index = 0;
        }
      });
      return index;
    },
    addPlayer({ commit }, playload) {
      commit("newPlayer", playload);
      // console.log(playload);
    }
  },
  mutations: {
    newPlayer: (state, playload) => {
      if (playload.group === "TeamA") {
        state.TeamA.push({
          firstName: playload.firstName,
          lastName: playload.lastName,
          score: 0,
          out: false,
          noOfBalls: 0
        });
      } else {
        state.TeamB.push({
          firstName: playload.firstName,
          lastName: playload.lastName,
          score: 0,
          out: false,
          noOfBalls: 0
        });
      }
    },
    addBattingTeam: (state, playload) => {
      state.playing = playload;
    },
    updateScore: (state, playload) => {
      if (state.playing === "TeamA") {
        state.TeamA[playload.index].score += playload.score;
        state.TeamA[playload.index].noOfBalls += 1;
        state.totalScoreTeamA += playload.score;
        if (playload.score === 0) {
          state.TeamA[playload.index].out = true;
        }
      }
      if (state.playing === "TeamB") {
        state.TeamB[playload.index].score += playload.score;
        state.TeamB[playload.index].noOfBalls += 1;
        state.totalScoreTeamB += playload.score;
        if (playload.score === 0) {
          state.TeamB[playload.index].out = true;
        }
      }
    },
    resetTeam: (state) => {
      state.TeamA.forEach((player) => {
        player.score = 0;
        player.noOfBalls = 0;
        player.out = false;
      });
      state.TeamB.forEach((player) => {
        player.score = 0;
        player.noOfBalls = 0;
        player.out = false;
      });
    },
    updateBattingTeam: (state) => {
      if (state.playing === "TeamA") {
        state.playing = "TeamB";
        state.hasTeamABattingCompleted = true;
      } else if (state.playing === "TeamB") {
        state.playing = "TeamA";
        state.hasTeamBBattingCompleted = true;
      }
    }
  }
});
export default store;
