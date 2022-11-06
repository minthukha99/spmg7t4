<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Update Role: <u> {{ roleDetails[1]}} </u></h1>
        <h3> Role Details: {{ roleDetails[0]}} </h3>
        <h3> Status: {{ roleDetails[3]}} </h3>
        
        <h3 >
            Skills assigned:
            <ul v-for="(skill,index) in roleDetails[2]" :key="skill">
                <li>
                    
                        {{ skill.skillName }}
                    
                        <a v-if="roleDetails[2].length  > 1">
                            <a class="mouseover" v-on:click="deleteSkillAssignedToRole(index) ">Delete</a>
                        </a>
                    
                </li> 
            </ul>
        </h3>
        <!--<a class="mouseover" v-on:click="activateSkills(skill.skillName)">Activate</a>-->
        <form>
            <label for="roleName">New Role Name</label><br>
            <input v-model="newRoleName" id="roleName" name="roleName"><br>
            <br>
            <label for="roleName">New Role Details</label><br>
            <input v-model="newRoleDetails" id="roleDetails" name="roleDetails" data-test="roleName"><br>
            <br>
            <label for="skillsNeeded" class="multiselect">Skills required</label>
            <div class="selectBox">
                <!-- <select multiple v-model="selectedSkills"> -->
                <option selected="true" disabled="disabled">Select new skills (required)</option>
                <div v-for="skill in skillsList" :key="skill.id">
                    <input type="checkbox" :id="skill.id" :value="skill.skillName" v-model="selectedSkills" data-test="selectedSkill">
                    <label :for="skill.id">{{skill.skillName}}</label>
                </div>
                <!-- </select> -->
            </div>

            <!-- <label for="skillsNeeded" class="multiselect">Skills required</label>
            <br>
            <select multiple v-model="selectedSkills">
                <option selected="true" disabled="disabled">Select an option</option>
                <option v-for="skill in skillsList" :key="skill.id">{{skill.skillName}}</option>
            </select> -->
            <div v-if="errorMessage" class="errorMessage">
                <ul v-for="error in errorMessage" :key="error">
                    <li> 
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div v-else> 
                <br>
                <br>
                <br>
            </div>
                <br>
                <button type="button">
                    <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
                </button>
                <button value="Cancel" class="special" type="button">
                    <router-link to="/Roles" class="special">Cancel</router-link>
                </button>
                <button type= "button" @click='updateRoleButton()' value="Save" class="special updateRoleButton">
                    Save
                </button>
            
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'UpdateRole',
    mounted() {
        this.getSkills()
        this.getRoleDetails()
        this.getAllRoles()
    },

    props: ['id'],

    data() {
        return {
            roleDetails: [],
            skillsList: [],
            selectedSkills: [],
            newRoleName: "",
            newRoleDetails: [],
            errorMessage: [],
            allRoles: [],
            skillForThisRole : []
        }

    },

    methods: {
        getRoleDetails() {
            const url = "http://localhost:3000/role/" + this.id
            axios.get(url)
                .then(response => {
                    var roleData = response.data
                    var status = "Inactive"
                    if (roleData.status == "1") {
                        status = "Active"
                    }
                    this.roleDetails = [
                        roleData.roleDetail,
                        roleData.roleName,
                        roleData.skillData, 
                        status
                    ];
                    // this is to store all the skills in a list, so that deleteSkillAssignedToRole() can find a specific skill to delete
                    for (var eachSkill of roleData.skillData) {
                        console.log(eachSkill.skillName)
                        this.skillForThisRole.push(eachSkill.skillName)
                    }
                    // console.log(this.skillForThisRole)
                    })
                .catch(error => {
                    console.log(error.message)
                })
            
        },
        getSkills() {
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    // console.log("SkillData=", skillData)
                    for (var skill of skillData) {
                        this.skillsList.push({
                            id: skill._id,
                            roleName: skill.roleName,
                            skillName: skill.skillName,
                            status: skill.status
                        });
                    }

                    // console.log("SkillsList=", this.skillsList)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getAllRoles() {
            // get all available roles in the database to check if duplicate name exists
            var url = "http://localhost:3000/roles"
            axios.get(url)
                .then(response => {
                    // console.log(response.data)
                    for (var eachRole of response.data) {
                        // console.log(eachRole)
                        this.allRoles.push(eachRole.roleName)
                    }
                    // console.log(this.allRoles)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        updateRoleButton() {
            this.errorMessage = []

            //if new role name is empty
            if (this.newRoleName == "") {
                // console.log("Empty skill name")
                this.errorMessage.push("Skill name is required!")
            }

            // if role name is a duplicate
            for (var eachRole of this.allRoles) {
                // console.log(eachRole)
                if (this.newRoleName == eachRole) {
                    // console.log("Duplicate Skill")
                    this.errorMessage.push("Skill name is already used!")
                }
            }
                
            // if no skill required for the role
            if (this.selectedSkills.length == 0) {
                // console.log("No skill chosen ")
                this.errorMessage.push("Each Role require at least a skill!")
            }

            if (this.errorMessage == "") {
                console.log("updateRole")
                this.updateRole()
                this.$router.replace({
                    path: '/Roles'
                })
            }
            
        },
        updateRole() {
            var url = "http://localhost:3000/updaterole/" + this.id;
            axios.put(url, {
                roleName: this.newRoleName,
                roleDetail: this.newRoleDetails,
                skillName: this.selectedSkills
                })
                .then(response => {
                    console.log("Role:", this.newRoleName, "updated", "with details", this.newRoleDetails, this.selectedSkills)
                    location.reload()
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        deleteSkillAssignedToRole(index) {
            //delete button beside each skill to remove the skill from the role            
            this.skillForThisRole.splice(index, 1) // remove the specific skill from the list of skills for the role
            var url = "http://localhost:3000/updaterole/" + this.id;
            axios.put(url, {
                roleName: this.roleDetails[1],
                skillName: this.skillForThisRole
            })
                .then(response => {
                    console.log("Role:", this.newRoleName, "updated", "with details", this.newRoleDetails, this.selectedSkills)
                    location.reload()
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
.special {
    color: white;
    text-decoration: none;
}
.errorMessage {
    color: red
}
.mouseover {
    cursor: pointer;
    font-size: small;
    margin-left: 5%;
    color: red;
    border-bottom: .05em solid #b4e7f8;
    box-shadow: inset 0 -0.05em 0 #b4e7f8;

    transition: background-color .25s cubic-bezier(.33, .66, .66, 1);
    text-decoration: none;
}
.mouseover:hover, .mouseover:focus, .mouseover:active {
    background-color:#b4e7f8;
}
</style>
