<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Add Skill</h1>
            <form>
                <label for="skillName">Name of the Skill</label><br>
                <input type="text" id="skillName" name="skillName"><br>
                <br>
                <button value="Cancel" class="special">
                    <router-link to="/Skills" class="special">Cancel</router-link>
                    
                </button> 
                <button type="submit" value="Save" class="special">Save</button>  
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Add Skill',
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