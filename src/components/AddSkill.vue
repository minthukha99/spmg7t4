<template>
    <div class="form">
        <h1>Add Skill</h1>
        <form>
            <label for="skillName">Skill name:</label><br>
            <input type="text" id="skillName" name="skillName"><br>
            <br>
    

            <input type="submit" value="Save">

        </form>
    </div>

</template>
  
<script>
export default {
    name: 'Add Skill',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
    margin: 20px;
    width: 60%;
    padding-left: 20px;
    border: 1px solid black;
}

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
</style>