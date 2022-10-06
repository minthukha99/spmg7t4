<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Add Role</h1>
            <form>
                <label for="roleName">Name of the Role</label><br>
                <input type="text" id="roleName" name="roleName"><br>
                <br>
                <label for="skillsNeeded" class="multiselect" >Skills required</label>
                <div class="selectBox" onclick="showCheckboxes()">
                    <select>
                        <option selected>Select an option</option>
                        <option>Skill1</option>
                        <option>Skill2</option>
                    </select>
                    <!-- <div class="overSelect"></div> -->
                </div>
                <br>
                <br>
                <button type="button">
                    <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
                </button>
                <button value="Cancel" class="special">
                    <router-link to="/Roles" class="special">Cancel</router-link>
                    
                </button> 
                <button type="submit" value="Save" class="special">Save</button>  
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Add Role',
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