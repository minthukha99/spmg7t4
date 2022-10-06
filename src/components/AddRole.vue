<template>
    <div class="form">
    <h1>Add Role</h1>
        <form>
            <label for="roleName">Role name:</label><br>
            <input type="text" id="roleName" name="roleName"><br>
            <br>
        
            <label for="skillsNeeded" class="multiselect" >Skills needed:</label>
            <div class="selectBox" onclick="showCheckboxes()">
                <select>
                    <option selected>Select an option</option>
                    <option>Skill1</option>
                    <option>Skill2</option>
                </select>
                <div class="overSelect"></div>
            </div>
            <!-- <div id="checkboxes">
                <label for="one">
                    <input type="checkbox" id="one" />First checkbox</label>
                <label for="two">
                    <input type="checkbox" id="two" />Second checkbox</label>
                <label for="three">
                    <input type="checkbox" id="three" />Third checkbox</label>
            </div> -->
            
            <a href="#AddSkill" target="_blank"> +Add Skill </a>
            <br>
            <br>
           
            <input type="submit" value="Save">  
            
        </form>
    </div>
    
</template>
  
<script>
export default {
    name: 'Add Role',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form{
    margin:20px;
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