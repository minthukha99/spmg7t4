<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Add Skill</h1>
            <form>
                <label for="skillName">Name of the Skill</label><br>
                <input v-model="skillName" id="skillName" name="skillName"><br>
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
                <button @click='createSkill(); $router.go(-1)' type="submit" value="Save" class="special">
                    Save
                </button>  
               
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: 'Roles',

  mounted() {
    this.getRoles()
  },

  data() {
    return {
      rolesList: [],
      selectedRoles: [],
      skillName: ""
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


        createSkill(){

            let url = "http://localhost:3000/skill";
            axios.post(url, {
                skillName: this.skillName,
                roleName: this.selectedRoles
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
    color:white; 
    text-decoration: none;
  }
</style>