<template>
    <h3 class="h4 text-center m-4">Add Players</h3>
    <form @submit.prevent="submitHandler" class="mb-3 w-2 ">
        <label class='team '>Select  Team *</label>
        <div class="">
        <input type='radio'  value="TeamA" name="group" v-model="group" id="TeamA" required class="form-check-input "/>
        <label for="TeamA" class="">Team A</label>
        </div>
        <div class="">
        <input type='radio' value="TeamB" name="group" v-model="group" id="TeamB" class="form-check-input "/>
        <label for="TeamB" class="form-label">Team B</label>
        </div>
        <label class="m-2 input-group-sm text-center ">FirstName *
            <input type="text" placeholder="First Name" v-model="firstName" required class="form-control"/>
        </label><br>
        <label class=" m-2 input-group-sm text-center">LastName *
            <input type="text" placeholder="Last Name" v-model="lastName" required class="form-control"/>
        </label><br>
        <button type="submit" class="btn btn-primary">Add Player</button>
    </form>
    <hr>
    <!-- <div >{{getState}}</div> -->
    <router-view></router-view>
</template>

<script>
// Maps getters to the component, just like connect in react
// We define which methods you want to use is by providing fun names in computed prop
import {mapGetters, mapActions} from "vuex";


export default {
    name: 'AddTeam',
    data(){
        return {
            firstName:'',
            lastName:'',
            group:'',
            index:-1,
            nameValidation:null,
        }
    },
    methods:{ ...mapActions( ['firstNameValidation','addPlayer'] ),
        submitHandler : async function (){

            const nameValidation = await this.firstNameValidation( {firstName:this.firstName,group:this.group} )
            if ( nameValidation ) {
                this.addPlayer({group:this.group,firstName:this.firstName,lastName:this.lastName})
            } else {
                console.log(nameValidation)
                alert("Please enter unique name");
            }
        },
    },
    computed: mapGetters(['getState'])

}
</script>

<style>

button{
    margin: 10px;
} 
form{
    display: block;
    text-align: center;
}
</style>