<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Update Skill: {{id}}</h1>

            <form>
                <label for="skillName">Skill Name</label><br>
                <input v-model="newSkillName" id="skillName" name="skillName"><br>
                <br>
                <label for="skillsNeeded" class="multiselect" >Roles that require skill</label>
                <div class="selectBox">
                    <select multiple v-model="selectedRoles">
                        <option selected="true" disabled="disabled">Select an option (if any)</option>
                        <option v-for="role in rolesList" :key="role.id">>{{role.roleName}}</option>       
                    </select>
                </div>
                <br>
                <br>
                <button value="Cancel" class="special">
                    <router-link to="/Skills" class="special">Cancel</router-link>
                </button> 
                <button @click='updateSkill(skillName); $router.push("/Skills")' value="Save" class="special">
                    Save
                </button>  
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
export default {

    name: 'UpdateSkill/:id',

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
            console.log(skillName)

            let url = "http://localhost:3000/updateskill/" + this.id;
            console.log(url)

            console.log(this.newSkillName)

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
    input[type=text],
    select {
        width: 80%;
        padding: 12px 12px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    /* input[type=submit] {
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

    .header {
        margin-top: 20px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        position: relative;
    }

    .header-middle-text {
        width: 75%;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        /* border: 1px dotted black; */
    }

    button {
        background-color: #000;
        /* color: white; */
        border: none;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px 2px;
        cursor: pointer;
    }

    .special {
        color:white; 
        text-decoration: none;
    }

    input {
        padding: 20px;
    }
</style>