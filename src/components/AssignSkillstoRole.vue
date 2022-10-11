<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Assign Skills to <u> {{ id }}</u> </h1>
            
            <form>
                <label for="roleName">Course name:</label>
                {{ role }}
                <br>
                <br>
                Skill assigned:
                <!-- {{ role.skillName }} -->
                

                <label for="skillsNeeded" class="multiselect">Skills to be assigned:</label>
                <div class="selectBox">
                    <select multiple v-model="selectedSkills">
                        <option selected="true" disabled="disabled">Select an option</option>
                        <option v-for="skill in skillsList" :key="skill.id">>{{skill.skillName}}</option>
                    </select>
                </div>
                <br>
                <br>
                <!-- <button type="button">
                    <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
                </button> -->
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
    props: ['id'],
    //  the :role in path: "/AssignSkillstoRole/:role",
    name: 'AssignSkillstoRoles',
    mounted() {
        this.getSkills(),
        this.getRole()
    },
    data() {
        return {
            skillsList: [],
            selectedSkills: [],
            roleName: "",
            role : null 
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
                        this.skillsList.push(
                            {
                                id: skill._id,
                                roleName: skill.roleName,
                                skillName: skill.skillName,
                                status: skill.status
                            }
                        );
                    }
                    
                    // console.log("SkillsList=", this.skillsList)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        createRole() {
            let url = "http://localhost:3000/role";
            axios.post(url, {
                roleName: this.roleName,
                skillName: this.selectedSkills
            })

                .then(response => {
                    console.log("new role:", this.roleName, this.selectedSkills)
                    location.reload()
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        
        getRole() {
            var that = this
            const url = "http://localhost:3000/role/"+this.id;
            axios.get(url)
                .then(response => {
                    console.log(response)
                    that.role = response.data
                    var data = response
                    
                    console.log(data[0])
                        // [{ "roleDetail": "", "_id": "63395f4fb5d0eb0bd71e1646", "roleName": "afdsf", "status": true, "__v": 0, "skillName": ["Skill2", "Skill3"] }]

                        // this.rolesList.push(
                        //     {
                        //         id: role._id,
                        //         roleName: role.roleName,
                        //         skillName: role.skillName,
                        //         status: role.status
                        //     }
                        // );
                    
                    
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

       
    },
    
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
}

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
    color: white;
    text-decoration: none;
}
</style>