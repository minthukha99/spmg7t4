<template>
<div class="header">
    <div class="header-middle-text row">
        <div class="col">
            <h1>Skills</h1>
        </div>
        <div class="col">
            <div class="d-flex">
                <button type="button" style="float:right">
                    <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
                </button>
            </div>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Name</th>
                        <th scope="col">Affected Roles</th>
                        <th scope="col" v-if="selectedRole=='Admin'">Status</th>
                        <th scope="col" v-if="selectedRole =='Admin'">Action 1</th>
                        <th scope="col" v-if="selectedRole =='Admin'">Action 2</th>

                    </tr>
                </thead>
                <tbody v-if="selectedRole =='Admin'">
                    <tr v-for="(skill,index) in skillsList" :key="skill.id">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Name">{{ skill.skillName }}</td>

                        <!-- show in bullet point if got data, else dash -->
                        <td v-if="skill.roleName =='' ">
                            -
                        </td>
                        <td v-else>
                            <ul scope="row" v-for="x in skill.roleName" :key="x">
                                <li>{{x}}</li>
                            </ul>
                        </td>

                        <td v-if="skill.status ==false " data-label="Status" class="inactive">
                            Inactive
                        </td>
                        <td v-else data-label="Status" class="active">
                            Active
                        </td>

                        <td>
                            <router-link :to="`/UpdateSkill/${skill.skillName}`">Edit</router-link>
                        </td>

                        <td v-if="skill.status == false" data-label="Action 2">
                            <a class="mouseover" v-on:click="activateSkills(skill.skillName)">Activate</a>
                        </td>

                        <td v-else data-label="Action 2">
                            <a class="mouseover" v-on:click="deactivateSkills(skill.skillName)">Deactivate</a>
                        </td>  
                    </tr>
                </tbody>


                <tbody v-else  v-for="(skill,index) in activeSkills" :key="skill.id">
                    <tr>
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Name">{{ skill.skillName }}</td>
                        <!-- <td scope="row" data-label="Skills">{{ role.skillName }}</td> -->
                        <!-- show in bullet point if got data, else dash -->
                        <td v-if="skill.roleName =='' ">
                            -
                        </td>
                        <td v-else>
                            <ul scope="row" data-label="Roles" v-for="x in skill.roleName" :key="x">
                                <li> {{x}}</li>
                            </ul>
                        </td>
                        <!-- <td scope="row" data-label="Action 3"><a href="#"> Add to Learning Journey</a></td> -->
                
                        <!-- <td scope="row" data-label="Action 4">
                                <router-link :to="`/AssignSkillstoRole/${role.roleName}`">Assign skills</router-link>
                                <router-link :to="{roleName:'user', params: {id:role.roleName} }">Assign skills</router-link>
                                <router-link to="/AssignSkillstoRole">Assign skills</router-link>
                              </td> -->
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</div>
</template>

<script>
//to store all the skills after calling api 
import axios from "axios";
export default {
    name: 'Skills',
    mounted() {
        this.getSkills()
    },

    data() {
        return {
            skillsList: [],
            activeSkills: [],
            selectedRole: ""
        }
    },

    methods: {

        getSkills() {
            this.selectedRole = sessionStorage.getItem('selectedRole') // get role saved in session storage
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    console.log("SkillData=", skillData)
                    for (var skill of skillData) {
                        // if (skill.roleName == "") {
                        //   console.log("Adsfsdf")
                        //   skill.roleName = " "
                        // }
                        this.skillsList.push({
                            id: skill._id,
                            roleName: skill.roleName,
                            skillName: skill.skillName,
                            status: skill.status
                            //v: skill._v
                        });
                        if(skill.status == 1) {
                            this.activeSkills.push(
                                {
                                    id: skill._id,      
                                    roleName: skill.roleName,
                                    skillName: skill.skillName
                                    
                                }
                            )   
                        }
                        // console.log(this.skillsList.roleName + "AA")
                        // if (this.skillsList.roleName == []) {
                        //   console.log("DD")
                        // }
                  }
                    console.log("SkillsList=", this.skillsList)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        deactivateSkills(skillName) {

            let url = "http://localhost:3000/deleteskill/" + skillName;
            axios.put(url)
                .then(response => {
                    console.log(url)
                    console.log("deactivated role:", skillName)
                    // this.getRoles()
                    location.reload()

                })
                .catch(error => {
                    console.log(error.message)
                })

        },

        activateSkills(skillName) {

            let url = "http://localhost:3000/activateskill/" + skillName;
            axios.put(url)
                .then(response => {
                    // this.getRoles()
                    location.reload()
                    console.log("activated role:", skillName)

                })
                .catch(error => {
                    console.log(error.message)
                })

        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a {
    color: blue;
    text-decoration: underline;
}

.special {
    color: white;
    text-decoration: none;
}
.mouseover {
    cursor: pointer;
}
</style>
