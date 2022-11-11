<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Add Course to Learning Journey <u> xxx</u></h1>
            
            <div>
                <div v-if="errorMessage.length == 0">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Skill required</th>
                                <th scope="col">Courses </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope="row" v-for="(index,skill) in skillsList" :key="index">
                                <td scope="col">
                                    {{ index }}
                                    {{ skill }}
                                </td>

                                
                            </tr>
                            <tr scope="row" v-for="course in coursesList" :key="course">
                                <td scope="col">
                                    {{ course.courseNamesList }}
                                </td>
                            </tr>
                        </tbody>
                        
            
                        <tbody>
                            
                            
            
                            <!-- <tr scope="row" v-for="skill in skillsNeededForRole" :key="skill">
                                <td scope="col">
                                    {{ skill.skillName }}
                                </td>
                                <td v-if="skill.learnt == false">
                                    <div v-for="(eachCourse) in skill.course" :key="eachCourse">
                                        <input type="checkbox" :value="eachCourse.course_ID" v-model="skill.selected">
                                        <label>{{ eachCourse.course_Name }}</label>
                                    </div>
            
                                </td>
            
                                <td v-else>
                                    <div class="errorMessage">
                                        You have already learned the Skill. Do choose the Course you have taken to learn this Skill
                                    </div>
                                    <div v-for="(eachCourse) in skill.course" :key="eachCourse">
                                        <input type="checkbox" :value="eachCourse.course_ID" v-model="skill.selected">
                                        <label>{{ eachCourse.course_Name }}</label>
                                    </div>
                                </td>
            
                            </tr> -->
                        </tbody>
            
                    </table>
            
                    <div v-for="error in errorMessage2" :key="error" class="errorMessage">
                        <p>{{ error }} </p>
                    </div>
            
                    <button class="button special" @click="addCoursetoLJ">
                        Add to Learning Journey
                    </button>
                </div>
            
                <div v-else>
                    <ul v-for="error in errorMessage" :key="error" class="errorMessage">
                        <li>{{ error }} </li>
                    </ul>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['id'],
    name: 'Add Course to Learning Journey',
    mounted() {
        this.getLJInfo()
    },

    data() {
        return {
            courseToBeAdded: "",
            errorMessage: [],
            skillsList: [], // list of skills required in the LJ

            courseNameToClearEachRole :[],
            courseIDToClearEachRole: [],
            coursesList: []

        }
    },

    methods: {
        getLJInfo() {
            // get the skills required for a role

            // get role id of user input roleName
            this.errorMessage = []
            const url = "http://localhost:3000/learningjourneyinfo/" + this.id;            
            axios.get(url)
                .then(response => {
                    var ljData = response.data.LJInfo
                    var skillData = response.data.skillNeededForRole
                    var courseData = response.data.courseRegistered
                    
                    for (var eachSkill of skillData) {
                        if (eachSkill.status == 1) { 
                            this.skillsList.push(eachSkill.skillName)
                        }
                    }
                    
                    for (var eachSkill of this.skillsList) {
                        
                        this.courseNameToClearEachRole = []
                        this.courseIDToClearEachRole = []
                        for (var eachCourse of courseData) {
                            if (eachCourse.skillName == eachSkill && !this.courseNameToClearEachRole.includes(eachCourse.course_Name)) {
                                    this.courseNameToClearEachRole.push(eachCourse.course_Name)
                                    this.courseIDToClearEachRole.push(eachCourse.course_ID)
                            }
                        }
                        this.coursesList.push({
                            courseNamesList: this.courseNameToClearEachRole,
                            couseID: this.courseIDToClearEachRole
                        })
                    }
                    
                    console.log(this.coursesList)
    
                })
                .catch(error => {
                    console.log(error.message)
                })


            
        },

        // addCoursetoLJ() {
        //     this.errorMessage2 = []

        //     for (var eachSkillRequired of this.skillsNeededForRole) {
        //         if (eachSkillRequired.selected == "" && this.errorMessage2.length == 0) {
        //             this.errorMessage2.push("You must choose at lesast a Course for each Skill")
        //         }
        //     }

        //     if (this.errorMessage2.length == 0) {
        //         let url = "http://localhost:3000/learningjourney";
        //         // from skillsneedforrole array, get the courses chosen by user and add to a list
        //         this.coursesChosenList = []

        //         for (var eachSkill of this.skillsNeededForRole) {
        //             this.coursesChosenList.push(eachSkill.selected)
        //         }

        //         axios.post(url, {
        //             roleName: this.roleSelected,
        //             staff_ID: sessionStorage.getItem("userId"),
        //             course_ID: this.coursesChosenList
        //         })
        //             .then(response => {
        //                 location.reload()
        //             })
        //             .catch(error => {
        //                 console.log(error.message)
        //             })
        //     }

        // },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.special {
    color: white;
    text-decoration: none;
}

input:focus::placeholder {
    color: transparent;
}
</style>
