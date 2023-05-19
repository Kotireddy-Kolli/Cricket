<template>
    <hr>
    <div class="d-flex justify-content-center flex-column align-items-center">
    <div class="toss">
        <button @click="tossButtonHandeler" class="btn btn-primary">Toss</button>
    </div>
    <h4 v-if="tossWon === 'TeamA'" class="text-info">Team A won the toss </h4>
    <h4 v-if="tossWon ==='TeamB'" class="text-info">Team B won the toss </h4>
    <h4 v-if="choice === true" class="text-info">and Choose Batting</h4>
    <h4 v-if="choice === false" class="text-info">and Choose Bolwing</h4>
    <div class='play' v-if="batting.length !== 0">
        <button @click="randomBallHandeler" class="btn btn-primary">Random Ball</button>
    </div>
    </div>
    <div class='diplay-current-player '>
        <div v-if="currentBall.length !== 0">
            <div class="h6 text-center m-3">{{this.state.playing}} is Batting</div>
            <div class="text-center">Player: <strong>{{currentBatsman}}</strong> has scored: <strong>{{currentBall.name}}</strong></div>
            <div class="scoreBoard alert alert-primary " v-if="batting === 'TeamA'">Score: {{state.totalScoreTeamA}}/{{getPlayersLeftInTeamA}} Overs: {{getNoOfBallsPlayed}}</div>
            <div class="scoreBoard alert alert-primary " v-else >Score: {{state.totalScoreTeamB}}/{{getPlayersLeftInTeamB}} Overs: {{getNoOfBallsPlayed}}</div>
        </div>
    </div>
    <div class='winner' v-if="state.playing === 'TeamA' && state.hasTeamBBattingCompleted">
        <div class="target alert alert-warning">Target: Needs{{state.totalScoreTeamB-state.totalScoreTeamA}} runs</div>
        <h3 v-if="state.totalScoreTeamA > state.totalScoreTeamB" class="text-center bg-success text-white m-4">Team A has won the MATCH</h3>
    </div>
    <div class='winner' v-else-if="state.playing === 'TeamB' && state.hasTeamABattingCompleted">
        <div class="target alert alert-warning">Target: Needs{{state.totalScoreTeamA-state.totalScoreTeamB}}</div>
        <h3 v-if="state.totalScoreTeamB > state.totalScoreTeamA"  class="text-center bg-success text-white m-4">Team B has won the MATCH</h3>
    </div>
    <div  v-if="matchStatus === 'over'">
        <h3 v-if="state.totalScoreTeamA > state.totalScoreTeamB" class="text-center bg-success text-white m-4">Team A has won the MATCH</h3>
        <h3 v-else class="text-center bg-success text-white m-4">Team B has won the MATCH</h3>
    </div>
    
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
    name : 'PlayGame',
    data(){
        return {
            state : null,
            listOfScores : [{name:'one',value:1},{name:'two',value:2},{name:'three',value:3},{name:'four',value:4},{name:'five',value:5},{name:'six',value:6},{name:'out',value:0}],
            tossWon: '',
            choice:null,
            batting:'',
            currentBall:'',
            currentBatsman:'',
            matchStatus:'',
            maxPlayers: 2,
        }
    },
    methods:{
        tossButtonHandeler: function (){
            const self=this;
            if(this.state.TeamA.length < this.maxPlayers || this.state.TeamB.length < this.maxPlayers){
                alert(`Can't Start the game without mininum players of ${this.maxPlayers}`)
                this.tossWon='';
                this.choice=null;
                this.batting='';
            }else{
                const number = Math.floor(Math.random()*2+1)
                if(number === 1){
                    this.tossWon='TeamA'
                }else{
                    this.tossWon='TeamB'
                }
                setTimeout(()=>{ //v-tick
                this.choice = confirm("Choose to Bat");
                // console.log(this.choice)
                if(this.tossWon === 'TeamA'){
                    if(this.choice === true){
                        this.batting='TeamA'
                    }else{
                        this.batting='TeamB'
                    }
                }
                else if(this.tossWon === 'TeamB'){
                    if(this.choice === true){
                        this.batting='TeamB'
                    }else{
                        this.batting='TeamA'
                    }
                }
                this.$store.commit('addBattingTeam',this.batting)
                // console.log(this.getState);
                },1000)
            }
            console.log(this.batting,this.tossWon,this.choice);
            console.log(this.getState);
            this.$store.commit('resetTeam')
        },
        randomBallHandeler: function (){
            if(this.batting.length !== 0){
                const randomScore = Math.floor(Math.random()*7)
                //this.currentBall=this.listOfScores[randomScore]
                console.log(this.currentBall);
                let currentBatsmanIndex
                if(this.batting === 'TeamA'){
                    currentBatsmanIndex=this.selectPlayer(this.state.TeamA)
                    if(currentBatsmanIndex !== -1){
                    this.currentBall=this.listOfScores[randomScore]
                    this.currentBatsman=this.state.TeamA[currentBatsmanIndex].firstName
                    this.$store.commit('updateScore',{index:currentBatsmanIndex,score:this.currentBall.value})
                    }else{
                        alert("Team A Batting has been completed")
                        if (!this.state.hasTeamBBattingCompleted){
                            this.batting = 'TeamB'
                            this.$store.commit('updateBattingTeam')
                        }else{
                            alert("Match is over")
                            this.matchStatus = 'over'
                        }
                    }
                }else{
                    currentBatsmanIndex=this.selectPlayer(this.state.TeamB)
                    if(currentBatsmanIndex !== -1){
                    this.currentBall=this.listOfScores[randomScore]
                    this.currentBatsman=this.state.TeamB[currentBatsmanIndex].firstName
                    this.$store.commit('updateScore',{index:currentBatsmanIndex,score:this.currentBall.value})
                    }else{
                        alert("Team B Batting has been completed")
                        if (!this.state.hasTeamABattingCompleted){
                            this.batting = 'TeamA'
                            this.$store.commit('updateBattingTeam')
                        }else{
                            alert("Match is over")
                            this.matchStatus = 'over'
                        }
                    }
                }
            }else{
                alert("Please Spin the toss to select the winning team")
            }
        },
        selectPlayer: function (Team){
            let indexNo = -1
            Team.forEach((player,index) => {
                //   for(let obj of player){
                if(!player.out){
                    indexNo=index;
                    return
                }
            });
            return indexNo
        }
    },
    computed: mapGetters(['getState','getPlayersLeftInTeamA','getPlayersLeftInTeamB','getNoOfBallsPlayed']),
    created(){
        this.state=this.getState
        // console.log(this.state)
    },
}
</script>

<style>
.scoreBoard{
    width: 200px;
    right: 0;
    bottom: 0;
    position: fixed;
    /* position: fixed;
    bottom: 0;
    right: 0;
    width: 200px;
    border: 3px solid #207c27; */
}
.target{
    width: 200px;
    right: 0;
    bottom: 59px;
    position: fixed;
}
</style>