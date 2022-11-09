<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Add Skill</h1>
        <form>
            <label for="skillName">Skill Name</label><br>
            <input v-model="skillName" id="skillName" name="skillName"><br>
            <br>
            <label for="skillDetail">Skill Details</label><br>
            <input v-model="skillDetail" placeholder="No description" onfocus="this.placeholder=''" onblur="this.placeholder='No Description'">
            <br>
            <br>
        
            
            <div v-if="errorMessage" class="errorMessage">
                {{ errorMessage }}
            </div>
            <div v-else>
                <br>
                <br>
            </div>

                <button value="Cancel" class="special">
                    <router-link to="/Skills" class="special">Cancel</router-link>
                </button>
                
                <button type="button" @click='addSkillButton()' class="special">
                    Save
                </button>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'AddSkill',
    mounted() {
        this.getRoles()
    },
    data() {
        return {
            rolesList: [],
            selectedRoles: [],
            skillName: "",
            skillDetail: "",
            errorMessage: "",
            skillsList : [] // store all skill names to check for duplicate skill name
        }
    },
    methods: {
        getRoles() {
            const url = "http://localhost:3000/roles";
            axios.get(url)
                .then(response => {
                    var roleData = response.data
                    for (var role of roleData) {
                        this.rolesList.push({
                            id: role._id,
                            roleName: role.roleName,
                            skillName: role.skillName,
                            status: role.status
                        });
                    }
                })
                .catch(error => {
                    console.log(error.message)

                })
        },

        addSkillButton() {
            this.errorMessage = ""
            
            //check if empty skill name entered
            if (this.skillName == "") {
                this.errorMessage += "Skill name is required!"
            }

            // if duplicate skill name
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    for (var skill of skillData) {
                        this.skillsList.push(skill.skillName,);
                    }

                    if (this.skillsList.includes(this.skillName)) {
                        this.errorMessage += "Duplicate Skill name!"
                    }
                    //if no error, process user request
                    if (this.errorMessage == "") {
                        this.createSkill()
                        this.$router.replace({
                            path: '/skills'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        createSkill() {
            let url = "http://localhost:3000/skill";
            axios.post(url, {
                    skillName: this.skillName,
                    roleName: this.selectedRoles,
                    status: true,
                    skillDetail: this.skillDetail
                })
                .then(response => {
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
</style>
