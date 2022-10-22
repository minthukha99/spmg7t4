<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>
                Assign Skills to <u>{{   course.course_Name  }}</u>
            </h1>
            <form>
                <p> <strong>Course Code: </strong> {{ course.course_ID }} </p>
                <p> <strong>Course Name: </strong>  {{ course.course_Name }}</p>
                <p> <strong>Course Description: </strong> {{ course.course_Name }}</p>
                <p> <strong>Course Status: </strong>  {{ course.course_Status }}</p>
                <p> <strong>Course Type: </strong> {{ course.course_Type }}</p>
                <p > 
                    <strong> Skills assigned: </strong> 
                    <ul v-for="skills in this.skillsAssigned" :key="skills"> <li>{{ skills }} </li></ul>  
                </p>
                <br>
                <br>

                <label for="skillsNeeded" class="multiselect">Skills to be assigned:</label>
                <br>
                <select multiple v-model="selectedSkills">
                    <option selected="true" disabled="disabled">Select an option</option>
                    <option v-for="skill in skillsList" :key="skill.id" :selected="this.skillsAssigned[0]">{{skill.skillName}}</option>
                </select>
                <br>
                <br>
                
                <button value="Cancel" class="special">
                    <router-link to="/courses" class="special">Cancel</router-link>
                </button>
                <button @click='assignSelectedSkillsToCourse();  $router.push("/courses")' type="submit" value="Save" class="special">
                    Save
                </button>

            </form>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
export default {
    props: ['id'],
    //  GUIDE: the :role in path: "/AssignSkillstoRole/:role",
    name: 'AssignSkillstoRoles/:id',
    mounted() {
        this.getSkills()
        this.getCourseInformation()
        this.getSkillsAssignedToCourse()
    },
    data() {
        return {
            skillsList: [],
            selectedSkills: [],
            course : [],
            courseName: "",
            courseSelected: {},
            skillsAssigned: []
        }
    },
    methods: {
        getSkills() {
            // show all skills for skills dropdown list for users to assign to the Course
            const url = "http://localhost:3000/skills";
            axios.get(url)
                .then(response => {
                    var skillData = response.data
                    for (var skill of skillData) {
                        this.skillsList.push(
                            {
                                id: skill._id,
                                roleName: skill.roleName,
                                skillName: skill.skillName,
                                status: skill.status
                            }
                        );
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getCourseInformation() {
            // get the course information
            const url = "http://localhost:3000/courses"
            axios.get(url)
                .then(response => {
                    for (var x in response.data) {
                        if (response.data[x].course_ID == this.id) {
                            this.course = response.data[x]
                        }
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getSkillsAssignedToCourse() {    
            // get the skills assigned to the course  
            const url = "http://localhost:3000/course/" + this.id;
            axios.get(url)
                .then(response => {
                    for (var x in response.data.skillName) {
                        this.skillsAssigned.push(response.data.skillName[x].skillName)
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        assignSelectedSkillsToCourse() {
            // assign skills that user selected to the Course 
            let url = "http://localhost:3000/assignskilltocourse";
            for (var x in this.selectedSkills) {
                axios.post(url, {
                    skillName: this.selectedSkills[x],
                    course_ID: this.id,
                })
                    .then(response => {
                        console.log("Success!", this.selectedSkills[x] ,"assigned to", this.id)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            }   
        }
    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.special {
    color: white;
    text-decoration: none;
}
</style>