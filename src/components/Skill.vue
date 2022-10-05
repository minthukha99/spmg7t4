<template>
  <header>
    <div class="skillList">
      <row>
        <c-col>
          <h1>Skills</h1>
        </c-col>
        <c-col>
          <div class="d-flex">
            <button type="button" style="float:right">
              <router-link to="/AddSkill">+ Add skill</router-link>
            </button>
          </div>
        </c-col>
      </row>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Skill Name</th>
              <th scope="col">Roles requiring skill</th>
              <th scope="col">Status</th>
              <th scope="col">Action 1</th>
              <th scope="col">Action 2</th>
              <th scope="col">Action 3</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(skill,index) in skillsList" :key="skill.id">
            <td scope="row" data-label="Index">{{ index +1}}</td>
            <td scope="row" data-label="skillName">{{ skill.skillName }}</td>

            <!-- show in bullet point if got data, else dash -->
            <td v-if="skill.roleName =='' ">
              -
            </td>
            <td v-else>
              <ul scope="row" data-label="skillName" v-for="x in skill.roleName" :key="x">
                <li> {{x}}</li>
              </ul>
            </td>

            <td v-if="skill.status ==false " class="inactive">
              <p>Inactive</p>
            </td>
            <td v-else class="active">
              <p>Active</p>
            </td>

            <td scope="row" data-label="Action 1"><a href="#">Edit</a></td>
            <td scope="row" data-label="Action 2"><a href="#">Activate</a></td>
            <td scope="row" data-label="Action 3"><a href="#"><td>Deactivate</td></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </header>
</template>
  

<script>
 //to store all the skills after calling api 
import axios from "axios";
export default {
  name: 'Skills',
  mounted() {
        this.getSkills()
  },
  data() {
    return{
      skillsList:[]
    }
  },
  methods: {
    getSkills() {
      const url = "http://localhost:3000/skills";
      axios.get(url)
        .then(response => {
          var skillData = response.data
          console.log("SkillData=", skillData)
          for (var skill of skillData) {
            // if (skill.roleName == "") {
            //   console.log("Adsfsdf")
            //   skill.roleName = " "
            // }
            this.skillsList.push(
              {
                id: skill._id,
                roleName: skill.roleName,
                skillName: skill.skillName,
                status: skill.status
                //v: skill._v
              }       
            );
            // console.log(this.skillsList.roleName + "AA")
            // if (this.skillsList.roleName == []) {
            //   console.log("DD")
            // }
          }
          console.log("SkillsList=",this.skillsList)
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

  .skillList {
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

.inactive {
color: rgba(184, 56, 56, 0.77);
}

.active {
  color: rgba(40, 190, 42, 0.77);
}
</style>