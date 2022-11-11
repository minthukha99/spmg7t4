<template>
    <div class="header">
        <div class="header-middle-text">
            <h1>Add Course to Learning Journey <u> {{ ljName }}</u></h1>
            
            <div>
                <div v-if="errorMessage.length == 0">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Skill required</th>
                                <th scope="col">Courses you are currently taking to learn Skill</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope="row" v-for="course in courses" :key="course">
                                <td scope="col" >
                                   {{ course.skillName }}
                                </td>
                                <td>
                                    <ul v-for="course in course.courseNamesList" :key="course">
                                        <li>
                                            {{ course }}
                                        </li>
                                    </ul>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
            
                    <div v-for="error in errorMessage2" :key="error" class="errorMessage">
                        <p>{{ error }} </p>
                    </div>

                    <!-- <select v-model="selectedRole" @change="saveRoleInSession">
                        <option selected="true" disabled="disabled">Select your role</option>
                        <option v-for="role in rolesList" :key="role">{{role}}</option>
                    </select> -->
                    
                    <select v-model="selectedCourse">
                        <option selected="true" disabled="disabled">Add Course</option>
                        <option v-for="course in allActiveCourses" :key="course.course_ID">{{course.courseName}}</option>
                    </select>
                    
            
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
        this.getLJInfo(),
        this.getActiveCourses()
    },

    data() {
        return {
            courseToBeAdded: "",
            errorMessage: [],
            skillsList: [], // list of skills required in the LJ

            courseNameToClearEachRole :[],
            courseIDToClearEachRole: [],
            courses: [],
            ljName: "",
            ljID: 0,
            courseList: [],
            allActiveCourses: [],
            selectedCourse: "",
            tempList : []
            

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
                                if (!this.courseList.includes(eachCourse.course_ID)) {
                                    this.courseList.push(eachCourse.course_ID)
                                }
                                    
                                    this.courseNameToClearEachRole.push(eachCourse.course_Name)
                                    this.courseIDToClearEachRole.push(eachCourse.course_ID)
                            }
                        }

                        this.courses.push({
                            skillName : eachSkill,
                            courseNamesList: this.courseNameToClearEachRole,
                            couseID: this.courseIDToClearEachRole
                        })
                    }
    
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        addCoursetoLJ() {
            const url = "http://localhost:3000/learningjourneycourse"
            for (var eachCourse of this.allActiveCourses) {
                if (eachCourse.courseName == this.selectedCourse) {
                    this.tempList.push(this.courseList),
                    eachCourse.courseID = [eachCourse.courseID],
                    this.tempList.push(eachCourse.courseID)
                }
            }

            var allSkills = []
            for (var eachCourseForEachSkill of this.courses) {
                console.log(eachCourseForEachSkill.courseNamesList)
                for (var eachCourse of eachCourseForEachSkill) {
                    console.log(eachCourse)
                }
            }
            // console.log(this.allActiveCourses)
            

            // this.selectedCourse
            //  axios
            //         .put(url,
            //             {
            //                 "LJID": this.id,
            //                 "course_ID": this.tempList
            //             }
            //         )
            //         .then(response => {
            //             console.log("Success")
            //             location.reload()
            //         })
            //         .catch(error => {
            //             console.log(error.message)
            //         })
            
        },
        getActiveCourses() {
            const url = "http://localhost:3000/activecourse"
            axios.get(url)
                .then(response => {
                    for (var eachCourse of response.data) {
                        this.allActiveCourses.push({
                            courseID: eachCourse.course_ID,
                            courseName: eachCourse.course_Name
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

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
