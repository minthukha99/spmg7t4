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
export default {
  name: 'Skills',
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