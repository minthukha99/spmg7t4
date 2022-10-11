<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Update Skill</h1>
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








    }
}
</script>