<template>
  <div class="skillList">
    <h1>Skills</h1>
    <input type="button" style="float:right" value="+Add skill">
  </div>
  <br>
  <div>
    <table>
      <tr>
        <td>
          1.
        </td>
        <th>
          Skill123
        </th>
        <td>
          Edit
        </td>
        <td>
          Activate
        </td>
        <td>
          Deactivate
        </td>
      </tr>
    </table>
  </div>
</template>
  

<script>
import axios from "axios";

export default {
  name: 'Skills',

  mounted() {
        this.getSkills()

    },

  methods: {

    getSkills() {

      let url = "http://localhost:3000/skills";
      axios.get(url)
      .then(response => {
      
          var data = response

          console.log(data)
          // for (var skill of data) {
          //     this.skills.push(
          //         {id: skil.id,
          //         name: skill.name}
          //     )

              // this.skills.push(skill.id)
              
          // }

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
table {
  border-collapse: collapse;
  width: 70%
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

}

td {
  border: 1px solid #dddddd;
  width: 20px;
  padding: 8px;
}
</style>