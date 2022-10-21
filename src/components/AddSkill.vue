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
                <label for="rolesNeeded" class="multiselect" >Roles that require skill</label>
                <div class="selectBox">  
                    <div v-for="role in rolesList" :key="role.id">
                        <input type="checkbox" :id="role.id" :value="role.roleName" v-model="selectedRoles">
                        <label :for="role.id">{{role.roleName}}</label>
                    </div>
                </div>
                <div v-if="errorMessage" class= "errorMessage"> 
                    {{ errorMessage }}
                </div>
                <div v-else>
                    <br>
                    <br>
                </div>
                
                <button value="Cancel" class="special">
                    <router-link to="/Skills" class="special">Cancel</router-link>
                </button> 
                <!-- <button @click='addSkillButton()' type="submit" value="Save" class="special"> -->
                <button @click='addSkillButton()'  class="special">
                <!-- <button @click='createRole(); $router.push("/skills")' value="Save" class="special"> -->
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
      errorMessage: ""
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

        addSkillButton() {
            console.log(this.skillName)
            this.errorMessage = ""
            if (this.skillName == "") {
                
                console.log("Empty skill name")
                this.errorMessage += "Skill name is required!"
            }

            else {
                console.log("createSkill")
                this.createSkill()
                this.$router.replace({ path: '/skills'})
                // this.$router.push({ path: '/home' });
                // $router.go(-2)
            }
        },

        createSkill(){
            let url = "http://localhost:3000/skill";
            axios.post(url, {
                skillName: this.skillName,
                roleName: this.selectedRoles,
                status: true,
                skillDetail: this.skillDetail
                // skillDetail: ,
                // courses: []
            })
            .then(response => {
                console.log("new role:", this.skillName, this.selectedRoles)
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
    color:white; 
    text-decoration: none;
  }

.errorMessage{
  color:red
}
</style>