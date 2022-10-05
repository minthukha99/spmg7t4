<template>
  <header>
    <div class="roleList">
      <row>
        <c-col>
          <h1>Roles</h1>
        </c-col>
        <c-col>
          <div class="d-flex">
            <button type="button" style="float:right">
              <router-link to="/AddRole">+Add role</router-link>
            </button>
          </div>
        </c-col>
      </row>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Role Name</th>
              <th scope="col">Skills needed</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
              <th scope="col">Activate / Deactivate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td scope="row" data-label="Index">{{role.id}}</td>
              <td scope="row" data-label="Name"><strong>{{role.name}}</strong></td>
              <td scope="row" data-label="Skills">{{role.skills}}</td>
              <td scope="row" data-label="Skills" v-if="role.status">Active</td>
              <td scope="row" data-label="Skills" v-else>Inactive</td>
              <td scope="row" data-label="Action 1"><a href="#">Edit</a></td>

              <td scope="row" data-label="Action 2">
                <button v-on:click="deactivateRoles(role.name) ; role.status = !role.status">
                  
                  <span :class="{green: role.status}">Activate</span> /
                  <span :class="{red: !role.status}">Deactivate</span> 
                  
                  
                </button>
              </td>

              <!-- <td scope="row" data-label="Action 2" v-if="role.status = !role.status">
                <button v-on:click="deactivateRoles(role.name)">
                  <span :class="{red: !role.status}">Deactivate</span>
                </button>
              </td>

              <td scope="row" data-label="Action 2" v-else>
                <button v-on:click="deactivateRoles(role.name)">
                  <span :class="{green: role.status}">Activate</span>
                </button>
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

  data() {
    return {
      roles: [],
      toggle: false,
    }
  },

  mounted() {
    
    this.getRoles()
    // this.deactivateSkills()

  },

  methods: {

    getRoles() {

      let url = "http://localhost:3000/roles";
      axios.get(url)
      .then(response => {
      
          var data = response.data

          console.log(data)

          for (var role of data) {
            console.log(role)
            // console.log(role._id)
            // console.log(role.roleName)
            this.roles.push(
                  {id: role._id,
                  name: role.roleName,
                  skills: role.skillName,
                  status: role.status}
              )
              
          }

      })
      .catch(error => {
          console.log(error.message)
      })
    },


    deactivateRoles(roleName) {

      let url = "http://localhost:3000/deleterole/"+roleName;
      axios.put(url)
      .then(response => {
        // this.getRoles()
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
  width: 85%;
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
}

@media screen and (max-width: 700px) {
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
  cursor: pointer;
}

.red {
  color: red;
}

.green {
  color: green;
}

</style>