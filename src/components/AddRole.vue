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
            <br>
            <br>
            <button type="button">
                <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
            </button>
            <button value="Cancel" class="special">
                <router-link to="/Roles" class="special">Cancel</router-link>
            </button>
            <button @click='createRole(); $router.push("/Roles")' type="submit" value="Save" class="special">
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
        this.getSkills()
    },

    data() {
        return {
            skillsList: [], //list of all skills 
            selectedSkills: [],
            roleName: "",
            roleDetail: ""
        }
    },

    methods: {

        getSkills() {
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    console.log("SkillData=", skillData)
                    for (var skill of skillData) {

                        this.skillsList.push({
                            id: skill.id,
                            roleName: skill.roleName,
                            skillName: skill.skillName,
                            status: skill.status
                        });

                    }
                    console.log("SkillsList=", this.skillsList)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        createRole() {

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

        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/* input[type=text],
select {
    width: 80%;
    padding: 12px 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    background-color: #000;
    color: white;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
} */

.special {
    color: white;
    text-decoration: none;
}

input:focus::placeholder {
    color: transparent;
}
</style>
