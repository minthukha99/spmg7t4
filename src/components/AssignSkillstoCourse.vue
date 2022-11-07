<template>
<div class="header">
    <div class="header-middle-text">
        <h1>
            Assign Skills to <u>{{ course.course_Name  }}</u>
        </h1>
        <form>
            <p> <strong>Course Code: </strong> {{ course.course_ID }} </p>
            <p> <strong>Course Name: </strong> {{ course.course_Name }}</p>
            <p> <strong>Course Description: </strong> {{ course.course_Name }}</p>
            <p> <strong>Course Status: </strong> {{ course.course_Status }}</p>
            <p> <strong>Course Type: </strong> {{ course.course_Type }}</p>
            <p>
                <strong> Skills assigned: </strong>
                <ul v-for="skill in this.skillsAssigned" :key="skill">
                    <li>{{ skill.skillName }} 
                        <a class="mouseover" v-on:click="deleteSkillAssignedToCourse(skill.skillId)">Delete</a>
                    </li>
                </ul>
            </p>

            <div>
                <label for="skillsNeeded" class="multiselect">Skills to be assigned:</label>
                <br>
                <div class="selectBox">
                    <div v-for="skill in skillsList" :key="skill.id">
                        <input type="checkbox" :id="skill.id" :value="skill.skillName" v-model="selectedSkills" :selected="this.skillsAssigned[0]">
                        <label :for="skill.id">{{skill.skillName}}</label>
                    </div>
                </div>
                <div v-if="errorMessage" class="errorMessage">
                    <ul v-for="error in errorMessage" :key="error">
                        <li>
                            {{ error }}
                        </li>
                    </ul>
                </div>
                
                <div v-else>
                    <br>
                </div>
                <div>
                    <button type="button">
                        <router-link to="/AddSkill" class="special">+ Add Skill</router-link>
                    </button>
                    <button value="Cancel" class="special">
                        <router-link to="/courses" class="special">Cancel</router-link>
                    </button>
                    <button type="button" @click='assignSelectedSkillsToCourse()' class="special">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    props: ['id'],

    name: 'AssignSkillstoCourses/:id',

    mounted() {
        this.getSkills()
        this.getCourseInformation()
        this.getSkillsAssignedToCourse()
    },
    data() {
        return {
            skillsList: [],
            selectedSkills: [],
            course: [],
            courseName: "",
            courseSelected: {},
            skillsAssigned: [],
            errorMessage: ""
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
                        this.skillsList.push({
                            id: skill._id,
                            roleName: skill.roleName,
                            skillName: skill.skillName,
                            status: skill.status
                        });
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
                        this.skillsAssigned.push({
                            skillName: response.data.skillName[x].skillName,
                            skillId: response.data.skillName[x].skillID
                        }
                        )
                    }
                    console.log(this.skillsAssigned)
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        // function used for validation in assignSelectedSkillsToCourse()
        findCommonSkills(array1, array2) {
            // Loop for array1
            for(let i = 0; i < array1.length; i++) {
                // Loop for array2
                for(let j = 0; j < array2.length; j++) {
                    // Compare the element of each and
                    // every element from both of the
                    // arrays
                    if(array1[i] === array2[j]) {
                        // Return if common element found
                        return true;
                    }
                }
            }
            // Return if no common element exist
            return false;
        },

        assignSelectedSkillsToCourse() {
            // assign skills that user selected to the Course 
            this.errorMessage = [];
            if (this.selectedSkills.length == 0) {
                this.errorMessage.push("Please assign at least one skill to the course before saving.")
            } else if (this.findCommonSkills(this.skillsAssigned, this.selectedSkills)) {
                this.errorMessage.push("Skill(s) selected has already been assigned to course. Please try again.")
            } else {
                let url = "http://localhost:3000/assignskilltocourse";
                for (var x in this.selectedSkills) {
                    axios.post(url, {
                        skillName: this.selectedSkills[x],
                        course_ID: this.id,
                    })
                    .then(response => {
                        this.errorMessage.push( "Success! " + this.selectedSkills[x] + " has been assigned to course " + this.id)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                }
            }
        },
        deleteSkillAssignedToCourse(skill) {
            console.log(this.id)
            console.log(skill)
            axios.delete("http://localhost:3000/deleteskillfromcourse", {
                    course_ID: this.id,
                    skillID: skill,

                })
                .then(response => {
                    console.log(response.data)
                    // location.reload()
                })
                .catch(error => {
                    console.log(error.message)
                })
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

.errorMessage {
    color: red
}
.mouseover {
    cursor: pointer;
    font-size: small;
    margin-left: 5%;
    color: red;
    border-bottom: .05em solid #b4e7f8;
    box-shadow: inset 0 -0.05em 0 #b4e7f8;

    transition: background-color .25s cubic-bezier(.33, .66, .66, 1);
    text-decoration: none;
}

.mouseover:hover,
.mouseover:focus,
.mouseover:active {
    background-color: #b4e7f8;
}
</style>
