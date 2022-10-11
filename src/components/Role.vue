<template>
  <header>
    <div class="roleList">
      <div class="row">
        <div class="col">
          <h1>Roles</h1>
        </div>
        <div class="col">
        <div class="d-flex">
          <button type="button" style="float:right">
            <router-link to="/AddRole" class="special">+ Add Role</router-link>
          </button>
        </div>
      </div>
      </div>
      
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Skills</th>
              <th scope="col">Status</th>
              <th scope="col">Action 1</th>
              <th scope="col">Action 2</th>
              <th scope="col">Action 3</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(role,index) in rolesList" :key="role.id">
              <td scope="row" data-label="Index">{{ index +1}}</td>
              <td scope="row" data-label="Name">{{ role.roleName }}</td>
              <!-- <td scope="row" data-label="Skills">{{ role.skillName }}</td> -->
              <!-- show in bullet point if got data, else dash -->
              <td v-if="role.skillName =='' ">
                -
              </td>
              <td v-else>
                <ul scope="row" data-label="Skills" v-for="x in role.skillName" :key="x">
                  <li> {{x}}</li>
                </ul>
              </td>

              
              <td v-if="role.status == false " class="inactive" data-label="Status">
                Inactive
              </td>
              <td v-else class="active" data-label="Status">
                Active
              </td>

              <td>
                <router-link :to="`/UpdateRole/${role.roleName}`">Edit</router-link>
              </td>

              <td v-if="role.status ==false">
                <a v-on:click="activateRoles(role.roleName)">Activate</a>
              </td>

              <td v-else class="active">
                <a v-on:click="deactivateRoles(role.roleName)">Deactivate</a>
              </td>

              <td scope="row" data-label="Action 3"><a href="#"> Add to Learning Journey</a></td>

              <!-- <td scope="row" data-label="Action 4">
                <router-link :to="`/AssignSkillstoRole/${role.roleName}`">Assign skills</router-link>
                <router-link :to="{roleName:'user', params: {id:role.roleName} }">Assign skills</router-link>
                <router-link to="/AssignSkillstoRole">Assign skills</router-link>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </header>
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
      rolesList: []
    }
  },

  methods: {
    getRoles() {
      const url = "http://localhost:3000/roles";
      axios.get(url)
        .then(response => {
          var roleData = response.data
          console.log("roleData=", roleData)
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

    deactivateRoles(roleName) {

      let url = "http://localhost:3000/deleterole/"+roleName;
      axios.put(url)
      .then(response => {
        console.log("deactived role:", roleName)
        // this.getRoles()
        location.reload()

      })
      .catch(error => {
          console.log(error.message)
      })

    },

    activateRoles(roleName) {

      let url = "http://localhost:3000/activaterole/"+roleName;
      axios.put(url)
      .then(response => {
        // this.getRoles()
        location.reload()
        console.log("activated role:", roleName)

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
header {
  margin-top: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.roleList {
  width: 80%;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
  word-wrap: break-word;
}

@media screen and (max-width: 780px) {
  table {
    border: 0;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }

  table td::before {
    /*
      * aria-label has no advantage, it won't be read inside a table
      content: attr(aria-label);
      */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}

button {
  background-color: #000;
  color: white;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  color: white;
  cursor: pointer;
}

.inactive {
  color: rgba(184, 56, 56, 0.77);
  
}
.active{
  color: rgba(40, 190, 42, 0.77);
}
a{
  color: blue;
  text-decoration: underline;
}

.special {
    color:white; 
    text-decoration: none;
  }
</style>