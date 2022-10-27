<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Update Role: {{id}}</h1>

        <form>
            <label for="roleName">Name of the Role</label><br>
            <input v-model="newRoleName" id="roleName" name="roleName"><br>
            <br>
            <label for="skillsNeeded" class="multiselect">Skills required</label>
            <br>
            <select multiple v-model="selectedSkills">
                <option selected="true" disabled="disabled">Select an option</option>
                <option v-for="skill in skillsList" :key="skill.id">{{skill.skillName}}</option>
            </select>
            <br>
            <button type="button">
                <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
            </button>
            <button value="Cancel" class="special">
                <router-link to="/Roles" class="special">Cancel</router-link>
            </button>
            <button @click='updateRole(roleName); $router.push("/Roles")' value="Save" class="special">
                Save
            </button>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'UpdateRole/:id',
    mounted() {
        this.getSkills()
    },

    props: ['id'],

    data() {
        return {
            skillsList: [],
            selectedSkills: [],
            newRoleName: '',
        }
    },

    methods: {

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

        updateRole() {

            console.log(roleName)

            let url = "http://localhost:3000/updaterole/" + this.id;
            
            console.log(url)

            console.log(this.newRoleName)
            console.log(this.selectedSkills)
            axios.put(url, {
                    roleName: this.newRoleName,
                    skillName: this.selectedSkills
                })

                .then(response => {
                    console.log("hello", roleName)
                    // location.reload()
                })
                .catch(error => {
                    console.log(error.message)
                })

        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.special {
    color: white;
    text-decoration: none;
}
</style>
