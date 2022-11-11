<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Role: <u>{{ roleName }}</u></h1>
        <button class="float">
            <router-link :to="`/AddCourseToLearningJourney/${id}`" class="special"> 
                Add Course To Learning Journey
                <!-- <router-link :to="`/UpdateSkill/${skill.skillName}`">Edit</router-link> -->
            </router-link>
        </button>
        <h4>Total Courses Required: {{ totalCourses}}</h4>
        <h4>Total Courses Completed: {{ coursesCompleted}} </h4>

        <div class="meter">
            <span :style="{ width: coursesCompletedPercentage + '%' }"></span>
        </div>
        <br>
        
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Registration Status</th>
                        <th scope="col">Completion Status</th>
                        <th scope="col">Action 1</th>
                        <th scope="col">Action 2</th>
                        <!-- <th scope="col">Action 3</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ljData in ljInfolist" :key="ljData.regID">
                        <td scope="row" data-label="Course Code">{{ ljData.courseCode }}</td>
                        <td scope="row" data-label="Course Name">{{ ljData.courseName }}</td>
                        <td scope="row" data-label="Registration Status">{{ ljData.regStatus }}</td>
                        <td scope="row" data-label="Completion Status">{{ ljData.completeStatus }}</td>
                        <td v-if="ljData.regStatus == 'Waitlist'" data-label="Action 1">
                            <a class="mouseover" v-on:click="registerCourse(ljData.regID)">Register</a>
                        </td>
                        <td v-else>
                            <span>-</span>
                        </td>
                        <td> 
                            <a class="mouseover" v-on:click="deleteCourse(ljData)">Delete Course from LJ</a>
                        </td>
                        <!-- <td scope="row" v-if="alternativeCourses.length == 0">
                            <a class="mouseover" v-on:click="editLJCourse(ljData)">Change Course</a>
                        </td>
                        
                        <td scope="row" v-else>
                            <select>
                                <option v-for="course in alternativeCourses" :key="course" >{{ course }}</option>
                            </select>
                            <button @click="saveLJCourseEdit">
                                Save
                            </button>
                            <button @click="cancelEditLJCourse">
                                Cancel
                            </button>
                        </td> -->
                        <!-- <td scope="row" v-else>
                            {{ alternativeCourses }}
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <div>
                <ul>
                    <li v-for="error in errorMessage" :key="error" class="errorMessage">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    name: 'Learning Journey Profile',
    mounted() {
        this.getLearningJourneyInfo()
    },

    data() {
        return {
            // skillCourseList: [],
            ljInfolist: [],
            roleName: '',
            totalCourses: 0, // store total courses needed to clear for the role
            coursesCompleted: 0, // store courses completed 
            coursesCompletedPercentage: 0, //store percentage from above 2 data
            coursesList: [],
            ljID: 0,
            tempList: [], //temporary list to format courselist for api
            tempList2: [], //temporary list 2 to format courselist for api
            errorMessage: [],
            // ljID: 0 //store lj ID to route for Add Course To Learning Journey
        }
    },

    methods: {
        getLearningJourneyInfo() {
            const url = "http://localhost:3000/learningjourneyinfo/" + this.id;
            axios.get(url)
                .then(response => {
                    
                    this.ljID = response.data.LJInfo[0].LJID

                    var ljInfoData = response.data
                    this.roleName = ljInfoData.LJInfo[0].roleName
                    for (var ljData of ljInfoData.courseRegistered) {
                        if (!this.coursesList.includes(ljData.course_ID)) {
                            this.coursesList.push(ljData.course_ID)
                                // show "-" if course completion is ""(course not completed, so registered/rejected/ waitlist)
                                var comptStatus = "-"
                                this.totalCourses += 1
                                if (ljData.Completion_Status == "Completed") {
                                    comptStatus = "Completed"
                                    this.coursesCompleted += 1 //if course completed, increase count 
                                }
                                this.ljInfolist.push({
                                    skillName: ljData.skillName,
                                    courseCode: ljData.course_ID,
                                    courseName: ljData.course_Name,
                                    regID: ljData.Reg_ID,
                                    regStatus: ljData.Reg_Status,
                                    completeStatus: comptStatus,
                                });   
                        }    
                    }

                    this.coursesCompletedPercentage = (this.coursesCompleted / this.totalCourses ) * 100
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        registerCourse(regID) {
            let url = "http://localhost:3000/registerecourse/" + regID;
            axios.put(url)
                .then(response => {
                    console.log("course registered under registration ID:", regID)
                    location.reload()

                })
                .catch(error => {
                    console.log(error.message)
                })

        },
        // editLJCourse(id) {
        //     console.log(id.skillName)
        //     const url = "http://localhost:3000/coursebyskill/" + id.skillName

        //     axios
        //         .get(url)
        //         .then(response => {
        //             this.alternativeCourses = []

        //             for (var eachCourse of response.data ) {
        //                 this.alternativeCourses.push(eachCourse.course_Name)
        //             }
        //             console.log(this.alternativeCourses)


        //             })
        //         .catch(error => {
        //             console.log(error.message)
        //         })
        // },
        // cancelEditLJCourse() {
        //     this.alternativeCourses = []
        // },

        // saveLJCourseEdit() {
        //     // {
        //     //     "roleName" : "150065 role",
        //     //         "staff_ID" : "140002",
        //     //             "course_ID": [["COR001"], ["tch003", "tch013"]]
        //     // }
        //     console.log(this.roleName, sessionStorage.getItem("userId"))
        // }
        deleteCourse(id) {
            //if only 1 course in LJ, show error message
            if (this.coursesList.length == 1) {
                this.errorMessage.push("Learning Journey must have at least 1 Course! Delete the Learning Journey from Learning Journey page if you want to delete it")
            }
            if (this.errorMessage.length == 0) {
                console.log("proceed")
                const index = this.coursesList.indexOf(id.courseCode)
                this.coursesList.splice(index, 1)
                this.errorMessage == 0

                //format list for the api
                for (var eachCourse of this.coursesList) {
                        this.tempList = [eachCourse]
                        console.log(eachCourse)
                        this.tempList2.push(this.tempList)
                    }

                const url = "http://localhost:3000/learningjourneycourse"
                axios
                    .put(url,
                        {
                            "LJID": this.ljID,
                            "course_ID": this.tempList2
                        }
                    )
                    .then(response => {
                        console.log("Success")
                        location.reload()
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
        
            }
 

        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.float{
    float: right
}
.meter {
    box-sizing: content-box;
    height: 20px;
    /* Can be anything */
    position: relative;
    background: #555;
    border-radius: 25px;
    padding: 2px;
}

.meter>span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: rgb(43, 194, 83);
    position: relative;
    overflow: hidden;
}

.meter>span:after,
.animate>span>span {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(-45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent);
    z-index: 1;
    background-size: 50px 50px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
}

.animate>span:after {
    display: none;
}

@keyframes move {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 50px 50px;
    }
}

a {
    color: blue;
    text-decoration: underline;
}

.mouseover {
    cursor: pointer;
}
</style>
