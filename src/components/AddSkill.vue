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
/* input[type=text],
select {
    width: 80%;
    padding: 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
} */


/* input[type=submit] {
    background-color: #000;
    color: white;
    border: none;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
} */

input {
    padding: 20px;
}

.selectBox {
    margin-top: 10px;
    overflow: scroll;
    max-height: 200px;
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
    color:white; 
    text-decoration: none;
  }


.selectBox{

    display:relative;
    background-color: white;
    outline-style: solid;
}

.errorMessage{
  color:red
}
</style>