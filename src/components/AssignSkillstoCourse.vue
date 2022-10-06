<template>
    <div class="form">
        <h1>Add Skills to Course</h1>
        <form>
            <label for="roleName">Course name:</label><br>
            <p> Course123 Hardcoded</p>
            <br>

            <label for="skillsNeeded" class="multiselect">Assign Skill:</label>
            <div class="selectBox" onclick="showCheckboxes()">
                <select v-for="activeSkill in activeSkillsList" :key="activeSkill.id">
                    <option selected>Select an option</option>
                    <option>{{ activeSkill.skillName }}</option>
                    
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

            <a href="#">+Add Skill </a>
            <br>
            <br>

            <input type="submit" value="Save">

        </form>
    </div>

</template>
  
<script>
import axios from "axios";
export default {
    name: 'Assign Skills to Course',
    mounted() {
        this.getActiveSkills()
    },
    data() {
        return {
            activeSkillsList: []
        }
    },
    methods: {
        getActiveSkills() {
            const url = "http://localhost:3000/availableskills ";
            axios.get(url)
                .then(response => {
                    var activeSkillData = response.data
                    console.log(activeSkillData)
                    for (var actveSkill of activeSkillData) {
                        this.activeSkillsList.push(
                            {
                                id: actveSkill._id,
                                // roleName: actveSkill.roleName,
                                // status: actveSkill.status,
                                skillName: actveSkill.skillName
                            }
                        );
                    }
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
.form {
    margin: 20px;
    width: 60%;
    padding-left: 20px;
    border: 1px solid black;
}

p,
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