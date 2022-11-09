<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Add Role</h1>
        <form>
            <label for="roleName">Name of the Role</label><br>
            <input v-model="roleName" id="roleName" name="roleName"><br>
            <br>
            <label for="roleDetail">Role Details</label><br>
            <input v-model="roleDetail" placeholder="No description" onfocus="this.placeholder=''" onblur="this.placeholder='No Description'">
            <br>
            <br>
            <label for="skillsNeeded" class="multiselect">Skills required</label>
            <div class="selectBox">
                <!-- <select multiple v-model="selectedSkills"> -->

                <option selected="true" disabled="disabled">Select an option</option>
                <div v-for="skill in skillsList" :key="skill.id">
                    <input type="checkbox" :id="skill.id" :value="skill.skillName" v-model="selectedSkills">
                    <label :for="skill.id">{{skill.skillName}}</label>
                </div>
                <!-- </select> -->
            </div>

            <li v-for="(option, index) in options" :key="index">
                <input type="checkbox" :id="index" :value="option.value" v-model="selected">
                <label :for="index">{{ option.text }}</label>
            </li>
            <div v-for="error in errorMessage" :key="error" class="errorMessage">
                <p>
                    {{ error }}
                </p>
            </div>
            <br>
            <br>
            <button type="button">
                <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
            </button>
            <button value="Cancel" class="special">
                <router-link to="/Roles" class="special">Cancel</router-link>
            </button>
            <button @click='createRole()' type="button" value="Save" class="special">
                Save
            </button>

        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'AddRoles',
    mounted() {
        this.getSkills(),
            this.getRoles()
    },

    data() {
        return {
            skillsList: [], //list of all skills 
            selectedSkills: [],
            roleName: "",
            roleDetail: "",
            errorMessage: [],
            rolesList: []
        }
    },

    methods: {

        getSkills() {
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    for (var skill of skillData) {
                        this.skillsList.push({
                            id: skill.id,
                            roleName: skill.roleName,
                            skillName: skill.skillName,
                            status: skill.status
                        });
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getRoles() {
            const url = "http://localhost:3000/roles";
            axios.get(url)
                .then(response => {
                    var roleData = response.data
                    for (var role of roleData) {
                        this.rolesList.push(
                            role.roleName,
                        );
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        createRole() {
            this.errorMessage = []

            //check if empty role name entered

            if (this.roleName == "") {
                this.errorMessage.push("Role name is required!")
            }
            console.log(this.errorMessage)
            console.log("success")

            // check if duplicate role name
            console.log(this.rolesList.includes(this.roleName))
            if (this.rolesList.includes(this.roleName)) {
                this.errorMessage.push("Duplicate Role name!")
            }

            //if no error, process user request
            if (this.errorMessage == "") {
                let url = "http://localhost:3000/role";
                axios.post(url, {
                        roleName: this.roleName,
                        skillName: this.selectedSkills,
                        roleDetail: this.roleDetail
                    })

                    .then(response => {
                        console.log("new role:", this.roleName, this.selectedSkills)
                        location.reload()
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                this.$router.replace({
                    path: '/roles'
                })
            }
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

input:focus::placeholder {
    color: transparent;
}
</style>
