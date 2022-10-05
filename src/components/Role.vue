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
              <th scope="col">Action 1</th>
              <th scope="col">Action 2</th>
              <th scope="col">Action 3</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="availableRole in availableRoles" :key="availableRole.id">
              <td scope="row" data-label="Index">{{availableRole.id}}</td>
              <td scope="row" data-label="Name"><strong>{{availableRole.name}}</strong></td>
              <td scope="row" data-label="Skills">{{availableRole.skills}}</td>
              <td scope="row" data-label="Action 1"><a href="#">Edit</a></td>
              <td scope="row" data-label="Action 2"><a href="#">Activate</a></td>
              <td scope="row" data-label="Action 3"><a href="#">Deactivate</a></td>
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
      availableRoles: [],
    }
  },

  mounted() {
    
    this.getAvailableRoles()
    // this.deactivateSkills()

  },

  methods: {

    getAvailableRoles() {

      let url = "http://localhost:3000/availableroles";
      axios.get(url)
      .then(response => {
      
          var data = response.data

          console.log(data)

          for (var availableRole of data) {
            // console.log(availableRole)
            // console.log(availableRole._id)
            // console.log(availableRole.roleName)
            this.availableRoles.push(
                  {id: availableRole._id,
                  name: availableRole.roleName,
                  skills: availableRole.skillName}
              )

              // this.availableRole.push(availableRole._id)
              
          }

      })
      .catch(error => {
          console.log(error.message)
      })
    },

  //   deactivateRoles() {

  //     let url = "http://localhost:3000/delete/1";
  //     axios.put(url)
  //     .then(response => {
      
  //         var data = response

  //         console.log(data)

  //     })
  //     .catch(error => {
  //         console.log(error.message)
  //     })

  //   }

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

</style>