<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Update Skill: {{id}}</h1>

        <form>
            <label for="skillName">Skill Name</label><br>
            <input v-model="newSkillName" class="skillName" name="skillName"><br>
            <br>
            <label for="skillDetail">Skill Detail</label><br>
            <input v-model="newSkillDetail" name="skillDetail"><br>
            <br> 
            <ul v-for="error in errorMessage" :key="error" class="errorMessage"> 
                <li> {{ error }} </li>
            </ul>
            <br>
            <button value="Cancel" class="cancelButton">
                <router-link to="/Skills" class="special">Cancel</router-link>
            </button>
            <button type="button" @click='updateSkill(skillName)' name="Save" class="special saveButton">
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
        this.getAllSkills()
    },

    props: ['id'],

    data() {
        return {
            newSkillName: '',
            newSkillDetail: '',
            errorMessage: [],
            skillsList: []
        }
    },

    methods: {
        getAllSkills() {
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    for (var skill of skillData) {
                        this.skillsList.push(
                            skill.skillName,
                        );
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
            
        },
        updateSkill() {
            this.errorMessage = []

            //if new skills name is empty
            if (this.newSkillName == "") {
                this.errorMessage.push("Skill name is required!")
            }

            // if skill name is a duplicate
            console.log(this.skillsList)
            if (this.skillsList.includes(this.newSkillName)) {
                this.errorMessage.push("Skill name is already used!")
            }

            //process form if no error 
            if (this.errorMessage.length == 0) {
                console.log("updateRole")
                let url = "http://localhost:3000/updateskill/" + this.id;
                axios.put(url, {
                    skillName: this.newSkillName,
                    skillDetail: this.newSkillDetail
                    })

                    .then(response => {
                        console.log("success ")
                        location.reload()
                    })

                    .catch(error => {
                        console.log(error.message)
                    })
                this.$router.replace({
                    path: '/Skills'
                })
            }
        }

    }
}
</script>

<style scoped>
.special {
    color: white;
    text-decoration: none;
}
.errorMessage {
    color: red
}
</style>
