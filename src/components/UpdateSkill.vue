<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Update Skill: {{id}}</h1>

        <form>
            <label for="skillName">Skill Name</label><br>
            <input v-model="newSkillName" class="skillName" name="skillName"><br>
            <br>
            <label for="rolesNeeded" class="multiselect">Roles that require skill</label>
                <div class="selectBox">
                    <option selected="true" disabled="disabled">Select new roles (required)</option>
                    <div v-for="role in rolesList" :key="role.id">
                        <input type="checkbox" :id="role.id" :value="role.roleName" v-model="selectedRoles">
                        <label :for="role.id">{{role.roleName}}</label>
                    </div>
                </div>
            <!-- <label for="skillsNeeded" class="multiselect">Roles that require skill</label>
            <br>
            <select multiple v-model="selectedRoles">
                <option selected="true" disabled="disabled">Select an option (if any)</option>
                <option v-for="role in rolesList" :key="role.id">>{{role.roleName}}</option>
            </select>  -->
            <br>
            <br>
            <button value="Cancel" class="cancelButton">
                <router-link to="/Skills" class="special">Cancel</router-link>
            </button>
            <button @click='updateSkill(skillName); $router.push("/Skills")' name="Save" class="special saveButton">
                Save
            </button>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {

    name: 'UpdateSkill',

    mounted() {
        this.getRoles()
    },

    props: ['id'],

    data() {
        return {
            rolesList: [],
            selectedRoles: [],
            newSkillName: '',
        }
    },

    methods: {
        getRoles() {
            const url = "http://localhost:3000/roles";
            axios.get(url)
            .then(response => {
                var roleData = response.data
                // console.log("roleData=", roleData)
                for (var role of roleData) {
                this.rolesList.push(
                    {
                    id: role._id,
                    roleName: role.roleName,
                    skillName: role.skillName,
                    status: role.status
                    
                    }
                );
                }
                // console.log("rolesList=", this.rolesList)
            })
            .catch(error => {
                console.log(error.message)
            })
        },

        updateSkill() {
            // console.log(skillName)

            let url = "http://localhost:3000/updateskill/" + this.id;
            // console.log(url)
            // console.log(typeof(this.id))
            // console.log(this.newSkillName)

            axios.put(url, {
                    roleName: this.selectedRoles,
                    skillName: this.newSkillName
                })

                .then(response => {
                    console.log("hello", skillName)
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
</style>
